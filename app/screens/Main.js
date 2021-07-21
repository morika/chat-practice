import React, {useState, useRef} from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  ImageBackground,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {MessageContainer} from '../components'
import {chatService} from '../services'
// import Theme from './app/scripts/theme'

export default Main = () => {
  const [messageList, setMessageList] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(true)
  const flatListRef = useRef()

  React.useEffect(() => {
    getChat()
  }, [])

  const getChat = async () => {
    setIsLoading(true)
    chatService
      .getMessages()
      .then(data => {
        setIsLoading(false)
        setMessageList(data)
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err)
      })
  }

  const chatBody = () => {
    const messageRefs = []
    return (
      <FlatList
        ref={flatListRef}
        data={messageList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <MessageContainer
            ref={ref => messageRefs.push(ref)}
            message={item.message}
            onSelect={() => setSelectedMessageIndex(index)}
          />
        )}
      />
    )
  }

  const sendNewMessage = () => {
    if (newMessage !== '') {
      const model = {message: newMessage, time: Date.now()}
      messageList.push(model)
      flatListRef.current.scrollToEnd()

      chatService
        .sendNewMessage(model)
        .then()
        .catch(err => console.log('[1935] ' + err))

      setNewMessage('')
    }
  }

  const deleteMessage = () => {
    if (selectedMessageIndex > -1) {
      messageRefs[selectedMessageIndex].deselect()
      //messageRefs.current.splice[(selectedMessageIndex, 1)]
      messageList.splice(selectedMessageIndex, 1)
      setSelectedMessageIndex(-1)
    }
  }

  const editMessage = () => {
    if (selectedMessageIndex > -1) {
      messageRefs.current[selectedMessageIndex].edit(newMessage)
      setNewMessage('')
      setSelectedMessageIndex(-1)
    }
  }

  const copyMessage = () => {
    if (selectedMessageIndex > -1) {
      ToastAndroid.show('Text copied to clipboard', ToastAndroid.LONG)
      messageRefs.current[selectedMessageIndex].deselect()
      setSelectedMessageIndex(-1)
    }
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#3D5573" />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#54759E',
          paddingVertical: hp(1),
          paddingHorizontal: wp(5),
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={{
              width: wp(15),
              height: wp(15),
            }}
          />
          <View style={{marginLeft: wp(2), justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: wp(5),
                color: 'white',
              }}>
              Your Friend
            </Text>
            <Text
              style={{
                fontSize: wp(3),
                color: '#d3d3d3',
              }}>
              Online
            </Text>
          </View>
        </View>
        {selectedMessageIndex > -1 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableHighlight
              style={styles.button}
              underlayColor="#29A9EB"
              onPress={copyMessage}>
              <Icon name="copy" color="white" size={wp(6)} />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              underlayColor="#29A9EB"
              onPress={editMessage}>
              <Icon name="edit" color="white" size={wp(6)} />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              underlayColor="#29A9EB"
              onPress={deleteMessage}>
              <Icon name="trash" color="white" size={wp(6)} />
            </TouchableHighlight>
          </View>
        ) : null}
      </View>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={{flex: 1, justifyContent: 'center'}}>
          {isLoading ? (
            <ActivityIndicator color="blue" size={wp(10)} />
          ) : (
            chatBody()
          )}
        </ImageBackground>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: wp(3),
        }}>
        <TextInput
          placeholder="Message"
          style={{flex: 1, fontSize: wp(4)}}
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
        />
        <TouchableHighlight
          underlayColor="silver"
          style={[styles.button, {marginHorizontal: 0}]}
          onPress={sendNewMessage}>
          <Icon name="paper-plane" color="gray" size={wp(6)} />
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: wp(1),
    width: wp(12),
    height: wp(12),
    borderRadius: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
})
