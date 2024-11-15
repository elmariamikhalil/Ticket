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
      required: [true, "Please select a category"],
      enum: ["Material", "Envirement", "Other"],
    },
    material: {
      type: String,
      required: function () {
        return this.category === "Material";
      },
      required: [true, "Please select a material"],
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
    envirement: {
      type: String,
      required: function () {
        return this.category === "Envirement";
      },
      required: [true, "Please select an envirement"],
      enum: ["Teams", "Outlook", "Browser", "Excel", "Other"],
    },
    description: {
      type: String,
      required: [false, "Please enter a description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "pending", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tickets", ticketSchema);
