import { FormEvent, useState } from "react";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status !== 201) alert("Seu registro falhou");

    return response;
  };

  return (
    <section>
      <form className="register" onSubmit={handleRegister}>
        <h1 className="text-center text-4xl font-bold mb-7">Registre-se</h1>
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
        <button className="form_button">Registrar-se</button>
      </form>
    </section>
  );
};

export default Register;
