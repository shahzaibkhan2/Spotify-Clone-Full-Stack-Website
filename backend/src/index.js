import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/index.js";

// Database connection
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8001, () => {
      console.log("Server is listening to port: ", process.env.PORT || 8001);
    });
  })
  .catch((err) => {
    console.log(
      `Status 500 connection to database failed due to error: ${err}`
    );
  });
