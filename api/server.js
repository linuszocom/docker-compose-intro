const app = require('./api/index');

const port = process.env.PORT || 3000;
const HOST = '0.0.0.0';

let server;

if (require.main === module) {
  server = app.listen(port, HOST, () => {
    console.log(`API is running on http://${HOST}:${port}`);
  });
}

module.exports = { server };