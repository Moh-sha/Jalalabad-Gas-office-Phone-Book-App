//Admin.js
import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, Button, ScrollView, Image } from 'react-native';
import { addDoc, collection, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from './Components/config';

// UserData Component
const UserData = ({ item, onDelete }) => {
  const { id, username, phone, designation, workstation } = item;

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'user', id));
      onDelete(id);
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  return (
    <View style={styles.userDataContainer}>
      <View style={styles.userData}>
        <Text style={styles.userInfo}>Name: <Text>{username}</Text></Text>
        <Text style={styles.userInfo}>Phone: <Text>{phone}</Text></Text>
        <Text style={styles.userInfo}>Designation: <Text>{designation}</Text></Text>
        <Text style={styles.userInfo}>Workstation: <Text>{workstation}</Text></Text>
      </View>
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
};

export default function Admin() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [designation, setDesignation] = useState('');
  const [workstation, setWorkstation] = useState('');
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

    const unsubscribe = onSnapshot(collection(db, 'user'), (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setUserData(data);
    });

    return () => unsubscribe();
  }, []);

  const handleCreate = async () => {
    try {
      await addDoc(collection(db, 'user'), {
        username,
        phone,
        designation,
        workstation
      });
      console.log('User created successfully');
      setUsername('');
      setPhone('');
      setDesignation('');
      setWorkstation('');
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  };

  const handleDelete = (id) => {
    setUserData(userData.filter(user => user.id !== id));
  };

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
        <Text style={styles.title}>Jalalabad Gas Phone book</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter Name"
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter Phone"
        />
        <TextInput
          style={styles.input}
          value={designation}
          onChangeText={setDesignation}
          placeholder="Enter Designation"
        />
        <TextInput
          style={styles.input}
          value={workstation}
          onChangeText={setWorkstation}
          placeholder="Enter Workstation"
        />
        <Button title="Submit" onPress={handleCreate} />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by Name"
          />
          <View style={styles.buttonContainer}>
            <Button title="Search" onPress={handleSearch} />
            <Button title="Reset" onPress={handleResetSearch} />
          </View>
        </View>
        <View style={styles.userDataContainer}>
          {userData.map((item) => (
            <UserData key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
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
  userInfo: {
    marginBottom: 5,
  },
});
