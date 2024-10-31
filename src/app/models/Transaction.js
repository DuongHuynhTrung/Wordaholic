const mongoose = require("mongoose");

const toolSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    transaction_type: {
      type: String,
    },
    amount: {
      type: Number,
    },
    transaction_code: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tool", toolSchema);
