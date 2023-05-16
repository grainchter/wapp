import { useState } from "react";
import s from "./ChatList.module.scss";
import { SendIcon } from "../../../image/svg/send";

let ChatList = (prop: { editSelectedChat: any }) => {
  const [addChatStatus, setAddChatStatus] = useState<boolean>(false);

  const [newChat, setNewChat] = useState<string | undefined>(undefined);
  const [chatList, setChatList] = useState<Array<string>>([]);
  const [selectedChat, setSelectedChat] = useState<string | undefined>(
    undefined
  );

  let addNewChat = () => {
    let chatArray = chatList;

    if (newChat) {
      if (newChat[0] !== "7") {
        let result = newChat.slice(1);
        result = "7" + result;
        chatArray.push(result);
      } else {
        chatArray.push(newChat);
      }

      setChatList(chatArray);
    }

    setNewChat(undefined);
    setAddChatStatus(!addChatStatus);    
  };

  return (
    <div className={s.wrap}>
      {chatList &&
        chatList.map((item: string, i: any) => (
          <div
            className={s.chatItem}
            key={i}
            onClick={() => {
              prop.editSelectedChat(item);
              setSelectedChat(item);
            }}
            style={
              selectedChat === item ? { backgroundColor: "#f0f2f5" } : undefined
            }
          >
            <p>{item}</p>
          </div>
        ))}
      {!addChatStatus && chatList.length < 1 && (
        <div className={s.addBtn}>
          <p>Введите номер телефона</p>
          <button
            onClick={() => {
              setAddChatStatus(!addChatStatus);
            }}
          >
            +
          </button>
        </div>
      )}

      {addChatStatus && chatList.length < 1 && (
        <div>
          <p>Введите номер телефона</p>
          <div className={s.addChatContainer}>
          <input
            type="number"
            name=""
            id=""
            onChange={(e) => setNewChat(e.target.value)}
          />
          <button onClick={addNewChat}>
            <SendIcon />
          </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ChatList;
