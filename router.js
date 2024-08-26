import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { render } from "ejs";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";




app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get("/", async (req, res) => {
  const response = await axios.get(API_URL);
  const lastIndex = await axios.get(`${API_URL}/last-post`)
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



// API route to send card data as JSON
app.get('/cards-data', (req, res) => {
  res.json(cards);
  console.log(cards);
});

<<<<<<< HEAD:router.js
=======
// // API route to add a new card
// app.post('/add-card', (req, res) => {
//   const newCard = req.body;
//   newCard.id = Date.now(); // Assign a unique ID to the new card
//   cards.push(newCard);
//   res.json({ success: true, id: newCard.id });
// });
>>>>>>> origin/master:index.js

// API route to delete a card by ID
app.delete('/delete-card/:id', (req, res) => {
  const cardId = parseInt(req.params.id, 10); // Get the card ID from the URL parameters and parse it as an integer
  cards = cards.filter(card => card.id !== cardId);
  res.json({ success: true });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
