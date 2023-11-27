import { useState } from "react";

function PostEditor({ setCurrentPage }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("anonymous");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          content,
        }),
      });

      setTitle("");
      setContent("");
      setContent("anonymous");

      setCurrentPage("postList");

      alert("Post submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit post");
    }
  };

  return (
    <div className="p-4 mx-auto max-w-md">
      <h1 className="text-2xl font-bold mb-4">새 게시글 작성</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          제목:
        </label>

        <input
          type="text"
          id="title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label
          htmlFor="content"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          내용:
        </label>

        <textarea
          id="content"
          className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-purple-500"
        >
          작성
        </button>
      </form>
    </div>
  );
}

export default PostEditor;
