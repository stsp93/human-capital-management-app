const client = require('prom-client');  
const Register = require('prom-client').register;  
const Counter = require('prom-client').Counter;  
const Summary = require('prom-client').Summary;  
const ResponseTime = require('response-time');  



const numOfRequests = new Counter({  
    name: 'numOfRequests',
    help: 'Number of requests made',
    labelNames: ['method']
});


const pathsTaken = new Counter({  
    name: 'pathsTaken',
    help: 'Paths taken in the app',
    labelNames: ['path']
});


const responses = new Summary({  
    name: 'responses',
    help: 'Response time in millis',
    labelNames: ['method', 'path', 'status']
});


const requestCounters = function (req, res, next) {  
    if (req.path != '/metrics') {
        numOfRequests.inc({ method: req.method });
        pathsTaken.inc({ path: req.path });
    }
    next();
}

const responseCounters = ResponseTime(function (req, res, time) {  
    if(req.url != '/metrics') {
        responses.labels(req.method, req.url, res.statusCode).observe(time);
    }
})


const injectMetricsRoute = function (App) {  
    App.get('/metrics', async (req, res) => {
        res.set('Content-Type', Register.contentType);
        res.send(await Register.metrics());
    });
};

const startCollection = function () {
    client.collectDefaultMetrics({Register});
}

module.exports = {
    requestCounters,
    responseCounters,
    injectMetricsRoute,
    startCollection
}