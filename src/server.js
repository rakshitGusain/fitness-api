const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./services/mongo");

require("dotenv").config();

const server = http.createServer(app);
const PORT = process.env.PORT;

function createServer() {
  mongoConnect();

  server.listen(PORT, () => {
    console.log("Listening to PORT : ", PORT);
  });
}

createServer();
