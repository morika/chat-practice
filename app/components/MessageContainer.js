import React, {useState, useImperativeHandle} from 'react'
import {View, Text, TouchableHighlight, ActivityIndicator} from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome'

export default MessageContainer = React.forwardRef((props, ref) => {
  const [background, setBacground] = useState('transparent')
  const [isSending, setIsSending] = useState(props.isSending)

  const select = () => {
    setBacground('rgba(2,153,0, 0.5)')
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
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {isSending ? (
            <ActivityIndicator color="#00c3ff" size={wp(5)} />
          ) : (
            <Icon name="check" color="green" size={wp(5)} />
          )}
        </View>
        <TouchableHighlight
          underlayColor="#18b716"
          onLongPress={select}
          style={{
            maxWidth: wp(60),
            backgroundColor: '#18b716',
            paddingHorizontal: wp(2),
            paddingVertical: hp(0.3),
            borderRadius: wp(1),
            marginLeft: wp(2),
          }}>
          <View>
            <Text style={{flex: 1, fontSize: wp(4.5), color: 'white'}}>
              {props.data.message}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{textAlign: 'right', color: '#d8d8d8', fontSize: wp(3)}}>
                11:00 AM
              </Text>
              {props.data.isEdited ? (
                <Text
                  style={{
                    textAlign: 'right',
                    color: '#d8d8d8',
                    marginLeft: wp(2),
                    fontSize: wp(3),
                  }}>
                  edited
                </Text>
              ) : null}
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
})
