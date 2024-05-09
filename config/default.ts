export default {
  port: 3000,
  env: "development",
  dbUri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lwjkeid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
};
