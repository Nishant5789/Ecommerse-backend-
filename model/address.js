const mongoose = require("mongoose");
const {Schema} = mongoose;

const addressSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"User", required: true},
    name: {type: String, required: true},
    email: {type: String, required:  true},
    phoneNumber: {type: Number, required: true},
    streetAddress: {type: String, required: true},
    city: {type: String,required: true},
    state: {type: String,required: true},
    pinCode: {type: Number, required: true},
  }); 

const virtualId  = addressSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})

addressSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

exports.Address = mongoose.model('Address',addressSchema)