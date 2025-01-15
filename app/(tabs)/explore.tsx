import { StyleSheet, Image, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WorkOSIcon } from '@/components/WorkOSIcon';
import { WORKOS_CLIENT_ID, WORKOS_CLIENT_SECRET } from '@env';
import Card from '@/components/Cards';

export default function TabTwoScreen() {
  console.log('Component rendering');
  const params = useLocalSearchParams();
  console.log('Params after useLocalSearchParams:', params);
  const [authData, setAuthData] = useState<any>(null);
  const [hasAuthenticated, setHasAuthenticated] = useState(false);

  useEffect(() => {
    console.log('UseEffect triggered. Params:', params);
    
    if (params.code && !hasAuthenticated) {
      console.log('Inside params.code condition');
      setHasAuthenticated(true); // Prevent multiple authentication attempts
      
      const authenticate = async () => {
        try {
          console.log('Starting authentication with code:', params.code);
          
          const response = await fetch('https://api.workos.com/user_management/authenticate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              client_id: WORKOS_CLIENT_ID,
              client_secret: WORKOS_CLIENT_SECRET,
              grant_type: 'authorization_code',
              code: params.code
            })
          });

          const data = await response.json();
          console.log('Parsed authentication response:', data);
          setAuthData(data);
        } catch (error) {
          console.error('Authentication error details:', error);
        }
      };

      authenticate();
    }
  }, [params, hasAuthenticated]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <WorkOSIcon
          size={310}
          style={styles.headerImage}
        />
      }>
      <Collapsible title="Logged In User Info">
        {authData ? (
          <ThemedView>
            
            <Card>
              <ThemedText>User ID: {authData.user?.id}</ThemedText>
            </Card>
            <Card>
              <ThemedText>Email: {authData.user?.email}</ThemedText>
            </Card>
            <Card>
              <ThemedText>First Name: {authData.user?.first_name}</ThemedText>
            </Card>
            <Card>
              <ThemedText>Last Name: {authData.user?.last_name}</ThemedText>
            </Card>
          </ThemedView>
        ) : (
          <ThemedText>Loading user data...</ThemedText>
        )}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#FFFFFF',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  codeBlock: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    color: '#E5E7EB',
  },
});

