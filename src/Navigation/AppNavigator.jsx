import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../Screens/Welcome';
import LoginScreen from '../Screens/Login';
import SignupScreen from '../Screens/Signup';
import ConfirmSignup from '../Screens/ConfirmSignup';
import PasswordReset from '../Screens/PasswordReset';
import Home from '../Screens/Home';
import ExpenseOverviewNavigator from './ExpenseOverviewNavigator';

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
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ExpenseOverview"
                component={ExpenseOverviewNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;





