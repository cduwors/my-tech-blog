const express = require("express");
const routes = require("./controllers/");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

const path = require("path");

const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

//create sessions for users
const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
	secret: "Super secret secret",
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));
//end sessions info

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets. This is useful for front-end specific files like images, style sheets, and JavaScript files.
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log("Now listening"));
});
