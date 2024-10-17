import React, { useRef, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Animated, StyleSheet } from 'react-native';
import ExpenseScreen from '../Screens/ExpenseOverview';
import SupportScreen from '../Screens/Support';
import ProfileScreen from '../Screens/Profile';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, color, size, focused }) => {
    const animatedScale = useRef(new Animated.Value(focused ? 1.2 : 1)).current;

    useEffect(() => {
        Animated.spring(animatedScale, {
            toValue: focused ? 1.2 : 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    }, [focused]);

    return (
        <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
            <Ionicons name={name} size={size} color={color} />
        </Animated.View>
    );
};

const Home = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size, focused }) => {
                let iconName;

                if (route.name === 'Expense') iconName = 'wallet-outline';
                else if (route.name === 'Support') iconName = 'help-circle-outline';
                else if (route.name === 'Profile') iconName = 'person-outline';

                return <TabIcon name={iconName} color={color} size={size} focused={focused} />;
            },
            tabBarActiveTintColor: '#28A745',
            tabBarInactiveTintColor: '#ccc',
            tabBarStyle: styles.tabBar,
            headerShown: false,
        })}
    >
        <Tab.Screen name="Expense" component={ExpenseScreen} />
        <Tab.Screen name="Support" component={SupportScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
);

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#1B263B',
        borderTopWidth: 0,
        height: 70,
        paddingBottom: 10,
        paddingTop: 10,
    },
});

export default Home;


