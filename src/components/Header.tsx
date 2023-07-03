import { Newspaper, Plus } from "lucide-react";

import { useContext, useEffect } from "react";

import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext<any>(UserContext);

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.username);
      });
  }, [setUserInfo]);

  const handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });

    setUserInfo(null);
  };

  const username = userInfo?.username;

  return (
    <header className="flex items-center justify-between mt-5 mb-[50px]">
      <Link
        to={"/"}
        className="flex items-center justify-center gap-2 font-bold text-[1.4rem]"
      >
        <Newspaper size={18} /> ArticleWizard
      </Link>
      <nav className="space-x-4">
        {username && (
          <div className="flex items-center justify-center gap-5">
            <Link
              to={"/create"}
              className="flex items-center justify-center gap-2 font-bold hover:scale-110 duration-300"
            >
              <Plus size={14} /> Criar novo post
            </Link>
            <a
              href="#"
              onClick={handleLogout}
              className="font-bold hover:scale-110 duration-300"
            >
              Logout
            </a>
          </div>
        )}
        {!username && (
          <>
            <Link
              to={"/login"}
              className="font-bold hover:scale-110 duration-300"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="font-bold hover:scale-110 duration-300"
            >
              Registrar-se
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
