const model = require("./model.js");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("client/dist"));

app.post("/register", model.register);
app.post("/login", model.login);
app.get("/messages", model.getMessages);
app.post("/messages/:id", model.addMessage);

app.listen(port, () => {
  console.log(`server is running on localhost ${port}`);
});
