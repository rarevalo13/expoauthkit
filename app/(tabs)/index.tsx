import { StyleSheet, Platform, Button, useColorScheme } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';
import { WORKOS_CLIENT_ID, WORKOS_REDIRECT_URI } from '@env';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WorkOSIcon } from '@/components/WorkOSIcon';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleSignIn = async () => {
    try {
      console.log('WorkOS Client ID:', WORKOS_CLIENT_ID);
      
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: WORKOS_CLIENT_ID,
        redirect_uri: WORKOS_REDIRECT_URI,
        provider: 'authkit'
      });

      const authUrl = `https://api.workos.com/user_management/authorize?${params.toString()}`;
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        'exp://localhost:3000/explore'
      );
      
      if (result.type === 'success') {
        const url = new URL(result.url);
        const code = url.searchParams.get('code');
        if (code) {
          router.replace({
            pathname: '/explore',
            params: { code }
          });
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#353636' }}
      headerImage={
        <WorkOSIcon
          size={310}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Login</ThemedText>
        <ThemedView style={[
          styles.buttonContainer, 
          colorScheme === 'dark' ? styles.buttonContainerDark : styles.buttonContainerLight
        ]}>
          <Button 
            title="Login" 
            onPress={handleSignIn}
            color={colorScheme === 'dark' ? '#60A5FA' : '#2563EB'}
          />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  buttonContainer: {
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    padding: 4,
  },
  buttonContainerLight: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
  },
  buttonContainerDark: {
    backgroundColor: '#374151',
    shadowColor: '#000000',
  },
  headerImage: {
    color: '#FFFFFF',
    bottom: -90,
    left: -35,
    position: 'absolute',
  }
});
