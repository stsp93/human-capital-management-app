const express = require('express');
const { PORT } = require('./config/constants');
const dbInit = require('./config/database');
const router = require('./router');
const cors = require('./middlewares/cors');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const prometheus = require('./prometheus');

const app = express();

app.use(express.json());
app.use(cors());

// Prometheus
app.use(prometheus.requestCounters);
app.use(prometheus.responseCounters);
prometheus.injectMetricsRoute(app);
prometheus.startCollection();

app.use(sessionMiddleware())
app.use(router);

dbInit().then(() => {
    console.log('DB Connected');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})