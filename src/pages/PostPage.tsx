import { format } from "date-fns";

import { useContext, useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { UserContext } from "../context/UserContext";

import { Pencil, Trash } from "lucide-react";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState<any>();

  const { userInfo } = useContext<any>(UserContext);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`)
      .then((res) => res.json())
      .then((data) => setPostInfo(data));
  }, [id]);

  if (!postInfo) return "";

  return (
    <section className="post-page">
      <div>
        <h1 className="text-center text-6xl font-bold mb-12 capitalize">
          {postInfo.title}
        </h1>
        <div className="flex items-center justify-between font-bold mt-2 text-inherit text-sm">
          <p>Artigo do autor: {postInfo.author.username}</p>
          <time>
            {format(new Date(postInfo.createdAt), "MMM d/yyyy HH:mm")}
          </time>
        </div>
        {userInfo.id === postInfo.author._id && (
          <div className="mt-6 flex flex-col items-center justify-between gap-2 md:gap-0 md:flex-row">
            <Link
              to={`/edit/${postInfo._id}`}
              className="flex items-center justify-center gap-2 w-full md:w-52 bg-blue-700 p-2 rounded-md font-bold text-white hover:scale-110 duration-300"
            >
              Editar este Post <Pencil size={15} className="fill-white" />
            </Link>
            <Link
              to={""}
              className="flex items-center justify-center gap-2 w-full md:w-52 bg-red-700 p-2 rounded-md font-bold text-white hover:scale-110 duration-300"
            >
              Deletar este Post <Trash size={15} className="fill-white" />
            </Link>
          </div>
        )}
      </div>
      <div className="img">
        <img
          src={`http://localhost:3000/${postInfo.image}`}
          alt=""
          className="w-[550px] md:w-[900px] mt-8"
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
        className="mt-16 font-semibold leading-7 space-y-9 md:space-y-7"
      />
    </section>
  );
};

export default PostPage;
