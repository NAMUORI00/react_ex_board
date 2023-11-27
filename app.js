const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

const db = mysql.createConnection({
  host: "localhost",
  user: "local",
  password: "local1234",
  database: "local",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL");
});

app.use(cors());
app.use(bodyParser.json());

// 백엔드 API 엔드포인트
app.get("/api/posts", (req, res) => {
  db.query(
    "SELECT *, UNIX_TIMESTAMP(updated_at) AS last_updated FROM posts",
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    }
  );
});

// GET single post
app.get('/api/posts/:id', (req, res) => {

  const { id } = req.params;

  db.query(`SELECT * FROM posts WHERE id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result[0]);
    }
  });

});

app.post("/api/posts", (req, res) => {
  const { title, author, content } = req.body;
  db.query(
    "INSERT INTO posts (title, author, content) VALUES (?, ?, ?)",
    [title, author, content],
    (err, result) => {
      if (err) {
        throw err;
      }

      // 포스트가 추가된 후, 해당 포스트를 다시 조회하여 마지막 수정된 날짜를 반환합니다.
      db.query(
        "SELECT *, UNIX_TIMESTAMP(updated_at) AS last_updated FROM posts WHERE id = ?",
        [result.insertId],
        (err, postResult) => {
          if (err) {
            throw err;
          }
          res.json(postResult[0]);
        }
      );
    }
  );
});

app.get("/api/comments", (req, res) => {
  db.query(
    "SELECT *, UNIX_TIMESTAMP(updated_at) AS last_updated FROM comments",
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    }
  );
});

// GET comments by post
app.get('/api/posts/:postId/comments', (req, res) => {

  const { postId } = req.params;

  db.query(
    `SELECT * FROM comments WHERE post_id = ?`, 
    [postId], 
    (err, results) => {
      if (err) throw err;
      
      res.json(results);
    }
  );

});

app.post("/api/comments", (req, res) => {
  const { post_id, author, content, password } = req.body;
  db.query(
    "INSERT INTO comments (post_id, author, content, password) VALUES (?, ?, ?, ?)",
    [post_id, author, content, password],
    (err, result) => {
      if (err) {
        throw err;
      }

      // 댓글이 추가된 후, 해당 댓글을 다시 조회하여 마지막 수정된 날짜를 반환합니다.
      db.query(
        "SELECT *, UNIX_TIMESTAMP(updated_at) AS last_updated FROM comments WHERE id = ?",
        [result.insertId],
        (err, commentResult) => {
          if (err) {
            throw err;
          }
          res.json(commentResult[0]);
        }
      );
    }
  );
});

app.put("/api/comments/:id", (req, res) => {
  const { id } = req.params;
  const { content, password } = req.body;
  db.query(
    "UPDATE comments SET content = ? WHERE id = ? AND password = ?",
    [content, id, password],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Comment updated");
    }
  );
});

app.delete("/api/comments/:id", (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  db.query(
    "DELETE FROM comments WHERE id = ? AND password = ?",
    [id, password],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Comment deleted");
    }
  );
});

// 게시물에 댓글 수정
app.put("/api/posts/:post_id/comments/:comment_id", (req, res) => {
  const { post_id, comment_id } = req.params;
  const { content, password } = req.body;
  db.query(
    "UPDATE comments SET content = ? WHERE id = ? AND post_id = ? AND password = ?",
    [content, comment_id, post_id, password],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Comment updated");
    }
  );
});

// 게시물에서 댓글 삭제
app.delete("/api/posts/:post_id/comments/:comment_id", (req, res) => {
  const { post_id, comment_id } = req.params;
  const { password } = req.body;
  db.query(
    "DELETE FROM comments WHERE id = ? AND post_id = ? AND password = ?",
    [comment_id, post_id, password],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Comment deleted");
    }
  );
});

// 정적 파일 제공 및 UI 라우팅
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
