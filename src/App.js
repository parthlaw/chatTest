import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Chat from "./chat";
import Welcome from "./welcome";

function App() {
  const [window, setWindow] = useState(0);

  const sock = useRef();
  useEffect(() => {
    const ws = new WebSocket(`wss://bakov2.herokuapp.com/ws?token=abcd`);
    sock.current = ws;
    return () => {
      sock.current.close();
    };
  }, []);

  return (
    <div className="App">
      {window == 0 ? (
        <Welcome setWindow={setWindow} />
      ) : (
        <Chat ws={sock.current} />
      )}
    </div>
  );
}

export default App;
