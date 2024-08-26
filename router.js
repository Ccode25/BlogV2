import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');



app.get("/", async (req, res) => {
  const response = await axios.get(API_URL);
  const lastIndex = await axios.get(`${API_URL}/last-post`);
  const result = response.data;
  res.render("index.ejs", {posts : result, header : lastIndex.data});
  
});


// Route to render the about page with post data
app.get("/about", (req, res) => {
  res.render('about');
});

// Route to render the post page with post data
app.get("/post", (req, res) => {
  res.render('post');
});

// Route to render the contact page with post data
app.get("/contact", (req, res) => {
  res.render('contact');
});

// Route to render the form page
app.get("/form", (req, res) => {
  res.render('blog');
});

// Route to handle form submissions and update post data
app.post("/submit-form", async (req, res) => {
  try {
    await axios.post(`${API_URL}/posts`, req.body);
    res.redirect("/")
  }
  catch (error) {
    res.status(500).json({error : "Error creating post"});  
  }
});

app.post("/submit-form/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await axios.patch(`${API_URL}/posts/${id}`, req.body);
    res.redirect("/")
  }
  catch (error) {
    res.status(500).json({error : "Error creating post"});  
  }
});

app.get("/edit/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await axios.patch(`${API_URL}/posts/${id}`);
  res.render("modify.ejs", {posts: response.data, heading: "Edit Post"})
})


app.get("/delete/:id", async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    await axios.delete(`${API_URL}/posts/${id}`);
    res.redirect("/")    
  }
  catch(error) {
    res.status(404).json({error: "No post was deleted"});
  }
  
})
// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
