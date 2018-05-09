var app = require("./app");
const socketApp = require("./app/socket");

app.set("port", process.env.PORT || 3001);

var server = app.listen(app.get("port"), () => {
  socketApp.connectSocket(server);
  console.log("App listening on Port:" + server.address().port);
})