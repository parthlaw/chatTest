import React from "react";
import axios from "axios";

const Welcome = (props) => {
  const handleClick = () => {
    console.log("Clicked");
    // http://localhost:3000/api/care/chat/sessions

    axios
      .post("http://localhost:8000/api/care/chat/sessions", {
        startDate: Date.now(),
        studentId: "kuwcukvscwewifwecdhwf",
        // teacherId: "ikwefigcirwcfweibgcwe",
      })
      .then((res) => {
        // console.log(res);
        props.setRoomName(res.data.session._id);
      })
      .catch((err) => {
        console.log(err);
      });
    props.setWindow(1);
  };
  return (
    <div>
      <h1>Welcome to the React App</h1>
      <button onClick={handleClick}>Start Chat Session</button>
    </div>
  );
};
export default Welcome;
