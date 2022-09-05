const express = require("express");
const routes = require("./controllers/");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

const path = require("path");

const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log("Now listening"));
});

//express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets. This is useful for front-end specific files like images, style sheets, and JavaScript files.
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");