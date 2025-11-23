
const express = require("express");
const app = express();
const port = 3000;
const path = require("path"); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "public"))); 


const db = require("./db");


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "src", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "src", "login.html"));
});

app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "src", "cadastro.html"));
});

app.get("/pets", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "src", "pets.html"));
});

app.get("/pet", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "src", "pet.html"));
});

app.get("/edit-pet", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "src", "edit-pet.html"));
});




const apiRoutes = require("./routes/api"); 

app.use(express.json()); 

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
