import firestore from '@react-native-firebase/firestore'

export default {
  getMessages() {
    return new Promise(async (resolve, reject) => {
      const snapshot = await firestore()
        .collection('messages')
        .orderBy('time')
        .get()
      resolve(snapshot.docs.map(doc => doc.data()))
    })
  },

  sendNewMessage(model) {
    return new Promise((resolve, reject) => {
      firestore()
        .collection('messages')
        .add(model)
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
}
