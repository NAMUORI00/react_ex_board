import { useState, useEffect } from "react";

function PostDetail({selectedPostId, setCurrentPage}) {

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
      content: "",
      author: "",
      password: "",
    });

  useEffect(() => {
    // Fetch post from API
    fetchPost();
    fetchComments();
  }, [selectedPostId]);

  const fetchPost = async () => {
    const res = await fetch(`/api/posts/${selectedPostId}`);
    const data = await res.json();
    setPost(data);
  };


  const fetchComments = async () => {
    const res = await fetch(`/api/posts/${selectedPostId}/comments`);
    const data = await res.json();
    setComments(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: selectedPostId,
        author: newComment.author,
        content: newComment.content,
        password: newComment.password,
      }),
    });

    setNewComment({
      content: "",
      author: "",
      password: "",
    });

    fetchComments();
  };

  return (
    <div className="max-w-3xl mx-auto my-10">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col">
          <div>
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <div className="text-gray-600">
              By {post.author} - {post.updated_at}
            </div>
            <p className="text-gray-700 my-4">{post.content}</p>
          </div>
        </div>
      </div>

      <CommentsList comments={comments} />

      <CommentForm
        newComment={newComment}
        setNewComment={setNewComment}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

const CommentsList = ({ comments }) => {
  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">댓글</h3>

      <ul className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

const CommentItem = ({ comment }) => {
  return (
    <li className="flex items-start">
      <div className="p-6 max-w-md bg-white rounded-lg shadow-md mt-6">
        <p className="text-gray-600">댓글내용 : {comment.content}</p>

        <div className="ml-4 text-sm text-gray-500">
          작성자 : {comment.author} - 작성일 : {comment.updated_at}
        </div>
      </div>
    </li>
  );
};


const CommentForm = ({ newComment, setNewComment, handleSubmit }) => {
  const handleChange = (e) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6 max-w-md bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex">
          <input
            type="text"
            name="author"
            placeholder="author"
            value={newComment.author}
            onChange={handleChange}
            className="mb-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newComment.password}
            onChange={handleChange}
            className="mb-2"
          />
        </div>

        <input
          type="text"
          name="content"
          placeholder="content"
          value={newComment.content}
          onChange={handleChange}
          className="h-20 resize-none mb-2"
        />

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default PostDetail;
