import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../Screens/Welcome';
import LoginScreen from '../Screens/Login';
import SignupScreen from '../Screens/Signup';
import ProfileScreen from '../Screens/Profile';
import SupportScreen from '../Screens/Support';
// import ExpenseOverviewScreen from '../Screens/ExpenseOverview';
// import ExpenseAddScreen from '../Screens/ExpenseAdd';
// import ExpenseDeleteScreen from '../Screens/ExpenseDelete';
// import ExpenseEditScreen from '../Screens/ExpenseEdit';
// import ProfileScreen from '../Screens/Profile';
// import SupportScreen from '../Screens/Support';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()
const AppNavigator = () => (
    <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        {/* <Stack.Screen name="ExpenseOverview" component={ExpenseOverviewScreen} /> */}
        {/* <Stack.Screen name="ExpenseAdd" component={ExpenseAddScreen} />
        <Stack.Screen name="ExpenseDelete" component={ExpenseDeleteScreen} />
        <Stack.Screen name="ExpenseEdit" component={ExpenseEditScreen} /> */}
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        {/* <Stack.Screen name="Support" component={SupportScreen} /> */}
    </Stack.Navigator>
);

export default AppNavigator;