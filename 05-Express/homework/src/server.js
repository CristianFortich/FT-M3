// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let countingId = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
server.post('/posts', (req, res)=>{
    const {author, title, contents} = req.body;
    if(!author || !title || !contents) return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    countingId++;
    const post = {author,title,contents,id: countingId}
    posts.push(post);
    res.json(post);
})

server.post('/posts/author/:author', (req,res)=>{
    const {title, contents} = req.body;
    const {author} = req.params;
    if(!author || !title || !contents) return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    countingId++;
    const post = {author,title,contents,id: countingId}
    posts.push(post);
    res.json(post);
})

server.get('/posts', (req, res)=>{
    const {term} = req.query;
    if(!term) return res.json(posts);
    const validPost = [];
    posts.forEach(e=>{
        if(e.title.includes(term) || e.contents.includes(term)) validPost.push(e);
    })
    res.json(validPost);
})

server.get('/posts/:author', (req,res)=>{
    const {author} = req.params;
    const validPost = [];
    posts.forEach(e=>{
        if(e.author == author) validPost.push(e);
    })
    if(validPost.length==0) return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"});
    res.json(validPost);
})

server.get('/posts/:author/:title', (req,res)=>{
    const {author, title} = req.params;
    const validPost = [];
    posts.forEach(e=>{
        if(e.author == author && e.title == title) validPost.push(e);
    })
    if(validPost.length==0) return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"});
    res.json(validPost);
})

server.put('/posts', (req,res)=>{
    const {id, title, contents} = req.body;
    if(!id || !title || !contents) return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"});
    const validPost = posts.find(e=>e.id=== id);
    if(!validPost) return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    validPost.title = title;
    validPost.contents = contents;
    res.json(validPost);
}) 

server.delete('/posts', (req, res)=>{
    const {id} = req.body;
    if(!id) return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"});
    const validPost = posts.find(e=>e.id === id);
    if(!validPost) return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"});
    posts = posts.filter(e=>e.id != id);
    res.json({ success: true });
})

server.delete('/author', (req,res)=>{
    const {author} = req.body;
    if(!author) return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"});
    const validA = posts.find(e=>e.author === author);
    if(!validA) return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"});
    const validPost = posts.filter(e=>e.author === author);
    posts = posts.filter(e=>e.author != author);
    res.json(validPost);
})

module.exports = { posts, server };
