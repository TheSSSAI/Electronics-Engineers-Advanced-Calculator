import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCredentials,
  logout as logoutAction,
  selectIsAuthenticated,
  selectCurrentUser,
  selectAuthToken,
} from './authSlice';
import { useAppDispatch } from '../../app/store';
import { useLazyGetInitialUserDataQuery } from '../user/userApi';
import { api } from '../api/apiSlice';
import { routes } from '../../shared/config/routes';

// --- PKCE Helper Functions ---

/**
 * Generates a random string for the PKCE code_verifier.
 */
function generateCodeVerifier(): string {
  const randomBytes = new Uint8Array(32);
  window.crypto.getRandomValues(randomBytes);
  return base64UrlEncode(randomBytes);
}

/**
 * Encodes an ArrayBuffer into a Base64 URL-safe string.
 */
function base64UrlEncode(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Hashes the code_verifier using SHA-256 to create the code_challenge.
 */
async function createCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(hashBuffer);
}

const PKCE_VERIFIER_KEY = 'pkce_code_verifier';

/**
 * A comprehensive custom hook to manage all authentication-related logic,
 * including the OAuth 2.0 Authorization Code Flow with PKCE.
 *
 * This hook is the single source of truth for authentication actions and state consumption.
 * It fulfills REQ-1-004, REQ-1-029, and REQ-1-039.
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectAuthToken);

  const [triggerGetInitialUserData] = useLazyGetInitialUserDataQuery();

  const login = useCallback(async () => {
    try {
      const verifier = generateCodeVerifier();
      sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);
      const challenge = await createCodeChallenge(verifier);

      const params = new URLSearchParams({
        client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
        response_type: 'code',
        scope: 'openid profile email',
        redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
        code_challenge: challenge,
        code_challenge_method: 'S256',
      });

      const cognitoAuthUrl = `${
        import.meta.env.VITE_COGNITO_DOMAIN
      }/oauth2/authorize?${params.toString()}`;
      
      window.location.assign(cognitoAuthUrl);
    } catch (error) {
      console.error('Failed to initiate login flow:', error);
      // Here you could dispatch an action to show a global error notification
    }
  }, []);

  const handleRedirectCallback = useCallback(async (): Promise<void> => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (error) {
      console.error('Error from Cognito:', error);
      navigate(routes.login, { state: { error: 'Authentication failed.' } });
      return;
    }

    if (!code) {
      console.error('No authorization code found in URL.');
      navigate(routes.login, { state: { error: 'Invalid authentication callback.' } });
      return;
    }

    const verifier = sessionStorage.getItem(PKCE_VERIFIER_KEY);
    if (!verifier) {
      console.error('No PKCE verifier found in session storage.');
      navigate(routes.login, { state: { error: 'Your session has expired. Please try again.' } });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_COGNITO_DOMAIN}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
          code,
          redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
          code_verifier: verifier,
        }),
      });

      sessionStorage.removeItem(PKCE_VERIFIER_KEY);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error_description || 'Failed to exchange authorization code for tokens.');
      }

      const tokens = await response.json();
      
      // Fetch initial user data before setting credentials to have a complete user object
      const userDataResponse = await triggerGetInitialUserData(undefined, true).unwrap();
      
      dispatch(setCredentials({ 
        token: tokens.access_token, 
        user: userDataResponse // Assuming the user profile API returns the user object
      }));
      
      navigate(routes.home);

    } catch (err) {
      console.error('Token exchange or user data fetch failed:', err);
      dispatch(logoutAction());
      navigate(routes.login, { state: { error: 'Failed to complete login. Please try again.' } });
    }
  }, [dispatch, navigate, triggerGetInitialUserData]);

  const logout = useCallback(() => {
    dispatch(logoutAction());
    dispatch(api.util.resetApiState()); // Clear all RTK Query cache

    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
      logout_uri: window.location.origin + routes.login,
    });
    
    const cognitoLogoutUrl = `${
      import.meta.env.VITE_COGNITO_DOMAIN
    }/logout?${params.toString()}`;

    window.location.assign(cognitoLogoutUrl);
  }, [dispatch]);

  return {
    isAuthenticated,
    currentUser,
    token,
    login,
    logout,
    handleRedirectCallback,
  };
};