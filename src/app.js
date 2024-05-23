const express = require("express");
const app = express();
const subscriberModel = require("./models/subscribers");

app.get("/", (_, res) => {
  res.json("Youtube Subscribers Backend API created by Nadeem Shareef");
});

// sending GET request to get subscribers list
/**
 * @swagger
 * '/subscribers':
 *  get:
 *     tags:
 *     - Subscribers
 *     summary: Get all subscribers
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
app.get("/subscribers", async (_, res) => {
  try {
    // get all the subscribers from the database and exclude the __v field
    const subscribers = await subscriberModel.find().select("-__v");
    // returns response with list of subscribers
    res.status(200).json(subscribers);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Database Error",
    });
  }
});

// sending GET request at the path "/subscribers/name"
/**
 * @swagger
 * '/subscribers/names':
 *  get:
 *     tags:
 *     - Subscribers
 *     summary: Get all subscribers
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
app.get("/subscribers/names", async (_, res) => {
  try {
    // To retrieve a list of subscribers
    const subscribers = await subscriberModel
      .find()
      .select("-__v -_id -subscribedDate");

    // returns response with list of subscribers
    res.status(200).json(subscribers);
  } catch (err) {
    // if error occurs, returns status 400 with error message
    res.status(400).json({
      error: "Invalid name Url",
    });
  }
});

//sending GET request to fetch data as per id
/**
 * @swagger
 * '/subscribers/{id}':
 *  get:
 *     parameters:
 *     - name: id
 *       in: path
 *     tags:
 *     - Subscribers
 *     summary: Get all subscribers
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
app.get("/subscribers/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let subscribers = await subscriberModel.findById(id).select("-__v");
    res.status(200).json(subscribers);
  } catch (err) {
    res.status(400).json({ message: "Invalid Id" });
  }
});

module.exports = app;
