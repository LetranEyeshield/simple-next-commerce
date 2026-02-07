// import mongoose from 'mongoose'

// const OrderSchema = new mongoose.Schema(
//   {
//     stripeSessionId: { type: String, required: true },
//     paymentIntentId: { type: String },
//     amount: { type: Number, required: true },
//     currency: { type: String, default: 'php' },

//     customer: {
//       firstName: String,
//       middleName: String,
//       lastName: String,
//       address: String,
//       email: String,
//       contactNumber: String,
//     },

//     items: [
//       {
//         productId: String,
//         name: String,
//         price: Number,
//         quantity: Number,
//       },
//     ],

//     status: {
//       type: String,
//       enum: ['paid', 'failed'],
//       default: 'paid',
//     },
//   },
//   { timestamps: true }
// )

// export default mongoose.models.Order ||
//   mongoose.model('Order', OrderSchema)

////////////

import mongoose, { Schema, models, model } from 'mongoose'

const OrderSchema = new Schema(
  {
    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
    },

    customer: {
      firstName: String,
      middleName: String,
      lastName: String,
      address: String,
      email: String,
      contactNumber: String,
    },

    items: [
      {
        productId: String,
        name: String,
        price: Number,
        image: String,
        quantity: Number,
      },
    ],

    amountTotal: Number,
    currency: String,
    paymentStatus: String,
  },
  { timestamps: true }
)

export const Order = models.Orders || model('Orders', OrderSchema)




  
