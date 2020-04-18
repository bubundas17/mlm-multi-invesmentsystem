const express = require('express');
const router = express.Router();
const Invoices = require("../../models/Invoice.js");

const adminOnly = require("../../controllers/adminOnly");
const authenticared = require("../../controllers/authenticated");

router.get("/", authenticared, async (req, res) => {
  let invoices = await Invoices.find({user: req.user._id}).sort({"_id": -1});
  res.send({invoices})
});

router.get("/all", adminOnly, (req, res) => {
  res.send()
});

router.get("/:id", authenticared, async (req, res) => {
  let invoice = await Invoices.findById(req.params.id);

  if(! invoice) return res.status(404).send({error: 1, message: "Invoice Not Found."});
  if(String(invoice.user) !== String(req.user._id) && ! req.user.admin) return res.status(404).send({error: 1, message: "Invoice Not Found."});
  res.send({invoice})
});
module.exports = router;
