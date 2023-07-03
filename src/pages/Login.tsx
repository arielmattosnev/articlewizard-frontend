import { FormEvent, useContext, useState } from "react";

import { Navigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  const { setUserInfo } = useContext<any>(UserContext);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok)
      return alert("Falha ao fazer login, por favor cheque as informações");

    response.json().then((res) => {
      setUserInfo(res);
      return setRedirect(true);
    });
  };

  if (redirect === true) return <Navigate to={"/"} />;

  return (
    <section>
      <form className="login" onSubmit={handleLogin}>
        <h1 className="text-center text-4xl font-bold mb-7">Login</h1>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form_button">Login</button>
      </form>
    </section>
  );
};

export default Login;
