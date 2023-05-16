import { useEffect, useRef, useState } from "react";
import s from "./ChatField.module.scss";
import { SendIcon } from "../../../image/svg/send";

interface IMessages {
  type: string;
  message: string;
  messageId: string;
  status?: string;
  time?: string;
}

let ChatField = (prop: {
  idInstance: string | undefined;
  apiTokenInstance: string | undefined;
  phoneNum: string | undefined;
}) => {
  const [messagesList, setMessagesList] = useState<Array<IMessages> | any>([]);
  const [messageText, setMessageText] = useState<string>("");

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
        messageId: "",
        status: "",
        time: "",
      };

      if (data.body.typeWebhook === "outgoingAPIMessageReceived") {
        if (data.body.messageData !== undefined) {
          if (data.body.messageData.extendedTextMessageData !== undefined) {
            messageObj.message =
              data.body.messageData.extendedTextMessageData.text;
            messageObj.type = data.body.senderData.sender;
            messageObj.messageId = data.body.idMessage;

            const date = new Date(data.body.timestamp * 1000);
            let hour: string = date.getHours().toString();
            let min: string = "0" + date.getMinutes().toString();

            messageObj.time = hour + ":" + min.substr(-2);

            messageArray.push(messageObj);
          }
        }
      } else if (data.body.typeWebhook === "incomingMessageReceived") {
        if (data.body.messageData !== undefined) {
          if (data.body.messageData.textMessageData !== undefined) {
            messageObj.message =
              data.body.messageData.textMessageData.textMessage;
            messageObj.type = data.body.senderData.sender;
            messageObj.messageId = data.body.idMessage;

            const date = new Date(data.body.timestamp * 1000);
            let hour = date.getHours();
            let min = date.getMinutes();

            messageObj.time = hour.toString() + ":" + min.toString();
            messageArray.push(messageObj);
          }
        }
      } else if (data.body.typeWebhook === "outgoingMessageStatus") {
        if (data.body.status !== undefined) {
          messageArray.forEach((item: IMessages) =>
            item.messageId === data.body.idMessage
              ? (item.status = data.body.status)
              : (item.status = item.status)
          );
        }
      }

      const result = messageArray.reduce((o: any, i: any) => {
        if (!o.find((v: any) => v.messageId === i.messageId)) {
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
                    <div className={s.element}>
                      <p>{item.message}</p>
                      <span
                        className={
                          item.status === "delivered"
                            ? s.delivered
                            : item.status === "sent"
                            ? s.sent
                            : item.status === "read"
                            ? s.read
                            : undefined
                        }
                      >
                        {item.time}
                      </span>
                    </div>
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
              <button type="submit">
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatField;
