import {NavigationContainer} from '@react-navigation/native';
import Home from './src/page/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Game from './src/page/Game';
import {ApplicationProvider} from './src/context/ApplicationContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApplicationProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Game configuration'}}
          />
          <Stack.Screen
            name="Game"
            component={Game}
            options={{title: 'OKEY SCORE'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
