import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { Colors } from '../theme/colors';

export const BlueprintLabsBrandHeader: React.FC<{ subtitle?: string }> = ({
  subtitle = 'Designing Spaces, Building Dreams',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
          <Rect x="2" y="2" width="24" height="24" rx="6" fill={Colors.primary} />
          {/* House icon inside square */}
          <Path
            d="M7 15 L14 9 L21 15 V21 H16 V16 H12 V21 H7 Z"
            stroke={Colors.white}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        <Text style={styles.brandTitle}>BlueprintLabs</Text>
      </View>
      {subtitle ? <Text style={styles.brandSubtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -0.3,
  },
  brandSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
