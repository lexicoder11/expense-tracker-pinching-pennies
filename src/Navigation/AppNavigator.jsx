import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../Screens/Welcome';
import LoginScreen from '../Screens/Login';
import SignupScreen from '../Screens/Signup';
// import ExpenseOverviewScreen from '../Screens/ExpenseOverview';
// import ExpenseAddScreen from '../Screens/ExpenseAdd';
// import ExpenseDeleteScreen from '../Screens/ExpenseDelete';
// import ExpenseEditScreen from '../Screens/ExpenseEdit';

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        {/* <Stack.Screen name="ExpenseOverview" component={ExpenseOverviewScreen} />
        <Stack.Screen name="ExpenseAdd" component={ExpenseAddScreen} />
        <Stack.Screen name="ExpenseDelete" component={ExpenseDeleteScreen} />
        <Stack.Screen name="ExpenseEdit" component={ExpenseEditScreen} /> */}
    </Stack.Navigator>
);

export default AppNavigator;