import firestore from '@react-native-firebase/firestore'

export default {
  getMessages() {
    return new Promise((resolve, reject) => {
      firestore()
        .collection('messages')
        .orderBy('time')
        .get()
        .then(snapshot => {
          resolve(snapshot.docs)
        })
        .catch(err => reject(err))
    })
  },

  sendNewMessage(model) {
    return new Promise(async (resolve, reject) => {
      const res = await firestore()
        .collection('messages')
        .doc(model.id)
        .set(model)
      resolve()
    })
  },

  deleteMessage(id) {
    return new Promise((resolve, reject) => {
      firestore()
        .collection('messages')
        .doc(id)
        .delete()
        .then(() => resolve())
        .catch(err => reject(err))
    })
  },

  editMessage(id, message) {
    return new Promise((resolve, reject) => {
      firestore()
        .collection('messages')
        .doc(id)
        .update({message: message})
        .then(() => resolve())
        .catch(err => reject(err))
    })
  },
}
