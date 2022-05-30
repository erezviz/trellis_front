import React from "react";

export const ProgressBar = (props) => {
  const { completed } = props;
  const containerStyles = {
    height: 10,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    // margin: 50
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: 'green',
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 0.5s ease-in-out'
  }

  const labelStyles = {
    padding: 5,
    color: "#000000",
  }

  const progressBar = {
    display: "flex",
    alignItems: "center"
}

return (
  <div style={progressBar}>
    <span style={labelStyles}>{`${completed}%`}</span>
    <div style={containerStyles}>
      <div style={fillerStyles}>
      </div>
    </div>
  </div>
);
    };

;