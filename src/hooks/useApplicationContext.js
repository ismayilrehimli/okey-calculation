// @ts-nocheck
import { useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';


export const useApplicationContext = () => {
    const { playerCount, setPlayerCount, playerList, setPlayerList, gameCount, setGameCount } = useContext(ApplicationContext);

    return { playerCount, setPlayerCount, playerList, setPlayerList, gameCount, setGameCount };
};
