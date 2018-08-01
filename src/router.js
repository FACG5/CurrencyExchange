const { serverStaticFile, handelHomePage, handelError ,handelApi} = require("./handler");

function router(req, res) {
  const endponit = req.url;
  if (endponit === "/") {
    handelHomePage(req, res);
  } else if (endponit.includes("public")) {
    serverStaticFile(req, res);
  } else if (endponit == "/calc" && req.method=='POST') {
    handelApi(req,res);
  } else {
    handelError(res);
  }
}
module.exports = router;
