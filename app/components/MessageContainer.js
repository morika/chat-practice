import React, {useState, useImperativeHandle} from 'react'
import {View, Text, TouchableHighlight} from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

export default MessageContainer = React.forwardRef((props, ref) => {
  const [background, setBacground] = useState('transparent')
  const [message, setMessage] = useState(props.message)

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
  }))

  return (
    <View
      style={{
        width: wp(100),
        paddingVertical: hp(0.3),
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: wp(5),
        backgroundColor: background,
      }}>
      <TouchableHighlight
        underlayColor="green"
        onLongPress={select}
        style={{
          maxWidth: wp(60),
          backgroundColor: 'green',
          paddingHorizontal: wp(2),
          paddingVertical: hp(0.3),
          borderRadius: wp(1),
        }}>
        <View>
          <Text style={{fontSize: wp(4.5), color: 'white'}}>{message}</Text>
          <Text style={{textAlign: 'right', color: '#d8d8d8'}}>11:00 AM</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
})
