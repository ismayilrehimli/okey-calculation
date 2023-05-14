import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useApplicationContext} from '../hooks/useApplicationContext';
import {Button, Divider} from 'react-native-paper';

const Game = () => {
  const {playerList, setPlayerList, gameCount, setGameCount} =
    useApplicationContext();

  const handleMinus = (key, item) => {
    const updatedPlayerList = [...playerList];
    const minusResult = item.point - item.tempPoint;
    updatedPlayerList[key] = {...item, point: minusResult, tempPoint: ''};
    updatedPlayerList[key].gameHistory[gameCount].push(`-${item.tempPoint}`);
    setPlayerList(updatedPlayerList);
  };

  const handlePlus = (key, item) => {
    const updatedPlayerList = [...playerList];
    const plusResult = item.point + item.tempPoint;

    updatedPlayerList[key] = {...item, point: plusResult, tempPoint: ''};
    updatedPlayerList[key].gameHistory[gameCount].push(`+${item.tempPoint}`);
    setPlayerList(updatedPlayerList);
  };

  const handleInputChange = (tempPoint, key, item) => {
    const value = parseInt(tempPoint);
    const updatedPlayerList = [...playerList];
    if (!isNaN(value)) {
      updatedPlayerList[key] = {...item, tempPoint: value};
      setPlayerList(updatedPlayerList);
    } else {
      updatedPlayerList[key] = {...item, tempPoint: ''};
      setPlayerList(updatedPlayerList);
    }
  };

  const clearGame = player => {
    player.tempPoint = '';
    player.point = 0;
    player.gameHistory = [[], [], [], [], []];
  };

  const sortAndSetPlaylist = arr => {
    const sortedPlayerList = arr.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    setPlayerList(sortedPlayerList);
  };

  const closeGame = () => {
    setGameCount(0);
    if (playerList.length === 2) {
      const updatedPlayerList = [...playerList];
      const lowestScore = Math.min(
        ...updatedPlayerList.map(player => player.point),
      );
      const lowestScorePlayer = updatedPlayerList.find(
        player => player.point === lowestScore,
      );
      updatedPlayerList.forEach(player => {
        if (player === lowestScorePlayer) {
          player.totalPoint += 1;
        }
        clearGame(player);
      });
      setPlayerList(updatedPlayerList);
    }

    if (playerList.length === 3) {
      const updatedPlayerList = [...playerList];
      updatedPlayerList.sort((a, b) => b.point - a.point);

      updatedPlayerList.forEach((player, index) => {
        if (index === 0) {
          player.totalPoint += 2;
        } else if (index === 1) {
          player.totalPoint += 1;
        } else {
          player.totalPoint += 0;
        }
        clearGame(player);
      });

      sortAndSetPlaylist(updatedPlayerList);
    }

    if (playerList.length === 4) {
      const updatedPlayerList = [...playerList];
      updatedPlayerList.sort((a, b) => b.point - a.point);

      updatedPlayerList.forEach((player, index) => {
        if (index === 0) {
          player.totalPoint += 3;
        } else if (index === 1) {
          player.totalPoint += 2;
        } else if (index === 2) {
          player.totalPoint += 1;
        } else {
          player.totalPoint += 0;
        }
        clearGame(player);
      });

      sortAndSetPlaylist(updatedPlayerList);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <View style={styles.container}>
        <View style={styles.fixedView}>
          {playerList.map((item, key) => (
            <View key={key} style={{flex: 1}}>
              <Text style={{textAlign: 'center', fontSize: 20}}>
                {item.name}:{' '}
                <Text style={{fontWeight: 'bold'}}>{item.totalPoint}</Text>
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            top: 50,
            backgroundColor: '#000',
            flexDirection: 'row',
            paddingVertical: 10,
            alignItems: 'center',
          }}>
          {playerList.map((item, key) => (
            <View key={key} style={{flex: 1, alignItems: 'center'}}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 54}}>
                {item.point.toString()}
              </Text>
              <View style={{marginVertical: 10, marginTop: 10}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handlePlus(key, item)}
                  disabled={item.tempPoint === ''}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.quantity}
                  keyboardType="numeric"
                  value={item.tempPoint.toString()}
                  onChangeText={tempPoint =>
                    handleInputChange(tempPoint, key, item)
                  }
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleMinus(key, item)}
                  disabled={item.tempPoint === ''}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={{backgroundColor: 'white', flexDirection: 'column'}}>
            {playerList[0].gameHistory.map((_, key) => (
              <View
                key={key}
                style={{flex: 1, backgroundColor: 'white', minHeight: 34}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor:
                      key === gameCount
                        ? '#4CAF50'
                        : key > gameCount
                        ? 'gray'
                        : 'white',
                  }}>
                  {playerList.map((player, playerKey) => (
                    <View key={playerKey} style={{flex: 1}}>
                      {player.gameHistory[key].map((score, historyKey) => (
                        <View
                          key={historyKey}
                          style={{flexDirection: 'column'}}>
                          <Text
                            style={{
                              color:
                                key === gameCount
                                  ? 'white'
                                  : key > gameCount
                                  ? 'white'
                                  : 'black',
                              fontSize: 22,
                              textAlign: 'center',
                              marginVertical: 3,
                            }}>
                            {' '}
                            {score}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
                <Divider bold style={{backgroundColor: 'black', height: 2}} />
              </View>
            ))}
          </View>
          {gameCount === 4 ? (
            <Button
              style={{borderRadius: 0, height: 50, justifyContent: 'center'}}
              mode="contained"
              onPress={closeGame}>
              Clear score and start new game
            </Button>
          ) : (
            <Button
              style={{borderRadius: 0, height: 50, justifyContent: 'center'}}
              mode="contained"
              onPress={() => setGameCount(prev => prev + 1)}>
              Next game
            </Button>
          )}
          {gameCount > 0 && (
            <Button
              style={{
                borderRadius: 0,
                height: 50,
                justifyContent: 'center',
                backgroundColor: '#212121',
              }}
              mode="contained"
              onPress={() => setGameCount(prev => prev - 1)}>
              Previous game
            </Button>
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedView: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'lightgray',
  },
  quantity: {
    width: 70,
    height: 54,
    textAlign: 'center',
    fontSize: 30,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    backgroundColor: '#f2f2f2',
    marginHorizontal: 10,
  },
  button: {
    width: 70,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6c757d',
    borderRadius: 3,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
  },
});

export default Game;
