import React from 'react';

export default (props) => {
  const { onClick, text } = props;

  return (
    <div className='btnWrapper' onClick={onClick} tabIndex='-1' role='button'>
      <div className='btn'>
        <span />
        <span />
        <span />
        <span />
        {text}
      </div>
    </div>
  );
};
