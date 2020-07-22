const server = require("./api/server");

// const hostName = process.env.hostName || "127.0.0.1";
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
