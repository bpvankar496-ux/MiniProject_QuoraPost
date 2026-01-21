const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

const { v4: uuidv4 } = require('uuid');       
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    { id: uuidv4(), username: "Bhoomika vankar", content: "i love coding" },
    { id: uuidv4(), username: "jignasha vankar", content: "i love dancing" },
    { id: uuidv4(), username: "divyesh vankar", content: "Good thoughts lead to good ideas, and hard work turns those ideas into reality." },
    { id: uuidv4(), username: "pravin vankar", content: "Dreams grow with good thoughts, but only hard work makes them come true 🌱🔥" },
];

// All posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

// New post form
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// Create new post
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let newId = uuidv4();
    posts.push({ id: newId, username, content });
    res.redirect("/posts");
});

// Show one post
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs", { post });
});

// Edit form
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", { post });
});

// Update post
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    if (post) {
        post.content = newContent;
    }
    res.redirect("/posts");
});

// Delete post
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("listening to port 8080");});
//aa project n run karva  nodemon index.js lakhvu terminal ma n browser ma localhost:8080/post karvanu

