const app = require('./index');

const port = process.env.PORT || 3000;
const HOST = '0.0.0.0';

let server;

// added comment to trigger deploy workflow

if (require.main === module) {
  server = app.listen(port, HOST, () => {
    console.log(`API is running on http://${HOST}:${port}`);
  });
}

module.exports = { server };