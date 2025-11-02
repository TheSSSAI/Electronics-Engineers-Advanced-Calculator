import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '../user/userApi';
import { selectIsAuthenticated } from '../auth/authSlice';

interface GuidedTourControl {
  /**
   * Indicates if the guided tour should be displayed. True only for authenticated users
   * who have not yet completed the tour and whose profile has successfully loaded.
   */
  shouldShowTour: boolean;
  /**
   * A function to call to permanently mark the tour as completed or skipped on the backend.
   */
  markTourAsCompleted: () => void;
  /**
   * True while the user's profile is being fetched.
   */
  isLoading: boolean;
}

/**
 * A custom hook to manage the logic for the first-time user guided tour.
 * It determines if the tour should be shown based on the user's profile
 * and provides a callback to permanently mark it as completed.
 *
 * This supports REQ-1-073 and user stories US-067 & US-068.
 *
 * @returns {GuidedTourControl} An object containing the state and functions to control the tour.
 */
export const useGuidedTour = (): GuidedTourControl => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const { 
    data: userProfile, 
    isLoading, 
    isSuccess 
  } = useGetUserProfileQuery(undefined, {
    skip: !isAuthenticated, // Only fetch if the user is authenticated
  });

  const [updateUserProfile] = useUpdateUserProfileMutation();

  const shouldShowTour = isAuthenticated && isSuccess && userProfile?.tourCompleted === false;

  const markTourAsCompleted = useCallback(() => {
    // Fire-and-forget mutation. We don't need to handle the result,
    // as the tour won't be shown again on the next page load anyway.
    // Error handling is managed globally by the apiErrorMiddleware.
    if (isAuthenticated) {
      updateUserProfile({ tourCompleted: true });
    }
  }, [isAuthenticated, updateUserProfile]);

  return {
    shouldShowTour,
    markTourAsCompleted,
    isLoading,
  };
};