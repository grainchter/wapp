import { useState } from "react";
import ChatField from "./ChatField/ChatField";
import ChatList from "./ChatList/ChatList";
import s from "./Main.module.scss";

let Main = (prop: {
  idInstance: string | undefined;
  apiTokenInstance: string | undefined;
}) => {

const [selectedChat, setSelectedChat] = useState<string | undefined>();

let editSelectedChat = (chat:string) => {   
    setSelectedChat(chat);
}

  return (
    <div className={s.wrap}>
      <ChatList editSelectedChat={editSelectedChat}/>
      <ChatField idInstance={prop.idInstance} apiTokenInstance={prop.apiTokenInstance} phoneNum={selectedChat}/>
    </div>
  );
};

export default Main;
