import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/logging";
import AuthorRoutes from './routes/AuthorRoute';
import BookRoutes from './routes/BookRoute';

const router = express();

mongoose
  .connect(config.mongo.url, { w: "majority", retryWrites: true })
  .then(() => {
    // console.log('connected');
    Logging.info("Connected to MongoDB");
    startServer();
  })
  .catch((err) => {
    Logging.error(`Unable to connect to MongoDB ${err}`);
  });

/*  Only Start the server if Mongo connects  */
const startServer = () => {
  router.use((req, res, next) => {
    /** */
    Logging.info(
      `Incoming -> Method [ ${req.method} ]  - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] `
    );

    res.on("finish", () => {
      Logging.info(
        `Outgoing -> Method [ ${req.method} ]  - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /**  Rules of our API  */

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /**Routes */
router.use('/author', AuthorRoutes);
router.use('/books', BookRoutes);



  /** Health Checks */

  router.get('/ping', (req, res, next) => 
     res.status(200).json({ message: "Pinged Successfullly" })
  );

  /**  Error Handling */

  router.use((req, res, next) => {
    const erorr = new Error("not found");

    Logging.error(erorr);

    return res.status(404).json({ message: "Not Found" });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server started on port ${config.server.port}`)
    );
};

