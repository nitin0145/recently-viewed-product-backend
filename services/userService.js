const logger = require("../utils/logger");

exports.logProductView = async (userId, productId) => {
  try {
    const userRef = db.collection("users").doc(userId).collection("recentlyViewed");
    const productDoc = userRef.doc(productId);

    const productData = {
      productId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    const productCount = await userRef.get();
    if (productCount.size >= RECENTLY_VIEWED_LIMIT) {
      const oldestProduct = productCount.docs[productCount.size - 1];
      await oldestProduct.ref.delete();
      logger.info(`Deleted the oldest product for user ${userId}`);
    }

    await productDoc.set(productData); 
    logger.info(`Logged product view for user ${userId}, product ${productId}`);
  } catch (error) {
    logger.error(`Error logging product view for user ${userId}: ${error.message}`);
    throw new Error("Error logging product view: " + error.message);
  }
};
