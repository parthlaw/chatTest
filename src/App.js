import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Chat from "./chat";
import Welcome from "./welcome";

function App() {
  const [window, setWindow] = useState(0);
  const [roomName, setRoomName] = useState("");

  const sock = useRef();
  useEffect(() => {
    // const ws = new WebSocket(`wss://bakov2.herokuapp.com/ws?token=abcd`);
    const ws = new WebSocket(
      `ws://localhost:8080/ws?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYzNTc1NTYwMSwiZXhwIjoxNjM1NzU2NTAxfQ.Y8bs03wyQCY8u4reRwS21BzIcQOnAje4CwwxmlgxE2A9pPinc1wIUmvCEzwuhnr5PvhJHajR1q5xEFM5WljuAkAQDfBVikMm1kwZKKuDoYkd4kYaAESNCfk5tUcKWwI1RheQROt37Huk3KIIdxdaQx73cOy-UNNWcuemtPWdMJE`
    );
    sock.current = ws;
    return () => {
      sock.current.close();
    };
  }, []);

  return (
    <div className="App">
      {window == 0 ? (
        <Welcome setWindow={setWindow} setRoomName={setRoomName} />
      ) : (
        <Chat ws={sock.current} roomName={roomName} />
      )}
    </div>
  );
}

export default App;
