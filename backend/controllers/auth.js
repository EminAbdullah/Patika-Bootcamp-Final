const authService = require("../services/auth");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.status(200).json({ token, message:"Giriş başarılı!"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await authService.register(name, email, password);
    res.status(201).json({user , message:"Kullanıcı kaydı oluşturuldu!"} );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
