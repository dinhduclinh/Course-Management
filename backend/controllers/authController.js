import Account from "../models/Account.js";

export const register = async (req, res) => {
  const { username, password, fullname, email, address, dob, gender, roleid } =
    req.body;

  // Kiểm tra độ dài mật khẩu
  if (password.length < 8 || password.length > 16) {
    return res
      .status(400)
      .json({ message: "Mật khẩu phải có độ dài từ 8 đến 16 ký tự." });
  }

  try {
    // Kiểm tra tính duy nhất của username
    const existingAccount = await Account.findOne({ username });
    if (existingAccount) {
      return res
        .status(400)
        .json({
          message:
            "Tên đăng nhập đã tồn tại. Vui lòng chọn tên đăng nhập khác.",
        });
    }

    // Tạo tài khoản mới
    const newAccount = new Account({
      username,
      password, // Lưu mật khẩu trực tiếp
      fullname,
      email,
      address,
      dob,
      gender,
      roleid,
    });

    await newAccount.save();
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đăng ký thất bại, vui lòng thử lại!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(400).json({ message: "Tài khoản hoặc mật khẩu không đúng!" });
    }

    // So sánh mật khẩu trực tiếp
    if (account.password !== password) {
      return res
        .status(400)
        .json({ message: "Tài khoản hoặc mật khẩu không đúng!" });
    }

    res.status(200).json({ message: "Đăng nhập thành công!", user: account });
  } catch (error) {
    res.status(500).json({ message: "Đăng nhập thất bại, vui lòng thử lại!" });
  }
};

export const changePassword = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(400).json({ message: "Tài khoản không tồn tại!" });
    }

    // So sánh mật khẩu cũ
    if (account.password !== oldPassword) {
      return res.status(400).json({ message: "Mật khẩu cũ không đúng!" });
    }

    // Cập nhật mật khẩu mới
    account.password = newPassword;
    await account.save();

    res
      .status(200)
      .json({ message: "Mật khẩu đã được thay đổi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đổi mật khẩu thất bại, vui lòng thử lại!" });
  }
};
