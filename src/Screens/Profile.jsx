import React, { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet, SafeAreaView } from 'react-native';

const ProfileScreen = ({ navigation }) => {
    const [remindersEnabled, setRemindersEnabled] = useState(false);

    const toggleReminders = () => {
        setRemindersEnabled(previousState => !previousState);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            {/* Reminder Toggle */}
            <View style={styles.settingContainer}>
                <Text style={styles.settingText}>Reminders</Text>
                <Switch
                    value={remindersEnabled}
                    onValueChange={toggleReminders}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={remindersEnabled ? "#f5dd4b" : "#f4f3f4"}
                />
            </View>

            {/* Support Button */}
            <Button
                title="Go to Support"
                onPress={() => navigation.navigate('Support')}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B263B',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        color: '#FFFFFF',
        marginBottom: 20,
    },
    settingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    settingText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
});

export default ProfileScreen;
