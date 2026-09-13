import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { useFavorites } from '@/context/FavoritesContext';
import { useTheme } from '@/hooks/use-theme';

export default function FavoritesScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Text style={styles.empty}>Aún no tienes canciones favoritas</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: Spacing.two, paddingTop: Spacing.three }}
        renderItem={({ item }) => (
          <View style={styles.resultCard}>
            <Image source={{ uri: item.coverUrl }} style={styles.cover} />
            <View>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.artist} numberOfLines={1}>
                {item.artist}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function createStyles(theme: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: Spacing.three,
    },
    empty: {
      color: theme.text,
      marginTop: Spacing.four,
      textAlign: 'center',
    },
    resultCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.three,
      backgroundColor: theme.backgroundElement,
      borderRadius: Spacing.two,
      padding: Spacing.two,
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