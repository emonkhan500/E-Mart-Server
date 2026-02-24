require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`E-Mart Server is Running On Port: ${port}`);
});