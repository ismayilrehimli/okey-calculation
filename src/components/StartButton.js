import { View } from 'react-native';
import { useApplicationContext } from '../hooks/useApplicationContext';
import { Button } from 'react-native-paper';

const StartButton = ({ navigation }) => {
    const { playerList, setPlayerList } = useApplicationContext();

    return (
        <View style={{ marginTop: 20 }}>
            <Button
                disabled={!playerList.every(item => item.name !== '')}
                style={{ borderRadius: 0, height: 50, justifyContent: 'center' }}
                mode="contained"
                onPress={() => {
                    if (playerList.length > 2) {
                        const sortedPlayerList = playerList.sort((a, b) => {
                            if (a.name < b.name) {
                                return -1;
                            }
                            if (a.name > b.name) {
                                return 1;
                            }
                            return 0;
                        });

                        setPlayerList(sortedPlayerList);
                    }
                    navigation.navigate('Game')
                }}
            >
                Go to game
            </Button>
        </View>
    );
}

export default StartButton;
