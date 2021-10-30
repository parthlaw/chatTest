import React from "react";

const Welcome = () => {
  const handleClick = () => {
    console.log("Clicked");
  };
  return (
    <div>
      <h1>Welcome to the React App</h1>
      <button onClick={handleClick}>Start Chat Session</button>
    </div>
  );
};
export default Welcome;
