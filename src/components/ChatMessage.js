import React from "react";
import "./ChatMessage.css";
import ProfilePicture from "../assets/Dhruval.jpeg";
import { auth } from "../firebase";
function ChatMessage({
  text,
  user,
  time,
  photo,
  userPhoto,
  video,
  from,
  messageDate,
}) {
  return (
    <div
      className="chat-message"
      style={{
        alignSelf: user === auth.currentUser?.uid ? "flex-end" : "flex-start",
      }}
    >
      {!(user === auth.currentUser?.email) ? (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          {from === "team" && (
            <div className="chatMessage_userImage">
              <img src={userPhoto} alt="" />
            </div>
          )}

          <div
            className="message_container"
            style={{
              backgroundColor:
                user === auth.currentUser?.uid ? "#B2EBF2" : "white",
            }}
          >
            <div className="message">
              <p>{text}</p>

              {(photo?.length > 0 || video?.length > 0) && (
                <div className="media__grid">
                  {photo?.length > 0 &&
                    photo?.map((p) => (
                      <div
                        style={{
                          marginTop: "20px",
                          marginLeft: "20px",
                          marginRight: "20px",
                        }}
                      >
                        <img src={p} alt="" style={{ width: "200px" }} />
                      </div>
                    ))}

                  {video?.length > 0 &&
                    video?.map((v) => (
                      <div
                        style={{
                          marginTop: "20px",
                          marginLeft: "20px",
                          marginRight: "20px",
                        }}
                      >
                        <video src={v} width="200px" controls />
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="message__date">
              <p>{new Date(messageDate?.toDate()).toLocaleString()}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="message_container"
            style={{
              backgroundColor:
                user === auth.currentUser?.uid ? "#B2EBF2" : "white",
            }}
          >
            <div className="message">
              <p>{text}</p>
              {(photo?.length > 0 || video?.length > 0) && (
                <div className="media__grid">
                  {photo?.length > 0 &&
                    photo?.map((p) => (
                      <div
                        style={{
                          marginTop: "20px",
                          marginLeft: "20px",
                          marginRight: "20px",
                        }}
                      >
                        <img src={p} alt="" style={{ width: "200px" }} />
                      </div>
                    ))}

                  {video?.length > 0 &&
                    video?.map((v) => (
                      <div
                        style={{
                          marginTop: "20px",
                          marginLeft: "20px",
                          marginRight: "20px",
                        }}
                      >
                        <video src={v} width="200px"></video>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="message__date">
              <p>{new Date(messageDate?.toDate()).toLocaleString()}</p>
            </div>
          </div>

          {from === "team" && (
            <div className="chatMessage_userImage">
              <img src={userPhoto} alt="" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ChatMessage;
