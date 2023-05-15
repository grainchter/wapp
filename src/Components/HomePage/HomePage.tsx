import { useState } from "react";
import Login from "../login/Login";
import Main from "../Main/Main";

let HomePage = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  const [idInstance, setIdInstance] = useState<string | undefined>(undefined);
  const [apiTokenInstance, setApiTokenInstance] = useState<string | undefined>(
    undefined
  );

  let editLoginData = (status: boolean, id: string, api: string) => {
    setLoginStatus(status);
    setIdInstance(id);
    setApiTokenInstance(api);
  };

  return (
    <>
      {!loginStatus && <Login editLoginData={editLoginData} />}

      {loginStatus && (
        <Main idInstance={idInstance} apiTokenInstance={apiTokenInstance} />
      )}
    </>
  );
};

export default HomePage;
