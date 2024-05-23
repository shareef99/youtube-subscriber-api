const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Youtube Subscriber API Documentation",
      description:
        "API endpoints documentation for Youtube Subscriber API Project created by Nadeem Shareef",
      contact: {
        name: "Nadeem Shareef",
        email: "nadeemshareef934@.gmail.com",
        url: "https://github.com/shareef99",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Local Server",
      },
      {
        url: "https://youtube-subscriber-api.onrender.com/",
        description: "Live Server",
      },
    ],
  },
  apis: ["./src/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;
