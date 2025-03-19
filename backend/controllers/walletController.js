// backend/controllers/walletController.js
import UserWallet from "../models/UserWallet.js";

export const getUserWallet = async (req, res) => {
  const { userId } = req.params;
  try {
    const userWallet = await UserWallet.findOne({ userId });
    if (!userWallet) {
      return res.status(404).json({ message: "User wallet not found" });
    }
    res.status(200).json(userWallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserWallet = async (req, res) => {
  const { userId, amount, type } = req.body;
  try {
    let userWallet = await UserWallet.findOne({ userId });
    if (!userWallet) {
      userWallet = new UserWallet({ userId, xu: 0 });
    }

    if (type === "credit") {
      userWallet.xu += amount;
    } else if (type === "debit") {
      if (userWallet.xu < amount) {
        return res.status(400).json({ message: "Insufficient xu" });
      }
      userWallet.xu -= amount;
    }

    await userWallet.save();
    res.status(200).json(userWallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adminUpdateUserWallet = async (req, res) => {
  const { userId, amount, type } = req.body;
  try {
    let userWallet = await UserWallet.findOne({ userId });
    if (!userWallet) {
      userWallet = new UserWallet({ userId, xu: 0 });
    }

    if (type === "credit") {
      userWallet.xu += amount;
    } else if (type === "debit") {
      if (userWallet.xu < amount) {
        return res.status(400).json({ message: "Insufficient xu" });
      }
      userWallet.xu -= amount;
    }

    await userWallet.save();
    res.status(200).json(userWallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
