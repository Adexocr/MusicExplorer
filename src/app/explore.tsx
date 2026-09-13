import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { useFavorites } from '@/context/FavoritesContext';
import { useTheme } from '@/hooks/use-theme';
import { searchMusic, Track } from '@/services/musicApi';

export default function ExploreScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const glow = useSharedValue(0);

useEffect(() => {
  glow.value = withRepeat(
    withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
    -1,
    true
  );
}, []);

const glowStyle = useAnimatedStyle(() => ({
  shadowOpacity: 0.4 + glow.value * 0.6,
  shadowRadius: 8 + glow.value * 14,
  transform: [{ scale: 1 + glow.value * 0.03 }],
}));

  const [term, setTerm] = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    if (!term.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const tracks = await searchMusic(term);
      setResults(tracks);
    } catch (err) {
      setError('No se pudo buscar. Revisa tu conexión.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TextInput
        style={styles.input}
        placeholder="Busca una canción o artista"
        placeholderTextColor={theme.textSecondary}
        value={term}
        onChangeText={setTerm}
        onSubmitEditing={handleSearch}
      />

      <Animated.View style={[styles.buttonGlow, glowStyle]}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSearch}
          activeOpacity={0.8}>
          <View style={styles.buttonTextRow}>
  {'¡Buscalo!'.split('').map((letter, index) => (
    <AnimatedLetter
      key={index}
      letter={letter}
      index={index}
      style={styles.buttonText}
    />
  ))}
</View>
        </TouchableOpacity>
      </Animated.View>

      {loading && <Text style={styles.info}>Cargando...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: Spacing.two }}
       renderItem={({ item }) => {
        const favorited = isFavorite(item.id);
        return (
          <View style={styles.resultCard}>
            <Image source={{ uri: item.coverUrl }} style={styles.cover} />
            <View style={styles.resultText}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {item.artist}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => (favorited ? removeFavorite(item.id) : addFavorite(item))}>
        <Text style={[styles.heart, favorited && styles.heartActive]}>
          {favorited ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>
    </View>
  );
      }}
      />
    </SafeAreaView>
  );
}


function AnimatedLetter({ letter, index, style }: { letter: string; index: number; style: any }) {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withDelay(
      index * 110,
      withRepeat(
        withSequence(
          withTiming(-2, { duration: 350, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: 350, easing: Easing.in(Easing.ease) })
        ),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return (
    <Animated.Text style={[style, animatedStyle]}>
      {letter === ' ' ? '\u00A0' : letter}
    </Animated.Text>
  );
}

function createStyles(theme: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: Spacing.three,
    },
    input: {
      backgroundColor: theme.backgroundElement,
      color: theme.text,
      borderRadius: Spacing.two,
      padding: Spacing.three,
      marginTop: Spacing.three,
      marginBottom: Spacing.two,
    },
    buttonGlow: {
      borderRadius: Spacing.two,
      marginBottom: Spacing.three,
      shadowColor: '#FF073A',
      shadowOffset: { width: 0, height: 0 },
      elevation: 15,
    },
    button: {
      backgroundColor: '#b01433',
      paddingVertical: Spacing.two,
      borderRadius: Spacing.three,
      alignItems: 'center',
      borderWidth: 5,
      borderColor: '#f2909e',
  },
  buttonTextRow: {
  flexDirection: 'row',
},
    buttonText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 16,
      letterSpacing: 1,
      textShadowColor: '#671c2b',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
},
    info: {
      color: theme.text,
      marginBottom: Spacing.two,
    },
    error: {
      color: '#E5484D',
      marginBottom: Spacing.two,
    },
    heart: {
  fontSize: 22,
  color: theme.textSecondary,
    },
    heartActive: {
    color: '#FF073A',
    },
    resultCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.three,
      backgroundColor: theme.backgroundElement,
      borderRadius: Spacing.two,
      padding: Spacing.two,
    },
    resultText: {
      flex: 1,
    },
    cover: {
      width: 40,
      height: 40,
      borderRadius: Spacing.one,
    },
    title: {
      color: theme.text,
      fontWeight: 'bold',
    },
    artist: {
      color: theme.textSecondary,
    },
  });
}