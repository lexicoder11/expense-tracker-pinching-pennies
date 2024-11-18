import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Hardcoded Cognito User Pool Data
const poolData = {
    UserPoolId: 'us-west-2_AMexENVv6',
    ClientId: '51dvqq4pk0s3nbj8n3835q3fgf',
};

const ExpenseOverviewScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('');  // State to store the username
    const [numColumns, setNumColumns] = useState(2); // State to control number of columns
    const [categories, setCategories] = useState([
        { name: 'Spending', color: '#1B263B', icon: 'wallet', screen: 'SpendingScreen' },
        { name: 'Money Plan', color: '#1B263B', icon: 'calculator', screen: 'MoneyPlanScreen' },
        { name: 'Income', color: '#1B263B', icon: 'cash', screen: 'IncomeScreen' },
        { name: 'Debt', color: '#1B263B', icon: 'card', screen: 'DebtScreen' },
        { name: 'Savings', color: '#1B263B', icon: 'arrow-up', screen: 'SavingsScreen' },
        { name: 'Goals', color: '#1B263B', icon: 'trophy', screen: 'GoalsScreen' },
    ]);
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [searchQuery, setSearchQuery] = useState('');

    // Handle search query change
    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    useEffect(() => {
        // Initialize the Cognito User Pool
        const userPool = new CognitoUserPool(poolData);

        // Get the current authenticated user
        const currentUser = userPool.getCurrentUser();

        if (currentUser) {
            console.log("Current User: ", currentUser);

            // Fetch the user's session
            currentUser.getSession((err, session) => {
                if (err) {
                    console.error('Session error:', err);
                    return;
                }

                console.log("Session valid:", session);

                // If session is valid, fetch user attributes
                currentUser.getUserAttributes((err, attributes) => {
                    if (err) {
                        console.error('Error fetching attributes:', err);
                        return;
                    }

                    console.log("User attributes:", attributes);

                    // Find the custom username attribute
                    const username =
                        attributes.find(attr => attr.getName() === 'custom:username')?.getValue() ||
                        'User';

                    console.log("Resolved Username:", username);
                    setUserName(username); // Update state with the username
                });
            });
        } else {
            console.log('No user is logged in');
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hi, {userName}</Text>
            </View>

            {/* Search Input with Icon */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Categories"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            {/* Display Filtered Categories */}
            <FlatList
                key={numColumns} // Add the `key` prop here to trigger re-render when numColumns changes
                data={filteredCategories}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumns}  // Dynamically set the number of columns
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.categoryItem, { backgroundColor: item.color }]}
                        onPress={() => navigation.navigate(item.screen)}  // Navigate to the category's specific screen
                    >
                        <Ionicons name={item.icon} size={24} color="#fff" style={styles.categoryIcon} />
                        <Text style={styles.categoryText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    greeting: {
        marginTop: 40,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1B263B',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#FFF',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#000',
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ddd',
        flex: 1,  // Ensure items fill available space equally
        justifyContent: 'center',
    },
    categoryIcon: {
        marginRight: 10,
        color: '#28A745',
    },
    categoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#28A745',
    },
});

export default ExpenseOverviewScreen;











