const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const mongoose = require("mongoose");
const db = require("./models");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  origin: [
    "http://localhost:3002",
    "http://localhost:3001",
    "http://localhost:3000",
  ],
};

app.use(cors(corsOptions));

require("./routes/auth.routes")(app);
require("./routes/app.routes")(app);

db.mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));


app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// app.use("/api", routes);

// app.use(express.static(path.join(__dirname, "/front-end/build")));
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "/front-end/build", "index.html"));
// });

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
