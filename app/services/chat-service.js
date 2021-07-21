import firestore from '@react-native-firebase/firestore'

export default {
  getMessages() {
    return new Promise(async (resolve, reject) => {
      const snapshot = await firestore()
        .collection('messages')
        .orderBy('time')
        .get()
        .then(snapshot => {
          const model = []
          snapshot.docs.forEach(item => {
            model.push({
              message: item.data().message,
              time: item.data().time,
              id: item.id,
            })
          })
          resolve(model)
        })
        .catch(err => reject(err))
    })
  },

  sendNewMessage(model) {
    return new Promise(async (resolve, reject) => {
      firestore()
        .collection('messages')
        .add(model)
        .then(doc => {
          resolve(doc)
        })
        .catch(err => {
          reject(err)
        })
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
        .update({ message: message })
        .then(() => resolve())
        .catch(err => reject(err))
    })
  },
}
