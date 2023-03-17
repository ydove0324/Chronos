const mongoose = require("mongoose");
const PlanSchema = new mongoose.Schema({
  creator_name: String,
  creator_id: String,
  start_time: Date,
  end_time: Date,
  plan_content: String,
});
module.exports = mongoose.model("plan", PlanSchema);
