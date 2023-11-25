const express = require('express');
const cookieParser = require('cookie-parser')
const hbs = require('express-handlebars');
const { COOKIE_SECRET, PORT } = require('./config/constants');
const { auth } = require('./middlewares/authMiddleware');
const hbsHelpers = require('./helpers/handlebars')
const router = require('./router');
const prometheus = require('./prometheus')

const app = express();

app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    helpers: hbsHelpers,
    partialsDir: __dirname + '/views/partials',
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));

// Prometheus
app.use(prometheus.requestCounters);
app.use(prometheus.responseCounters);
prometheus.injectMetricsRoute(app);
prometheus.startCollection();

app.use(auth);
app.use(router);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
