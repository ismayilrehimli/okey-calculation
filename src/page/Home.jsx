import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import PlayerCount from '../components/PlayerCount';
import PlayerInput from '../components/PlayerInput';
import StartButton from '../components/StartButton';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{alignItems: 'center', marginBottom: 5}}>
              <Image
                source={require('../assets/okey.png')}
                style={{width: 220, height: 100}}
              />
            </View>
            <PlayerCount />
            <PlayerInput />
            <StartButton navigation={navigation} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Home;
