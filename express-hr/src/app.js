const express = require('express');
const app = express();

app.get('*', (req, res) => res.status(200).json('Hello World 3!'));

app.listen(80);

process.on('exit', function () {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
  // some other closing procedures go here
  process.exit(0);
});
