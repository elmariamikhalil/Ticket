const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["Material", "Envirement", "Other"],
    },
    Material: {
      type: String,
      required: [true, "Please select a product"],
      enum: [
        "Laptop",
        "Screen",
        "Headset",
        "Camera",
        "Keyboard",
        "Mouse",
        "UsbHub",
        "Network",
      ],
    },
    Envirement: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["teams", "Outlook", "Browser", "Excel", "Other"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enume: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tickets", ticketSchema);
