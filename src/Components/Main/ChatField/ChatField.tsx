import { useEffect, useRef, useState } from "react";
import s from "./ChatField.module.scss";
import { SendIcon } from "../../../image/svg/send";

interface IMessages {
  type: string;
  message: string;
}

let ChatField = (prop: {
  idInstance: string | undefined;
  apiTokenInstance: string | undefined;
  phoneNum: string | undefined;
}) => {
  const [messagesList, setMessagesList] = useState<Array<IMessages> | any>([]);
  const [messageText, setMessageText] = useState<string | undefined>(undefined);

  const ref = useRef<any>();

  let postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    return response.json();
  };

  //получаем данные

  let getData = async (url = "") => {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  let deleteData = async (url = "") => {
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  let listener = () => {
    setInterval(() => {
      getData(
        `https://api.green-api.com/waInstance${prop.idInstance}/ReceiveNotification/${prop.apiTokenInstance}`
      ).then((data) => {
        editMessagesData(data);
      });
    }, 5000);
  };

  let editMessagesData = (data: any) => {
    if (data) {
      let messageArray = messagesList;
      let messageObj: IMessages = {
        message: "",
        type: "",
      };

      if (data.body.messageData !== undefined) {
        if (data.body.messageData.textMessageData !== undefined) {
          messageObj.message =
            data.body.messageData.textMessageData.textMessage;
          messageObj.type = data.body.senderData.sender;

          messageArray.push(messageObj);
        }

        if (data.body.messageData.extendedTextMessageData !== undefined) {
          messageObj.message =
            data.body.messageData.extendedTextMessageData.text;
          messageObj.type = data.body.senderData.sender;

          messageArray.push(messageObj);
        }
      }

      const result = messageArray.reduce((o: any, i: any) => {
        if (!o.find((v: any) => v.message === i.message)) {
          o.push(i);
        }
        return o;
      }, []);

      setMessagesList(result);

      deleteData(
        `https://api.green-api.com/waInstance${prop.idInstance}/DeleteNotification/${prop.apiTokenInstance}/${data.receiptId}`
      );
    }
  };

  let clearForm = (e: any) => {
    e.preventDefault();
    ref.current.value = "";

    postData(
      `https://api.green-api.com/waInstance${prop.idInstance}/SendMessage/${prop.apiTokenInstance}`,
      { chatId: `${prop.phoneNum}@c.us`, message: messageText }
    );
  };

  useEffect(() => {
    
    
    listener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {prop.phoneNum && (
        <div className={s.wrap}>
          <div className={s.chatField}>
            {messagesList &&
              messagesList.map((item: any, i: any) => (
                <div
                  className={
                    item.type.replace(/[^0-9]/g, "") === prop.phoneNum
                      ? s.userMessage
                      : s.yourMessage
                  }
                  key={i}
                >
                  <div className={s.item}>
                    <p>{item.message}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className={s.actionField}>
            <form onSubmit={clearForm}>
              <input
                ref={ref}
                type="text"
                name=""
                id=""
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button type="submit"><SendIcon /></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatField;
