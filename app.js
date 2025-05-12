const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Store uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

let reviews = [];

app.get('/', (req, res) => {
  const totalRating = reviews.length ? 
    (reviews.reduce((sum, r) => sum + parseInt(r.rating), 0) / reviews.length).toFixed(1) : '0';
  res.render('index', { reviews, totalRating });
});

app.post('/submit-review', upload.single('image'), (req, res) => {
  const { name, email, title, description, rating } = req.body;
  const image = req.file ? '/uploads/' + req.file.filename : '';

  // Create a review object
  const review = {
    name,
    email,
    title,
    description,
    rating,
    image
  };

  // Save the review in the array
  reviews.push(review);

  // Redirect to the main page
  res.redirect('/');
});
app.post('/submit-review', upload.single('image'), (req, res) => {
  const { name, email, title, description, rating } = req.body;
  const image = req.file ? '/uploads/' + req.file.filename : '';

  // Create a review object
  const review = {
    name,
    email,
    title,
    description,
    rating,
    image
  };

  // Save the review in the array
  reviews.push(review);

  // Redirect to the main page
  res.redirect('/');
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
