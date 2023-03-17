const mongoose = require("mongoose");
const PlanSchema = new mongoose.Schema({
  creator_name: String,
  creator_id: String,
  start_time: String,
  end_time: String,
  plan_content: String,
});
module.exports = mongoose.model("plan", PlanSchema);
