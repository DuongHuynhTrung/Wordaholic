const asyncHandler = require("express-async-handler");
const Tool = require("../models/Tool");
const Item = require("../models/Item");
const User = require("../models/User");

// @desc Get all tools
// @route GET /api/tools
// @access private
const getToolsOfUser = asyncHandler(async (req, res) => {
  try {
    const tools = await Tool.find({ user_id: req.user.id })
      .populate("user_id")
      .populate("item_id");
    res.status(200).json(tools);
  } catch (error) {
    res
      .status(res.statusCode || 500)
      .send(error.message || "Internal Server Error");
  }
});

// @desc Get tool by ID
// @route GET /api/tools/:id
// @access private
const getToolById = asyncHandler(async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id)
      .populate("user_id")
      .populate("item_id");
    if (!tool) {
      return res.status(204).send("No Content");
    }
    res.status(200).json(tool);
  } catch (error) {
    res
      .status(res.statusCode || 500)
      .send(error.message || "Internal Server Error");
  }
});

// @desc Create or update a tool
// @route POST /api/tools
// @access private
const buyItem = asyncHandler(async (req, res) => {
  try {
    const { item_id, quantity } = req.body;

    if (!item_id || !quantity) {
      res.status(400);
      throw new Error("item_id and quantity are required.");
    }

    if (quantity <= 0) {
      res.status(400);
      throw new Error("Quantity must be greater than 0");
    }

    const itemExists = await Item.findById(item_id);
    if (!itemExists) {
      res.status(400);
      throw new Error("Item Not Found!");
    }
    const totalPrice = itemExists.price * quantity;
    const user = await User.findById(req.user.id);
    if (user.coins < totalPrice) {
      res.status(400);
      throw new Error("You don't have enough coins to buy");
    }
    user.coins -= totalPrice;
    await user.save();

    let tool = await Tool.findOne({ user_id: req.user.id, item_id });

    if (tool) {
      tool.quantity += quantity;
      tool = await tool.save();
      res.status(200).json(tool);
    } else {
      const newTool = await Tool.create({
        user_id: req.user.id,
        item_id,
        quantity,
      });
      res.status(201).json(newTool);
    }
  } catch (error) {
    res
      .status(res.statusCode || 500)
      .send(error.message || "Internal Server Error");
  }
});

// @desc Create or update a tool
// @route POST /api/tools/stamina
// @access private
const buyStamina = asyncHandler(async (req, res) => {
  try {
    //! 20 coins tương đương 50 Statmina với 1 Quantity:

    const { quantity } = req.body;

    if (!quantity) {
      res.status(400);
      throw new Error("Quantity are required.");
    }

    if (quantity <= 0) {
      res.status(400);
      throw new Error("Quantity must be greater than 0");
    }

    const totalStamina = 50 * quantity;
    const totalPrice = 20 * quantity;
    const user = await User.findById(req.user.id);
    if (user.coins < totalPrice) {
      res.status(400);
      throw new Error("You don't have enough coins to buy");
    }

    user.stamina += totalStamina;
    user.coins -= totalPrice;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res
      .status(res.statusCode || 500)
      .send(error.message || "Internal Server Error");
  }
});

// @desc Delete a tool
// @route DELETE /api/tools/:id
// @access private
const useTool = asyncHandler(async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      res.status(404);
      throw new Error("Tool Not Found!");
    }
    if (tool.quantity <= 1) {
      tool.quantity = 0;
      await Tool.findByIdAndDelete(req.params.id);
    } else {
      tool.quantity -= 1;
      await tool.save();
    }
    res.status(200).json(tool);
  } catch (error) {
    res
      .status(res.statusCode || 500)
      .send(error.message || "Internal Server Error");
  }
});

module.exports = {
  getToolsOfUser,
  getToolById,
  buyItem,
  buyStamina,
  useTool,
};
