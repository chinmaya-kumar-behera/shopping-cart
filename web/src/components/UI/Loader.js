import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ size = '8', color = 'red-500' }) => {
  return (
    <div className={`flex justify-center items-center`}>
      <div
        className={`animate-spin rounded-full border-t-4 border-b-4 border-${color} h-${size} w-${size}`}
      ></div>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Loader;