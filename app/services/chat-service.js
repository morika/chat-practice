import firestore from '@react-native-firebase/firestore'

export default {
  getMessages() {
    return new Promise(async (resolve, reject) => {
      await firestore
        .collection('chat')
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
}
