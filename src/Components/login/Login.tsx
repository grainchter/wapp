import { useState } from "react";
import s from "./Login.module.scss";

let Login = (prop: { editLoginData:any }) => {
  const [idInstance, setIdInstance] = useState<string | undefined>(undefined);
  const [apiTokenInstance, setApiTokenInstance] = useState<string | undefined>(
    undefined
  );

  let handleSubmit = () => {
    prop.editLoginData(true, idInstance, apiTokenInstance);
  };

  return (
    <>
        <div className={s.wrap}>
          <div className={s.container}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="idInstance">idInstance</label>
              <input
                type="text"
                name=""
                id="idInstance"
                onChange={(e) => setIdInstance(e.target.value)}
              />
              <label htmlFor="apiTokenInstance">apiTokenInstance</label>
              <input
                type="text"
                name=""
                id="apiTokenInstance"
                onChange={(e) => setApiTokenInstance(e.target.value)}
              />
              <input type="submit" value="Вход" />
            </form>
          </div>
        </div>
    </>
  );
};

export default Login;
