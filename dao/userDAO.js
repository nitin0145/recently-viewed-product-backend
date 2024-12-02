const { getFirestore } = require('firebase-admin/firestore');

async function getRecentlyViewed(userId) {
    const db = getFirestore();
    const docRef = db.collection('users').doc(userId).collection('recentlyViewed');
    const snapshot = await docRef.orderBy('timestamp', 'desc').limit(10).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

module.exports = { getRecentlyViewed };
