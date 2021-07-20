import React from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
// import Theme from './app/scripts/theme'

export default Main = () => {
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableHighlight style={styles.button} underlayColor="#29A9EB">
            <Icon name="copy" color="white" size={wp(6)} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} underlayColor="#29A9EB">
            <Icon name="edit" color="white" size={wp(6)} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} underlayColor="#29A9EB">
            <Icon name="trash" color="white" size={wp(6)} />
          </TouchableHighlight>
        </View>
      </View>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={{flex: 1}}></ImageBackground>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: wp(5),
        }}>
        <TextInput placeholder="Message" style={{flex: 1, fontSize: wp(4)}} />
        <Icon name="paper-plane" color="gray" size={wp(6)} />
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
