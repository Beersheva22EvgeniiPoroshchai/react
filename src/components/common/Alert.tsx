import React from 'react';

type Props = {
  message: string;
  status: 'success' | 'warning' | 'error';
};

const Alert: React.FC<Props> = ({ message, status }) => {
  let color: string;

  if (status === 'success') {
    color = 'green';
  } else if (status === 'warning') {
    color = 'yellow';
  } else {
    color = 'red';
  }

  return (
    <div style={{ backgroundColor: color }}>
      {message}
    </div>
  );
};

export default Alert;







