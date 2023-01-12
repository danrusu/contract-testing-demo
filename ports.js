const findPort = require('find-open-port');

findPort().then(port => {
  console.log(`You may now start listening on free port ${port}`);
});

(async () => {
  for (let port = 1000; port < 10000; port++) {
    const available = await findPort.isAvailable(port);
    if (!available) console.log(`${port} - not available`);
  }
})();
