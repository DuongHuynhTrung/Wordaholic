const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    quantity: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
