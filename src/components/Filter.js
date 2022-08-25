import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Filter = ({ value }) => {
  return (    
    <Text style={styles.txt}>{value}</Text>
  )
}

const styles = StyleSheet.create({
  txt: {
    color: 'black',
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    width: 80,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
    textAlign: 'center',
  }
});

export default Filter;