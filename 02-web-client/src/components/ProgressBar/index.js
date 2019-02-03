import React from 'react';

const ProgressBar = props => {
  const {message, large} = props;
  return (
    <div className="progress" style={ large ? {height: '2.5rem'} : {height: '3px'}}>
      <div className="progress-bar progress-bar-striped progress-bar-animated text-center" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}>
        {
          message
        }
      </div>
    </div>
  );
};

export default ProgressBar;