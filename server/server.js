//import and require express
const express = require("express");

//defines port
const PORT = process.env.PORT || 3001;

//creates app
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {});
