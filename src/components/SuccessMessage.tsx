import React from 'react';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return <div className={'success-message'}>{message}</div>;
};

export default SuccessMessage;
