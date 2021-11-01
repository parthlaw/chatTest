import React, { useEffect, useState } from "react";
// import axios from "axios";
import "./chat.css";
const Chat = ({ ws, roomName }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    ws.send(JSON.stringify({ type: "join-room", message: roomName }));
  }, []);
  useEffect(() => {
    ws.onmessage = function (e) {
      const json = JSON.parse(e.data);
      console.log(json);

      if (json.action === "send-message") {
        setMessages([...messages, json.message]);
      }
      if (json.action === "join-room") {
        setToken(json.token);
      }
      if (json.action === "assign-teacher") {
        console.log(json);
      }
      // console.log(messages);
    };
    // return () => {
    //   cleanup;
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws]);

  const sendMsg = () => {
    ws.send(
      JSON.stringify({ action: "send-message", message: text, token: token })
    );
  };
  return (
    <div className="chat">
      <section className="msger">
        <header className="msger-header">
          <div className="msger-header-title">
            <i className="fas fa-comment-alt"></i> SimpleChat
          </div>
          <div className="msger-header-options">
            <span>
              <i className="fas fa-cog"></i>
            </span>
          </div>
        </header>

        <main className="msger-chat">
          {messages.map((message, index) => {
            return (
              <div className="msg left-msg" key={index}>
                <div
                  className="msg-img"
                  style={{
                    backgroundImage:
                      "url(https://image.flaticon.com/icons/svg/327/327779.svg)",
                  }}
                ></div>

                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name">User 1</div>
                    <div className="msg-info-time">12:45</div>
                  </div>

                  <div className="msg-text">{message.data}</div>
                </div>
              </div>
            );
          })}
          {/* <div className="msg left-msg">
            <div
              className="msg-img"
              style={{
                backgroundImage:
                  "url(https://image.flaticon.com/icons/svg/327/327779.svg)",
              }}
            ></div>

            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">User 1</div>
                <div className="msg-info-time">12:45</div>
              </div>

              <div className="msg-text">
                Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
              </div>
            </div>
          </div>

          <div className="msg right-msg">
            <div
              className="msg-img"
              style={{
                backgroundImage:
                  "url(https://image.flaticon.com/icons/svg/145/145867.svg)",
              }}
            ></div>

            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">User 2</div>
                <div className="msg-info-time">12:46</div>
              </div>

              <div className="msg-text">
                You can change your name in JS section!
              </div>
            </div>
          </div> */}
        </main>

        <div className="msger-inputarea">
          <input
            type="text"
            className="msger-input"
            placeholder="Enter your message..."
            onChange={(e) => setText(e.target.value)}
          />
          <button className="msger-send-btn" onClick={sendMsg}>
            Send
          </button>
        </div>
      </section>
    </div>
  );
};
export default Chat;
