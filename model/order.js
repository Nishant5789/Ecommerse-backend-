const mongoose = require("mongoose");
const {Schema} = mongoose;


const orderSchema = new Schema({
    items: {type: [Schema.Types.ObjectId], ref: 'Product', required: true},
    totalAmount: {type: Number},
    totalItems: {type: Number},
    user: {type: Schema.Types.ObjectId, ref:'User', required: true},
    payment: {type: String, require: true},
    status: {type: String, default:'pending', require: true},
    selectedAddress : {type: [Schema.Types.Mixed], require: true},
  });

const virtualId  = orderSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})

orderSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})


exports.Order = mongoose.model('Order',orderSchema)