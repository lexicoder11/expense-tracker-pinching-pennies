import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Animated,
} from 'react-native';
import Button from '../Components/Button'; // Ensure Button is properly imported

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Animated values for fade and zoom effects
    const fadeAnim = useRef(new Animated.Value(0)).current; // Start invisible
    const scaleAnim = useRef(new Animated.Value(0.8)).current; // Start smaller

    // Run animation on component mount
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1, // Fully visible
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1, // Full size
                friction: 5, // Adds smooth bounce
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('Welcome');
    };

    return (
        <View style={styles.container}>
            <Animated.Text
                style={[
                    styles.title,
                    { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                ]}
            >
                Welcome Back!
            </Animated.Text>

            <Animated.View
                style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
            >
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    placeholderTextColor="#aaa"
                />
            </Animated.View>

            <Animated.View
                style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
            >
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry
                    placeholderTextColor="#aaa"
                />
            </Animated.View>

            <Animated.View
                style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
            >
                <Button title="Login" onPress={handleLogin} />
            </Animated.View>

            <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
                style={styles.link}
            >
                <Text style={styles.linkText}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        alignSelf: 'flex-start',
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#007bff',
        paddingBottom: 5,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
    },
    link: {
        marginTop: 15,
    },
    linkText: {
        color: '#007bff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default LoginScreen;


