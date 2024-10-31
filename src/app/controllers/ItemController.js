const asyncHandler = require("express-async-handler");
const Item = require("../models/Item");
const RoleEnum = require("../../enum/RoleEnum");

//@desc Get all items
//@route GET /api/items
//@access public
const getItems = asyncHandler(async (req, res) => {
  try {
    const items = await Item.find().exec();
    res.status(200).json(items);
  } catch (error) {
    res
      .status(res.statusCode || 500)
      .send(error.message || "Internal Server Error");
  }
});

//@desc Get item by ID
//@route GET /api/items/:id
//@access public
const getItemById = asyncHandler(async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).exec();
    if (!item) {
      res.status(404);
      throw new Error("Item Not Found!");
    }
    res.status(200).json(item);
  } catch (error) {
    res
      .status(res.statusCode || 500)
      .send(error.message || "Internal Server Error");
  }
});

//@desc Create a new item
//@route POST /api/items
//@access private (Admin only)
const createItem = asyncHandler(async (req, res) => {
  try {
    if (req.user.roleName !== RoleEnum.ADMIN) {
      res.status(403);
      throw new Error("Only admins can create items");
    }

    const { item_name, description, price } = req.body;
    const newItem = await Item.create({
      item_name,
      description,
      price,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res
      .status(res.statusCode || 500)
      .send(error.message || "Internal Server Error");
  }
});

//@desc Update an item
//@route PUT /api/items/:id
//@access private (Admin only)
const updateItem = asyncHandler(async (req, res) => {
  try {
    if (req.user.roleName !== RoleEnum.ADMIN) {
      res.status(403);
      throw new Error("Only admins can update items");
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error("Item not found");
    }

    const { item_name, description, price } = req.body;
    const updateFields = {
      item_name: item_name != undefined ? item_name : item.item_name,
      description: description != undefined ? description : item.description,
      price: price != undefined ? price : item.price,
    };

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateFields,
      {
        new: true,
      }
    );

    if (!updatedItem) {
      res.status(500);
      throw new Error("Something went wrong when updating item!");
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res
      .status(res.statusCode || 500)
      .send(error.message || "Internal Server Error");
  }
});

//@desc Delete an item
//@route DELETE /api/items/:id
//@access private (Admin only)
const deleteItem = asyncHandler(async (req, res) => {
  try {
    if (req.user.roleName !== RoleEnum.ADMIN) {
      res.status(403);
      throw new Error("Only admins can delete items");
    }

    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error("Item Not Found!");
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res
      .status(res.statusCode || 500)
      .send(error.message || "Internal Server Error");
  }
});

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
