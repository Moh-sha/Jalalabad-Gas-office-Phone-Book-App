import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './Components/config';

const User = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'user'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setUserData(data);
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredData = userData.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setUserData(filteredData);
  };

  const handleResetSearch = async () => {
    setSearchQuery('');
    const querySnapshot = await getDocs(collection(db, 'user'));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    setUserData(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Image source={require('./assets/download.png')} style={styles.logo} />
        <Text style={styles.title}>User Phone List</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by Name"
          />
         
          <Button
            title="Search"
            onPress={handleSearch}
            style={styles.button}
          />
          <Button
            title="Reset"
            onPress={handleResetSearch}
            style={styles.button}
          />
        </View>
        <View style={styles.userDataContainer}>
          {userData.map((user) => (
            <View key={user.id} style={styles.userData}>
              <Text>Name: {user.username}</Text>
              <Text>Phone: {user.phone}</Text>
              <Text>Designation: {user.designation}</Text>
              <Text>Workstation: {user.workstation}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:25,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    width: '60%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  button: {
    width: 30, // Adjust the width as needed
    height: 30, // Adjust the height as needed
    // Set the background color
  },
  userDataContainer: {
    marginTop: 20,
    width: '100%',
  },
  userData: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
});

export default User;
