const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  any: Schema.Types.Mixed
})

module.exports = items = mongoose.model('userobjs', itemsSchema);