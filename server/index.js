const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("client/dist"));

app.listen(port, () => {
  console.log(`server is running on localhost ${port}`);
});
