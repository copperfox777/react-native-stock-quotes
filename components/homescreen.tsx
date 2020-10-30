import React from 'react'
import {
  Button,
  View,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Котировки')}
        title="To stock"
        color="blue"
        accessibilityLabel="Stock quotes"
      />
    </View>
  );
}