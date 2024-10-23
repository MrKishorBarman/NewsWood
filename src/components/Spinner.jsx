import React from 'react';
import loading from './loading.gif';

const Spinner = () => {
  return (
    // Centering the spinner
    <div className="text-center">
      <img className="my-4" src={loading} alt="loading" />
    </div>
  );
};

export default Spinner;
