const path = require('path');
const express = require('express');
const models = require('./models');
const session = require('express-session');
const routes = require('./controllers');
//handlebar declaration
const exphbs = require('express-handlebars'); 
const helpers = require('./utils/helpers');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3006;
//create an handlebar instance
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
//atttach the handlebar instance to express instance
app.engine('handlebars', hbs.engine);
//set the extension for handlebar files 
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    console.log("Sync Complete");
    app.listen(PORT, () => console.log('Now listening'));
});
