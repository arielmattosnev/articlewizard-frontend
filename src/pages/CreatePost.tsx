import { FormEvent, useState } from "react";

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

import { modules, formats } from "../utils";

import { Navigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<FileList | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleSubmitPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (file) {
      data.append("file", file[0]);
    }

    const response = await fetch("http://localhost:3000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFile(selectedFiles);
    }
  };

  if (redirect) return <Navigate to={"/"} />;

  return (
    <section>
      <form onSubmit={handleSubmitPost}>
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
        <button className="form_button mt-4">Criar post</button>
      </form>
    </section>
  );
};

export default CreatePost;
