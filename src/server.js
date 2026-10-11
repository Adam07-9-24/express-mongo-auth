import "dotenv/config";
import dns from "node:dns";
import mongoose from "mongoose";
import app from "./app.js";

// Configurar DNS para resolver MongoDB Atlas
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Variables de entorno
const PORT = process.env.PORT || 3000;
const { MONGO_URI } = process.env;

// Iniciar servidor
const startServer = async () => {
  if (!MONGO_URI) {
    console.error("MONGO_URI is not defined");
    process.exit(1);
  }

  try {
    // Conectar con MongoDB Atlas
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB Atlas");

    // Iniciar Express después de conectar
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB Atlas:", error.message);
    process.exit(1);
  }
};

startServer();
