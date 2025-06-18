// app.js
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

// Middleware to set up the layout
app.use((req, res, next) => {
  res.renderLayout = (view, data = {}) => {
    // Render the specific view first
    app.render(view, data, (err, html) => {
      if (err) return next(err);
      // Then render the layout, passing the view's HTML as 'body'
      res.render('layout', { 
        body: html, 
        title: data.title || 'Default Title'
      });
    });
  };
  next();
});

// Home page with the form
app.get('/', (req, res) => {
  res.renderLayout('index', { title: 'Enter Directory Pathd' });
});

// Handle submitted form (API endpoint for async requests)
app.post('/submit-path', (req, res) => {
  const directoryPath = req.body.directoryPath; 
  console.log(`Received directory path: ${directoryPath}`);

  setTimeout(() => {
    res.json({ message: `Path "${directoryPath}" submitted successfully! Background actions will be performed.` });
  }, 3000); 
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});