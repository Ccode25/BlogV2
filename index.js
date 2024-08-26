import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 4000;

let posts = [{
  id: 1,
  title: "The Rise of Decentralized Finance",
  content:
    "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
  author: "Alex Thompson",
  date: "2023-08-01T10:00:00Z",
},
{
  id: 2,
  title: "The Impact of Artificial Intelligence on Modern Businesses",
  content:
    "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
  author: "Mia Williams",
  date: "2023-08-05T14:30:00Z",
},
{
  id: 3,
  title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
  content:
    "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
  author: "Samuel Green",
  date: "2023-08-10T09:15:00Z",
}]


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));

//Route to get all posts
app.get("/", (req, res) => {
  res.json(posts);
})

app.get("/last-post", (req, res) => {
  const lastPost = posts[posts.length -1];
  res.json(lastPost);

  });

  

app.post("/posts", (req, res) => {
  
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date()
  }

  posts.push(newPost);
  res.status(201).json(posts);

})

app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingPost = posts.find((post) => post.id === id);
  const editPost = {
    id: id,
    title: req.body.title || existingPost.title,
    content: req.body.content || existingPost.content,
    author: req.body.author || existingPost.author,
    date: new Date() || existingPost.date
  };

  const searchIndex = posts.findIndex((post) => post.id === id);
  posts[searchIndex] = editPost;
  res.status(201).json(editPost);
})

app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = posts.findIndex((post) => post.id === id);
  if (searchIndex > -1 ) {
    posts.splice(searchIndex, 1);
    res.status(200).json({message: "Post Deleted"});
  }
  else{
    console.log({message: "No posts were delete"});
  }
})


app.listen(port,()=>{
  console.log(`Server is running on port: ${port}`);
})