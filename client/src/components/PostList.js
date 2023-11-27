// components/PostList.js

import { useState, useEffect } from "react";
import axios from "axios";

const PostList = ({ setCurrentPage, setSelectedPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await axios.get("/api/posts");
    setPosts(response.data);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              작성자
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              제목
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              날짜
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {posts.map((post) => (
            <PostRow
              post={post}
              setCurrentPage={setCurrentPage}
              setSelectedPost={setSelectedPost}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 로우 컴포넌트
const PostRow = ({ post, setCurrentPage, setSelectedPost }) => {
  const handleClick = () => {
    setCurrentPage("postDetail");
    setSelectedPost(post.id);
  };

  return (
    <tr>
      <td className="px-6 py-4 text-sm text-gray-500">{post.id}</td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{post.author}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{post.title}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {post.updated_at}
      </td>

      <td>
        <button onClick={handleClick}>Post Detail</button>
      </td>
    </tr>
  );
};

export default PostList;
