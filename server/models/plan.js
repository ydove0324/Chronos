const mongoose = require("mongoose");
const PlanSchema = new mongoose.Schema({});
module.exports = mongoose.model("plan", PlanSchema);
