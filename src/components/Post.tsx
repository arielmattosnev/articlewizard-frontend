import { format } from "date-fns";

import { Link } from "react-router-dom";

interface PostProps {
  title: string;
  summary: string;
  content?: string;
  image: string;
  createdAt: string;
  author: string | any;
  _id: string;
}

const Post = ({
  _id,
  title,
  summary,
  image,
  createdAt,
  author,
}: PostProps) => {
  return (
    <div className="post">
      <div>
        <Link to={`/post/${_id}`}>
          <img
            src={`http://localhost:3000/${image}`}
            alt="blog image"
            className="object-cover"
          />
        </Link>
      </div>
      <div className="space-y-2">
        <Link to={`/post/${_id}`}>
          <h2 className="text-2xl text-[1.4rem] m-0 font-bold">{title}</h2>
        </Link>
        <p className="text-[#aaa] my-2 space-x-2 text-xs font-bold">
          <a href="#" className="text-[#333]">
            {author.username}
          </a>
          <time>{format(new Date(createdAt), "MMM d/yyyy HH:mm")}</time>
        </p>
        <p className="text-[1.0rem]">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
