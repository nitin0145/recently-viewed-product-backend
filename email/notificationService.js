const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Setup Nodemailer transporter for Gmail (or other service)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,  // Add your email here
    pass: process.env.GMAIL_PASS   // Add your email password here (use App Password for better security)
  }
});

exports.sendEmailOnFrequentViews = functions.firestore
  .document('users/{userId}/recentlyViewed/{productId}')
  .onCreate(async (snap, context) => {
    const userId = context.params.userId;
    const productId = snap.data().productId;
    const timestamp = snap.data().timestamp;

    // Fetch the number of times this product has been viewed in the last 24 hours
    const productRef = admin.firestore().collection("users").doc(userId).collection("recentlyViewed");
    const viewsSnapshot = await productRef
      .where("productId", "==", productId)
      .where("timestamp", ">", admin.firestore.Timestamp.now().toMillis() - 24 * 60 * 60 * 1000)
      .get();

    if (viewsSnapshot.size > 2) {
      // Send email if the product has been viewed more than twice in the last 24 hours
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: "user@example.com",  // Replace with the user's email from Firebase Authentication
        subject: "Product Viewed Frequently",
        text: `The product with ID ${productId} has been viewed more than twice in the last 24 hours. Check it out!`
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
      } catch (error) {
        console.error("Error sending email: ", error);
      }
    }

    return null; // To complete the function
  });
