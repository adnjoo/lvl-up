import { Redirect } from 'expo-router';
import useAuth from 'hooks/useAuth';

export default function Splash() {
  const { user, loading } = useAuth(); // Get auth state

  if (loading) return null; // Wait until auth status is determined

  return <Redirect href={user ? '/(tabs)' : 'auth'} />;
}
