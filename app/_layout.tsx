import { Stack } from 'expo-router';
import { useColorScheme } from '../components/useColorScheme';
import Colors from '../constants/Colors';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'MeditationAI',
          headerShown: false, // Beautiful minimalist hero screen needs no header
        }} 
      />
      <Stack.Screen 
        name="meditation" 
        options={{ 
          title: 'Meditation',
          headerShown: false, // Hide header for meditation screen (we have custom header)
          presentation: 'modal', // Nice modal transition
        }} 
      />
      <Stack.Screen 
        name="modal" 
        options={{ 
          title: 'Modal',
          presentation: 'modal',
        }} 
      />
    </Stack>
  );
}
