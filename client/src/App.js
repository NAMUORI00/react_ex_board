import React, { useState } from "react";
import Layout from "./components/layout";

function App() {
  const [posts] = useState([]);
  const [currentPage, setCurrentPage] = useState("postList");
  const [SelectedPost, setSelectedPost] = useState({});

  return (
    <Layout
      posts={posts}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      SelectedPost={SelectedPost}
      setSelectedPost={setSelectedPost}
    />
  );
}

export default App;
