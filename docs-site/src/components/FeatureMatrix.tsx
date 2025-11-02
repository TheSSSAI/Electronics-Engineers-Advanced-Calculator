import React from 'react';
import styles from './FeatureMatrix.module.css';
import { Check, X } from 'lucide-react';

/**
 * Defines the structure for the main feature information in a row.
 */
interface FeatureInfo {
  /** The primary title of the feature. */
  title: string;
  /** An optional, more detailed description of the feature. */
  description?: string;
}

/**
 * Defines the structure for a single row in the feature matrix.
 */
interface FeatureRow {
  /** The feature's title and optional description. */
  feature: FeatureInfo;
  /**
   * An array of values corresponding to the headers.
   * - `true`: Renders a checkmark icon.
   * - `false`: Renders an 'X' icon.
   * - `string`: Renders the provided text.
   */
  values: (boolean | string)[];
}

/**
 * Props for the FeatureMatrix component.
 */
export interface FeatureMatrixProps {
  /** An array of strings to be used as the table column headers. The first header corresponds to the feature column. */
  headers: string[];
  /** An array of `FeatureRow` objects that define the content of the matrix. */
  rows: FeatureRow[];
}

/**
 * A reusable React component for displaying a feature comparison matrix or table.
 * It's designed to be used within MDX documentation to provide a clear, structured,
 * and visually appealing way to compare features across different plans, versions, or categories.
 *
 * This component supports boolean values (rendered as check/cross icons) and plain text,
 * making it flexible for various comparison scenarios.
 *
 * It adheres to accessibility best practices for tables as per REQ-1-034.
 *
 * @param {FeatureMatrixProps} props The properties for the component.
 * @returns {JSX.Element} The rendered feature matrix table.
 */
export default function FeatureMatrix({ headers, rows }: FeatureMatrixProps): JSX.Element {
  // Developer-facing validation to ensure table integrity.
  if (process.env.NODE_ENV === 'development') {
    if (!headers || headers.length < 2) {
      console.warn('FeatureMatrix: `headers` prop must contain at least two items (one for features, one for a value column).');
    }
    rows.forEach((row, index) => {
      if (row.values.length !== headers.length - 1) {
        console.warn(`FeatureMatrix: Row ${index} ('${row.feature.title}') has ${row.values.length} values, but there are ${headers.length - 1} value columns defined in \`headers\`.`);
      }
    });
  }

  const renderValue = (value: boolean | string, index: number) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className={styles.checkIcon} aria-label="Included" />
      ) : (
        <X className={styles.xIcon} aria-label="Not Included" />
      );
    }
    return <span className={styles.customValue}>{value}</span>;
  };

  return (
    <div className={styles.matrixContainer}>
      <table className={styles.featureTable}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th scope="row">
                <div className={styles.featureTitle}>{row.feature.title}</div>
                {row.feature.description && (
                  <div className={styles.featureDescription}>
                    {row.feature.description}
                  </div>
                )}
              </th>
              {row.values.map((value, valueIndex) => (
                <td key={valueIndex}>{renderValue(value, valueIndex)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}