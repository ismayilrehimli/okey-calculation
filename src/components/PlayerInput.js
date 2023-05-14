import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useApplicationContext } from '../hooks/useApplicationContext';
import { TextInput } from 'react-native-paper';

const PlayerInput = () => {
    const { playerList, setPlayerList } = useApplicationContext();

    return (
        <View style={{ marginTop: 20 }}>
            {playerList.map((item, key) => (
                <View style={{ marginVertical: 5 }} key={key}>
                    <TextInput
                        label={`Player ${key + 1}`}
                        value={item.name}
                        onChangeText={text => {
                            const updatedPlayerList = [...playerList];
                            updatedPlayerList[key] = { ...item, name: text };
                            setPlayerList(updatedPlayerList);
                        }}
                    />
                </View>
            ))}

        </View>
    );
}

export default PlayerInput;

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
