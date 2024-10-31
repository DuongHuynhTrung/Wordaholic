const express = require("express");
const itemRouter = express.Router();

const {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../app/controllers/ItemController");
const {
  validateToken,
  validateTokenAdmin,
} = require("../app/middleware/validateTokenHandler");

itemRouter.use(validateToken);

itemRouter.route("/").get(getItems);

itemRouter.route("/").post(validateTokenAdmin, createItem);

itemRouter
  .route("/:id")
  .get(getItemById)
  .put(validateTokenAdmin, updateItem)
  .delete(validateTokenAdmin, deleteItem);

module.exports = itemRouter;
