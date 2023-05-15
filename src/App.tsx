import HomePage from "./Components/HomePage/HomePage";
import Login from "./Components/login/Login";

function App() {
    //отправка сообщения
  //нужно брать с фрпмы токен и инстанс в урл подставлять и номер телефона тоже как-нибудь придумаю потом
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    return response.json();
  }

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

  // deleteData("https://api.green-api.com/waInstance1101819332/DeleteNotification/0b91884d952e48d0bcf2b918da4d9b1cfdbc3e4246d44fc38b/1").then((data) => {
  //   console.log(data);
  // });

  //   getData("https://api.green-api.com/waInstance1101819332/ReceiveNotification/0b91884d952e48d0bcf2b918da4d9b1cfdbc3e4246d44fc38b").then((data) => {
  //   console.log(data);
  // });

  // postData("https://api.green-api.com/waInstance1101819332/SendMessage/0b91884d952e48d0bcf2b918da4d9b1cfdbc3e4246d44fc38b", { "chatId": "79069602317@c.us",
  // "message": "test message" }).then((data) => {
  //   console.log(data);
  // });

  return <HomePage />;
}

export default App;
