import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import {StackActions} from '@react-navigation/native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

export default SplashScreen = props => {
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     props.navigation.dispatch(StackActions.replace('Main'))
  //   }, 3000)
  // })

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <Image
          source={require('../assets/images/logo.png')}
          style={{
            width: wp(40),
            height: wp(40),
            marginTop: hp(20),
            marginBottom: hp(2),
          }}
          resizeMode="center"
        />
        <Text style={styles.text}>CHAT</Text>
        <Text style={styles.text}>PRACTICE</Text>
      </View>
      <Text
        style={{paddingVertical: hp(2), fontSize: wp(4), textAlign: 'center'}}>
        by Morteza Gholami
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: wp(8),
  },
})
