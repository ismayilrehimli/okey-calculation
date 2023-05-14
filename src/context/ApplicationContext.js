import { createContext, useEffect, useState } from 'react';

export const ApplicationContext = createContext({});

export const ApplicationProvider = ({ children }) => {
    const [playerCount, setPlayerCount] = useState(2);
    const [playerList, setPlayerList] = useState([])
    const [gameCount, setGameCount] = useState(0);

    useEffect(() => {
        const newPlayerList = Array.from({ length: playerCount }, () => ({
            name: '',
            totalPoint: 0,
            point: 0,
            tempPoint: '',
            gameHistory: [[], [], [], [], []]
        }));
        setPlayerList(newPlayerList);
        setGameCount(0);
    }, [playerCount]);

    return (
        <ApplicationContext.Provider
            value={{
                playerCount,
                setPlayerCount,
                playerList,
                setPlayerList,
                gameCount,
                setGameCount
            }}>
            {children}
        </ApplicationContext.Provider>
    );
};
