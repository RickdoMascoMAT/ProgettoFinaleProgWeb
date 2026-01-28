import React from 'react';

/**
 * Props for the SuccessMessage component
 * @property {string} message - The success message to display
 */
interface SuccessMessageProps {
  message: string;
}

/**
 * Component for displaying success messages to the user.
 * Renders a styled success message with the success-message CSS class.
 *
 * @param {SuccessMessageProps} props - Component props
 * @param {string} props.message - The success message text
 * @returns {JSX.Element} A div containing the success message
 *
 * @example
 * <SuccessMessage message="Data saved successfully!" />
 */
const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return <div className={'success-message'}>{message}</div>;
};

export default SuccessMessage;
