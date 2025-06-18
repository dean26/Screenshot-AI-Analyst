// app.js
const express = require('express');
const app = express();
const port = 3000;
const { processScreenshotsDirectory } = require('./services/screenshotService'); // Import the new service

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
app.post('/submit-path', async (req, res) => { // Made the function async
  const rootDirectoryPath = req.body.directoryPath;
  console.log(`Received root directory path: ${rootDirectoryPath}`);

  if (!rootDirectoryPath) {
    return res.status(400).json({ message: 'Directory path is required.' });
  }

  try {
    // Process the directory using the new service
    const screenshotSets = await processScreenshotsDirectory(rootDirectoryPath);
    console.log('Processed screenshot sets:', JSON.stringify(screenshotSets, null, 2));
    
    res.json({
        message: `Path "${rootDirectoryPath}" submitted and processed! Found ${screenshotSets.length} screenshot sets.`,
        data: screenshotSets // Send the processed data back for now
    });

  } catch (error) {
    console.error('Error processing directory:', error);
    res.status(500).json({ message: `Error processing directory: ${error.message}` });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});