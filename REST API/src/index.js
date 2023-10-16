const express = require('express');
const cookieParser = require('cookie-parser')
const { PORT } = require('./config/constants');
const dbInit = require('./config/database');
const router = require('./router');
const cors = require('./middlewares/cors');
const sessionMiddleware = require('./middlewares/sessionMiddleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(sessionMiddleware())
app.use(router);

dbInit().then(() => {
    console.log('DB Connected');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})