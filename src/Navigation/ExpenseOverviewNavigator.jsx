
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseOverviewScreen from '../Screens/ExpenseOverview';
import SpendingScreen from '../Screens/Spending';
import MoneyPlanScreen from '../Screens/MoneyPlan';
import IncomeScreen from '../Screens/Income';
import DebtScreen from '../Screens/Debt';
import SavingsScreen from '../Screens/Savings';
import GoalsScreen from '../Screens/Goals';

const Stack = createStackNavigator();

const ExpenseOverviewNavigator = () => (
    <Stack.Navigator initialRouteName="ExpenseOverview">
        <Stack.Screen name="ExpenseOverview" component={ExpenseOverviewScreen} />
        <Stack.Screen name="Spending" component={SpendingScreen} />
        <Stack.Screen name="Money Plan" component={MoneyPlanScreen} />
        <Stack.Screen name="Income" component={IncomeScreen} />
        <Stack.Screen name="Debt" component={DebtScreen} />
        <Stack.Screen name="Savings" component={SavingsScreen} />
        <Stack.Screen name="Goals" component={GoalsScreen} />
    </Stack.Navigator>
);

export default ExpenseOverviewNavigator;

