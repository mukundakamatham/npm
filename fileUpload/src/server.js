
const connect = require("./configs/db");
const app=require("./index")

app.listen(3002, async function () {
    await connect();
    console.log("listening on port 3000")
});