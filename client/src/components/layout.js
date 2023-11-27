import React from "react";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import PostEditor from "./PostEditor";
// Layout.js

function Layout({
  posts,
  currentPage,
  setCurrentPage,
  SelectedPost,
  setSelectedPost,
}) {
  let content;

  if (currentPage === "postList") {
    content = (
      <PostList
        posts={posts}
        setCurrentPage={setCurrentPage}
        setSelectedPost={setSelectedPost}
      />
    );
  }

  if (currentPage === "postDetail") {
    content = (
      <PostDetail
        selectedPostId={SelectedPost}
        setCurrentPage={setCurrentPage}
      />
    );
  }

  if (currentPage === "PostEditor") {
    content = <PostEditor setCurrentPage={setCurrentPage} />;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedPost(6);
    console.log(currentPage);
    console.log(SelectedPost);
  };

  return (
    <div>
      {content}

      <button onClick={() => handlePageChange("postList")}>Post List</button>

      <button onClick={() => handlePageChange("postDetail")}>
        Post Detail
      </button>

      <button onClick={() => handlePageChange("PostEditor")}>
        Post Editor
      </button>
    </div>
  );
}

export default Layout;