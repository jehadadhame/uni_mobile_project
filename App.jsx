import { NavigationContainer } from '@react-navigation/native';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { app, db } from './utils/firebase/initfirebase';
import { initializeDatabase } from './initdatabase';
import { AuthNavigator } from './components/navigation/AuthNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './context/AppContext';
import { AppNavigator } from './components/navigation/AppNavigator';


export default function App() {
  const { user } = useAuth();
  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="smart-community-marketplace.db" onInit={initializeDatabase}>
        <AuthProvider>
          <View style={styles.container}>
            <NavigationContainer>
              {user ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
          </View>
        </AuthProvider>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});