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

export default Main = () => {
  const [messagesList, setMessagesList] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedMessageId, setSelectedMessageId] = useState('we')
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
        Promise.all(
          data.map(item => {
            setMessagesList(old => [
              ...old,
              createMessageBox(item.data(), false),
            ])
          }),
        )
          .then(() => {
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
        ref={ref => {
          if (ref) {
            messageRefs.current[messagesList.length - 1] = ref
          }
        }}
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
        renderItem={({item, index}) => item}
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
    if (newMessage !== '') {
      const id = uuidv4()
      const model = {
        id: id,
        message: newMessage,
        time: Date.now(),
        isEdited: false,
      }
      const node = createMessageBox(model)
      const index = pushNodeInList(node)

      chatService
        .sendNewMessage(model)
        .then(() => {
          messageRefs.current[index].sent()
        })
        .catch(err => console.log('[1935] ' + err))

      flatListRef.current.scrollToEnd()
      setNewMessage('')
    }
  }

  const pushNodeInList = node => {
    const list = messagesList
    const length = list.push(node)
    setMessagesList(list)
    return length - 1
  }

  const findSelectedMessageIndex = () => {
    let res = -1
    messagesList.forEach((item, index) => {
      if (item.props.data.id === selectedMessageId) {
        res = index
      }
    })

    return res
  }

  const deleteMessage = () => {
    const index = findSelectedMessageIndex()
    messageRefs.current.splice(index, 1)
    messagesList.splice(index, 1)

    chatService
      .deleteMessage(selectedMessageId)
      .then()
      .catch(err => console.log('[2142] ' + err))
    setSelectedMessageId('')
  }

  const editMessage = () => {
    if (newMessage !== '') {
      let list = messagesList
      const index = findSelectedMessageIndex()
      list[index].props.data.message = newMessage
      list[index].props.data.isEdited = true
      setMessagesList(list)
      messageRefs.current[index].deselect()
      chatService
        .editMessage(selectedMessageId, newMessage)
        .then()
        .catch(err => console.log('[1355] ' + err))
      setNewMessage('')
      setSelectedMessageId('')
    }
  }

  const editMessageButton = () => {
    setNewMessage(messagesList[findSelectedMessageIndex()].props.data.message)
    setIsEditMode(true)
    inputRef.current.focus()
  }

  const copyMessage = () => {
    // ToastAndroid.show('Text copied to clipboard', ToastAndroid.LONG)
    // messageRefs.current[findSelectedMessageIndex()].deselect()
    // setSelectedMessageId('')
    console.log('messagesList lengh: ' + messagesList.length)
    console.log('messageRefs length: ' + messageRefs.current.length)
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
        {selectedMessageId !== '' ? (
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
            <ActivityIndicator color="#00c3ff" size={wp(10)} />
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
          placeholderTextColor="gray"
          ref={inputRef}
          style={{flex: 1, fontSize: wp(4), color: 'gray'}}
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
    width: wp(12),
    height: wp(12),
    borderRadius: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
})
