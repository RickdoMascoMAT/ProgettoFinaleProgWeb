import React from 'react';

/**
 * Props for the ErrorMessage component
 * @property {string} message - The error message to display
 */
interface ErrorMessageProps {
  message: string;
}

/**
 * Component for displaying error messages to the user.
 * Renders a styled error message with the error-message CSS class.
 *
 * @param {ErrorMessageProps} props - Component props
 * @param {string} props.message - The error message text
 * @returns {JSX.Element} A div containing the error message
 *
 * @example
 * <ErrorMessage message="An error occurred while loading data" />
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <div className={'error-message'}>{message}</div>;
};

export default ErrorMessage;
