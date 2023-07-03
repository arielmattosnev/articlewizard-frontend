import { useEffect, useState } from "react";

import { Post } from "../components";

const Home = () => {
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/post")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <section className="sm:flex items-center justify-center flex-col">
      {posts.length > 0 &&
        posts.map((post, index) => <Post key={index} {...post} />)}
    </section>
  );
};

export default Home;
