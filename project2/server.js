const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send('Sorry, we cannot find that!');
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
