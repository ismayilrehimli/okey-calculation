import { StyleSheet, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useApplicationContext } from '../hooks/useApplicationContext';

const PlayerCount = () => {
    const { playerCount, setPlayerCount } = useApplicationContext();

    return (
        <View>
            <Text style={{ textAlign: 'center', marginBottom: 10, fontSize: 40 }}>Seri katil burada !!!</Text>
            <Text style={{ textAlign: 'center', marginBottom: 20, fontSize: 18 }}>Please select player count</Text>
            <RadioButton.Group onValueChange={newValue => setPlayerCount(Number(newValue))} value={playerCount.toString()}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={styles.radioButtonView}>
                        <Text style={styles.radioButtonText}>2</Text>
                        <RadioButton value="2" />
                    </View>
                    <View style={styles.radioButtonView}>
                        <Text style={styles.radioButtonText}>3</Text>
                        <RadioButton value="3" />
                    </View>
                    <View style={styles.radioButtonView}>
                        <Text style={styles.radioButtonText}>4</Text>
                        <RadioButton value="4" />
                    </View>
                </View>
            </RadioButton.Group>
        </View>
    );
}

export default PlayerCount;

const styles = StyleSheet.create({
    radioButtonView: {
        marginHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioButtonText: {
        fontSize: 30,
    }
});
