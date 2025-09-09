
import mongoose from "mongoose";

const transactionsummerSchema = new mongoose.Schema(
  {
    user: {
         type: mongoose.Schema.Types.ObjectId,
          ref: "User"
         },
    amount: {
         type: Number,

          },
    currency: {
         type: String,
         default: "INR"
         },
    status: { type: String, enum: ["PENDING", "SUCCESS", "FAILED"], default: "PENDING" },
    meta: { type: Object }, 
  },
  { timestamps: true } 
);

export default mongoose.model("Transaction", transactionsummerSchema);
