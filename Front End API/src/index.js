const express = require('express');
const cookieParser = require('cookie-parser')
const hbs = require('express-handlebars');
const { COOKIE_SECRET ,PORT} = require('./config/constants');
const { auth } = require('./middlewares/authMiddleware');
const hbsHelpers = require('./helpers/handlebars')
const router = require('./router');

const app = express();

app.engine('hbs', hbs.engine({extname:'hbs',defaultLayout:'main.hbs', helpers:hbsHelpers}));
app.set('view engine', 'hbs');
app.use(express.static('static'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(COOKIE_SECRET));
app.use(auth);
app.use(router);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
