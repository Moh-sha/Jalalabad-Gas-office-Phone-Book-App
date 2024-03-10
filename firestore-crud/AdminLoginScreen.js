// AdminLoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AdminLoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('admin'); // Default username
  const [password, setPassword] = useState('password'); // Default password

  const handleLogin = () => {
    // Check if the entered credentials match the default credentials
    if (username === 'admin' && password === 'password') {
      // Navigate to the admin dashboard
      navigation.navigate('Admin'); // Navigate to the "Admin" screen
    } else {
      // Show an error message or handle invalid credentials
      alert('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
      
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
       
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default AdminLoginScreen;
