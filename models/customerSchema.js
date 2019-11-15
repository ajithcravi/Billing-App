const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema ({
  customerName : {
    required  : true
  },
  customerContactNo : {
    type : Number,
    required : true
  }
})

module.exports = customer = mongoose.model('customers', customerSchema);