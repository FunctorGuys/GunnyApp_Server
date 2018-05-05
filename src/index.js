var app = require("./app");

app.set("port", process.env.PORT || 3001);
var server = app.listen(app.get("port"), () => {
  console.log("App listening on Port:" + server.address().port);
})