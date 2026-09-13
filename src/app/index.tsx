import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const glow = useSharedValue(0);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, { duration: 1300, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    shadowOpacity: 0.4 + glow.value * 0.6,
    shadowRadius: 14 + glow.value * 20,
    transform: [{ scale: 1 + glow.value * 0.05 }],
  }));

  return (
    <LinearGradient
      colors={['#1a0007', '#3d0714', theme.background]}
      style={styles.gradient}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.center}>
          <Animated.View style={[styles.iconGlow, glowStyle]}>
            <Ionicons name="musical-notes" size={72} color="#FF073A" />
          </Animated.View>

          <Text style={styles.title}>Music Explorer</Text>
          <Text style={styles.subtitle}>
            Tu catálogo personal de música favorita
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function createStyles(theme: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    gradient: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingHorizontal: Spacing.four,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: Spacing.three,
    },
    iconGlow: {
      shadowColor: '#FF073A',
      shadowOffset: { width: 0, height: 0 },
      elevation: 15,
      marginBottom: Spacing.two,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.text,
      textShadowColor: '#FF073A',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 12,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
    },
  });
}