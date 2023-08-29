const app = require('./app');
const tools = require('./lib/tools');
const log = require('./lib/logger')();

const PORT = process.env.PORT || 5000;
//const ADDR = process.env.ADDR || 'localhost';
//app.listen(PORT, ADDR);

const start = async () => {
    app.listen(PORT, () => {
        /* eslint-disable no-console */
        log.info(`Listening: https://blog-backend-wfo2.onrender.com:${PORT}`);
        /* eslint-enable no-console */
    });
    await tools.init();
}

// Run the server!
start();