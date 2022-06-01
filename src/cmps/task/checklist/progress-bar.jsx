import React from "react";

export const ProgressBar = (props) => {
  const { completed } = props;
  const containerStyles = {
    height: 8,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    // margin: 50
  }

  const fillerStylesIncomplete = {
    height: '100%',
    width: `${completed}%`,
    borderRadius: 'inherit',
    textAlign: 'right',
    backgroundColor: 'green',
    transition: 'width 0.5s ease-in-out'
  }
  const fillerStylesComplete = {
    height: '100%',
    width: `${completed}%`,
    borderRadius: 'inherit',
    textAlign: 'right',
    backgroundColor: '#5ba4cf',
    transition: 'width 0.5s ease-in-out'
  }


  const labelStyles = {
    paddingRight: 5,
    fontSize: "10px",
    color: "#828282",
  }

  const progressBar = {
    display: "flex",
    alignItems: "center"
  }

  return (
    <div style={progressBar}>
      <span style={labelStyles}>{`${completed}%`}</span>
      <div style={containerStyles}>
        <div style={(completed < 100) ? fillerStylesIncomplete : fillerStylesComplete}>
        </div>
      </div>
    </div>
  );
};

;