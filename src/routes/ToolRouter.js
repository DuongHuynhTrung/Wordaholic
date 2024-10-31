const express = require("express");
const toolRouter = express.Router();

const {
  getToolsOfUser,
  getToolById,
  buyItem,
  useTool,
  buyStamina,
} = require("../app/controllers/ToolController");
const { validateToken } = require("../app/middleware/validateTokenHandler");

toolRouter.use(validateToken);

toolRouter.route("/").get(getToolsOfUser);

toolRouter.route("/").post(buyItem);

toolRouter.route("/stamina").post(buyStamina);

toolRouter.route("/:id").get(getToolById).put(useTool);

module.exports = toolRouter;
