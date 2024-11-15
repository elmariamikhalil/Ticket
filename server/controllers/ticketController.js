const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Tickets = require("../models/ticketModel");

// @desc Get iser tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  // get user using id and token
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  let tickets;
  if (user.isAdmin) {
    tickets = await Tickets.find();
  } else {
    tickets = await Tickets.find({ user: req.user.id });
  }
  res.status(200).json(tickets);
});

// @desc Get iser tickets
// @route GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
  // get user using id and token
  const user = await User.findById(req.user.id);
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  const ticket = await Tickets.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id && !user.isAdmin) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(ticket);
});

// @desc Create a new ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { category, description, material, envirement } = req.body;

  try {
    if (!category || !material) {
      res.status(400);
      throw new Error("Please add category and material");
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    const ticket = await Tickets.create({
      category,
      description,
      material,
      envirement,
      user: req.user.id,
      status: "new",
    });

    console.log("Ticket Created:", ticket);
    res.status(201).json(ticket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete user tickets
// @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  // get user using id and token
  const user = await User.findById(req.user.id);
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  const ticket = await Tickets.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await ticket.deleteOne({ id: ticket.id });

  res.status(200).json({ success: "true" });
});

// @desc Update user tickets
// @route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
  // get user using id and token
  const user = await User.findById(req.user.id);
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  const ticket = await Tickets.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedTicket = await Tickets.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  deleteTicket,
  updateTicket,
};
