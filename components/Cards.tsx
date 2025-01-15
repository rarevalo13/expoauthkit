import { ReactNode } from 'react';
import { View, StyleSheet, useColorScheme  } from 'react-native';

export default function Card({ children }: { children: ReactNode }) {
    const colorScheme = useColorScheme();
  return (
    <View style={[
        styles.card,
        colorScheme === 'dark' ? styles.darkCard : styles.lightCard
      ]}>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
    card: {
      padding: 16,
      borderRadius: 12,
      marginVertical: 8,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      fontSize: 1,
    },
    lightCard: {
      backgroundColor: '#8B5CF6', // Purple-500
    },
    darkCard: {
      backgroundColor: '#6D28D9', // Purple-700
    },
  });