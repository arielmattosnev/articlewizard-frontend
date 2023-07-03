import { FormEvent, useEffect, useState } from "react";

import { formats, modules } from "../utils";

import { Navigate, useParams } from "react-router-dom";

import ReactQuill from "react-quill";

const EditPost = () => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<FileList | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  const { id } = useParams();
  if (id === undefined) throw new Error();

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
      });
  }, [id]);

  const handleUpdatePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (file) {
      data.append("file", file[0]);
    }

    await fetch("http://localhost:3000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    setRedirect(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFile(selectedFiles);
    }
  };

  if (redirect) return <Navigate to={`/post/${id}`} />;

  return (
    <section>
      <form onSubmit={handleUpdatePost}>
        <input
          type="title"
          placeholder="Titulo da sua postagem"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="sumário"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <ReactQuill
          value={content}
          onChange={(newValue) => setContent(newValue)}
          modules={modules}
          formats={formats}
        />
        <button className="form_button mt-4">Editar post</button>
      </form>
    </section>
  );
};

export default EditPost;
