const userService = require("../services/userService");

exports.getRecentlyViewed = async (req, res) => {
  try {
    const userId = req.params.userId;
    const recentlyViewed = await userService.getRecentlyViewed(userId);
    res.status(200).json({ products: recentlyViewed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logProductView = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productId } = req.body;
    await userService.logProductView(userId, productId);
    res.status(200).json({ message: "Product view logged successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
