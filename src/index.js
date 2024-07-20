import { app } from "./app.js";
import connectDB from "./db/db.js";

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error(`Error: ${error.message}`);
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });
