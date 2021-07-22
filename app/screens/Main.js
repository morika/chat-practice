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
  ScrollView,
} from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {MessageContainer} from '../components'
import {chatService} from '../services'
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid'

// import Theme from './app/scripts/theme'

export default Main = () => {
  const [messagesList, setMessagesList] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(-1)
  const [selectedMessageId, setSelectedMessageId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)
  const flatListRef = useRef()
  const messageRefs = useRef([])
  const inputRef = useRef()

  React.useEffect(() => {
    getChat()
  }, [])

  const getChat = async () => {
    setIsLoading(true)
    chatService
      .getMessages()
      .then(data => {
        const array = []
        Promise.all(
          data.map(item => {
            array.push(createMessageBox(item.data(), false))
          }),
        )
          .then(() => {
            setMessagesList(array)
            setIsLoading(false)
          })
          .catch(err => console.log('[0231] ' + err))
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err)
      })
  }

  const createMessageBox = (message, isSending = true) => {
    return (
      <MessageContainer
        ref={ref => messageRefs.current.push(ref)}
        key={message.id}
        data={message}
        isSending={isSending}
        onSelect={() => setSelectedMessageId(message.id)}
      />
    )
  }

  const chatBody = () => {
    return (
      <FlatList
        ref={flatListRef}
        data={messagesList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) =>
          item
        }
      />
    )
  }

  const enterKey = () => {
    if (isEditMode) {
      editMessage()
    } else {
      sendMessage()
    }
    setIsEditMode(false)
  }

  const sendMessage = () => {
    const id = uuidv4()
    const model = {id: id, message: newMessage, time: Date.now()}
    const node = createMessageBox(model)
    const list = messagesList
    list.push(node)
    setMessagesList(list)
    const refIndex = messageRefs.current.length

    chatService
      .sendNewMessage(model)
      .then(() => {
        messageRefs.current[refIndex].sent()
      })
      .catch(err => console.log('[1935] ' + err))

    flatListRef.current.scrollToEnd()
    setNewMessage('')
  }

  const deleteMessage = () => {
    messageRefs.current[selectedMessageIndex].deselect()
    messageRefs.current.splice(selectedMessageIndex, 1)

    chatService
      .deleteMessage(messageList[selectedMessageIndex].id)
      .then()
      .catch(err => console.log('[2142] ' + err))

    messageList.splice(selectedMessageIndex, 1)
    setSelectedMessageIndex(-1)
  }

  const editMessage = () => {
    let list = messageList
    list[selectedMessageIndex].message = newMessage
    setMessageList(list)
    messageRefs.current[selectedMessageIndex].deselect()
    chatService.editMessage(messageList[selectedMessageIndex].id, newMessage)
    setNewMessage('')
    setSelectedMessageIndex(-1)
  }

  const editMessageButton = () => {
    setNewMessage(messageList[selectedMessageIndex].message)
    setIsEditMode(true)
    inputRef.current.focus()
  }

  const copyMessage = () => {
    ToastAndroid.show('Text copied to clipboard', ToastAndroid.LONG)
    messageRefs.current[selectedMessageIndex].deselect()
    setSelectedMessageIndex(-1)
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
              onPress={editMessageButton}>
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
          ref={inputRef}
          style={{flex: 1, fontSize: wp(4)}}
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
        />
        <TouchableHighlight
          underlayColor="silver"
          style={[styles.button, {marginHorizontal: 0}]}
          onPress={enterKey}>
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
