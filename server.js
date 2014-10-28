var express	= require('express'),
    config	= require(__dirname + '/config/config'),
    logger	= require(__dirname + '/lib/logger'),
    http	= require('http'),
    app		= express();

http.globalAgent.maxSockets = 30;

logger.log('info', 'Initializing HckrStats back end on', process.env['NODE_ENV'], 'mode');

app.disable('x-powered-by');

logger.log('verbose', 'Binding external middlewares');
app.use(require('morgan')('dev', {format : 'dev', immediate : true}));
app.use(require('morgan')('dev', {format : 'dev'}));
app.use(require('method-override')());
app.use(require('body-parser')());
app.use(require('response-time')());
app.use(require('compression')());

logger.log('verbose', 'Binding custom middlewares');
app.use(require(__dirname + '/config/router')(express.Router(), logger));
app.use(require(__dirname + '/lib/error_handler')());

app.listen(config.port);
logger.log('info', 'Server listening on port', config.port);

module.exports = app;

Date.prototype.toYMD = Date_toYMD;
function Date_toYMD() {
    var year, month, day;
    year = String(this.getFullYear());
    month = String(this.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    day = String(this.getDate());
    if (day.length == 1) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}