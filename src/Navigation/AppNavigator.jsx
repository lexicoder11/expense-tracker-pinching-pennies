import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../Screens/Welcome';
import LoginScreen from '../Screens/Login';
import SignupScreen from '../Screens/Signup';
import ConfirmSignup from '../Screens/ConfirmSignup';
import PasswordReset from '../Screens/PasswordReset';
import Home from '../Screens/Home'; // Home.jsx contains the Tab.Navigator

const Stack = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ConfirmSignup" component={ConfirmSignup} />
            <Stack.Screen name="PasswordReset" component={PasswordReset} />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }} // Hide the header on the Home screen
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;




