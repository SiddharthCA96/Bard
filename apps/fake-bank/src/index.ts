import express from "express";
import { bankRouter } from "../routes/bankRoutes";

const app = express();

app.use(express.json());

app.use("/api/bank", bankRouter);

// Start the server
app.listen(3004, () => {
  console.log("Server is running on http://localhost:3004");
});
