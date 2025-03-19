// backend/models/UserWallet.js
import mongoose from "mongoose";

const userWalletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  xu: { type: Number, default: 0 },
});

const UserWallet = mongoose.model("UserWallet", userWalletSchema);

export default UserWallet;
