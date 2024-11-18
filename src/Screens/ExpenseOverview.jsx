import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import Ionicons from 'react-native-vector-icons/Ionicons';

const poolData = {
    UserPoolId: 'us-west-2_AMexENVv6',
    ClientId: '51dvqq4pk0s3nbj8n3835q3fgf',
};

const ExpenseOverviewScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [numColumns, setNumColumns] = useState(2);
    const [categories, setCategories] = useState([
        { name: 'Spending', color: '#1B263B', icon: 'wallet', screen: 'Spending' },
        { name: 'Money Plan', color: '#1B263B', icon: 'calculator', screen: 'MoneyPlan' },
        { name: 'Income', color: '#1B263B', icon: 'cash', screen: 'Income' },
        { name: 'Debt', color: '#1B263B', icon: 'card', screen: 'Debt' },
        { name: 'Savings', color: '#1B263B', icon: 'arrow-up', screen: 'Savings' },
        { name: 'Goals', color: '#1B263B', icon: 'trophy', screen: 'Goals' },
    ]);
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    useEffect(() => {
        const userPool = new CognitoUserPool(poolData);
        const currentUser = userPool.getCurrentUser();

        if (currentUser) {
            console.log("Current User: ", currentUser);
            currentUser.getSession((err, session) => {
                if (err) {
                    console.error('Session error:', err);
                    return;
                }

                console.log("Session valid:", session);

                currentUser.getUserAttributes((err, attributes) => {
                    if (err) {
                        console.error('Error fetching attributes:', err);
                        return;
                    }

                    console.log("User attributes:", attributes);

                    const username = attributes.find(attr => attr.getName() === 'custom:username')?.getValue() || 'User';
                    console.log("Resolved Username:", username);
                    setUserName(username);
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
                key={numColumns}
                data={filteredCategories}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumns}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.categoryItem, { backgroundColor: item.color }]}
                        onPress={() => navigation.navigate('root', {
                            screen: item.screen, // Navigate to the selected screen
                            params: {
                                screen: item.screen, // Specify the actual screen to show
                            },
                        })}
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
        flex: 1,
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











