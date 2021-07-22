import React, {useState, useImperativeHandle} from 'react'
import {View, Text, TouchableHighlight, ActivityIndicator} from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome'

export default MessageContainer = React.forwardRef((props, ref) => {
  const [background, setBacground] = useState('transparent')
  const [message, setMessage] = useState(props.data.message)
  const [isSending, setIsSending] = useState(props.isSending)

  const select = () => {
    setBacground('red')
    props.onSelect()
  }

  useImperativeHandle(ref, () => ({
    deselect() {
      setBacground('transparent')
    },

    edit(message) {
      setMessage(message)
    },

    sent() {
      setIsSending(false)
    },
  }))

  return (
    <View
      key={props.data.id}
      style={{
        width: wp(100),
        paddingVertical: hp(0.3),
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: wp(5),
        backgroundColor: background,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {isSending ? (
            <ActivityIndicator color="blie" size={wp(5)} />
          ) : (
            <Icon name="check" color="green" size={wp(5)} />
          )}
        </View>
        <TouchableHighlight
          underlayColor="green"
          onLongPress={select}
          style={{
            maxWidth: wp(60),
            backgroundColor: 'green',
            paddingHorizontal: wp(2),
            paddingVertical: hp(0.3),
            borderRadius: wp(1),
            marginLeft: wp(2),
          }}>
          <View>
            <Text style={{fontSize: wp(4.5), color: 'white'}}>{message}</Text>
            <Text style={{textAlign: 'right', color: '#d8d8d8'}}>11:00 AM</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
})
