import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Download, Share2, MoreVertical, Sparkles } from 'lucide-react-native';
import Svg, { Rect, Line, Text as SvgText, Circle, Path } from 'react-native-svg';
import { Colors } from '../src/theme/colors';

// 2D Architectural Floor Plan Graphic (Matching Screen 07 Layout)
const ArchitecturalPlanPreview: React.FC = () => {
  return (
    <View style={styles.canvasContainer}>
      <Svg width={320} height={250} viewBox="0 0 320 250">
        {/* Exterior Wall Boundary */}
        <Rect x="15" y="15" width="290" height="220" stroke={Colors.primary} strokeWidth="4" fill="#FFFFFF" />

        {/* Interior Walls */}
        {/* Bedroom 1 (Top Left) */}
        <Rect x="15" y="15" width="130" height="110" stroke={Colors.primary} strokeWidth="3" fill="#FAFBFD" />
        {/* Bedroom 2 (Top Right) */}
        <Rect x="195" y="15" width="110" height="110" stroke={Colors.primary} strokeWidth="3" fill="#FAFBFD" />
        {/* Kitchen (Bottom Left) */}
        <Rect x="15" y="155" width="120" height="80" stroke={Colors.primary} strokeWidth="3" fill="#FAFBFD" />
        {/* Bathroom (Center Left) */}
        <Rect x="15" y="125" width="80" height="30" stroke={Colors.primary} strokeWidth="2.5" fill="#FAFBFD" />
        {/* Balcony (Bottom Right) */}
        <Rect x="205" y="170" width="100" height="65" stroke={Colors.primary} strokeWidth="2.5" strokeDasharray="4 2" fill="#F4F8FD" />

        {/* Door Openings & Swings */}
        <Path d="M 145 75 A 25 25 0 0 1 145 100" stroke={Colors.secondary} strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
        <Line x1="145" y1="75" x2="145" y2="100" stroke={Colors.primary} strokeWidth="2.5" />

        <Path d="M 195 75 A 25 25 0 0 0 195 100" stroke={Colors.secondary} strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
        <Line x1="195" y1="75" x2="195" y2="100" stroke={Colors.primary} strokeWidth="2.5" />

        {/* Furniture Layout */}
        {/* Bed 1 */}
        <Rect x="25" y="30" width="55" height="50" rx="3" stroke={Colors.primary} strokeWidth="1.5" fill="#E8F1FD" />
        <Rect x="25" y="30" width="55" height="14" rx="2" fill="#C7DDFC" />
        {/* Bed 2 */}
        <Rect x="235" y="30" width="55" height="50" rx="3" stroke={Colors.primary} strokeWidth="1.5" fill="#E8F1FD" />
        <Rect x="235" y="30" width="55" height="14" rx="2" fill="#C7DDFC" />

        {/* Living Room Sofa (Center) */}
        <Rect x="145" y="125" width="50" height="24" rx="3" stroke={Colors.primary} strokeWidth="1.5" fill="#E8F1FD" />
        {/* Coffee Table */}
        <Rect x="155" y="155" width="30" height="15" rx="2" stroke={Colors.secondary} strokeWidth="1" fill="#FFFFFF" />

        {/* Dining Table with Chairs */}
        <Circle cx="255" cy="140" r="14" stroke={Colors.primary} strokeWidth="1.5" fill="#E8F1FD" />
        <Circle cx="236" cy="140" r="4" fill={Colors.secondary} />
        <Circle cx="274" cy="140" r="4" fill={Colors.secondary} />
        <Circle cx="255" cy="121" r="4" fill={Colors.secondary} />
        <Circle cx="255" cy="159" r="4" fill={Colors.secondary} />

        {/* Kitchen Counter & Stove */}
        <Rect x="25" y="165" width="40" height="16" stroke={Colors.primary} strokeWidth="1.5" fill="#E8F1FD" />
        <Circle cx="35" cy="173" r="3.5" fill={Colors.primary} />
        <Circle cx="50" cy="173" r="3.5" fill={Colors.primary} />

        {/* Room Labels */}
        <SvgText x="50" y="105" fontSize="9" fontWeight="bold" fill={Colors.primary}>Bedroom 1</SvgText>
        <SvgText x="230" y="105" fontSize="9" fontWeight="bold" fill={Colors.primary}>Bedroom 2</SvgText>
        <SvgText x="145" y="112" fontSize="10" fontWeight="bold" fill={Colors.primary}>Living Room</SvgText>
        <SvgText x="50" y="215" fontSize="9" fontWeight="bold" fill={Colors.primary}>Kitchen</SvgText>
        <SvgText x="25" y="142" fontSize="7" fontWeight="bold" fill={Colors.textSecondary}>Bath</SvgText>
        <SvgText x="235" y="210" fontSize="9" fontWeight="bold" fill={Colors.secondary}>Balcony</SvgText>
      </Svg>
    </View>
  );
};

export default function GeneratedFloorPlanPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My House</Text>
          <View style={styles.topActions}>
            <TouchableOpacity style={styles.actionIcon} onPress={() => router.push('/share')}>
              <Share2 size={18} color={Colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}>
              <Download size={18} color={Colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}>
              <MoreVertical size={18} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Generated Status Pill */}
        <View style={styles.statusPill}>
          <Sparkles size={14} color={Colors.secondary} />
          <View>
            <Text style={styles.statusPillTitle}>Your floor plan is ready</Text>
            <Text style={styles.statusPillSubtitle}>Generated from your voice description</Text>
          </View>
        </View>

        {/* Interactive Vector Floor Plan Preview */}
        <ArchitecturalPlanPreview />

        {/* Key Specs Bar */}
        <View style={styles.specsBar}>
          <View style={styles.specItem}>
            <Text style={styles.specValue}>2</Text>
            <Text style={styles.specLabel}>Bedrooms</Text>
          </View>
          <View style={styles.specDivider} />
          <View style={styles.specItem}>
            <Text style={styles.specValue}>1</Text>
            <Text style={styles.specLabel}>Bathroom</Text>
          </View>
          <View style={styles.specDivider} />
          <View style={styles.specItem}>
            <Text style={styles.specValue}>~850</Text>
            <Text style={styles.specLabel}>sq ft</Text>
          </View>
        </View>

        {/* Room Sizes Breakdown Card */}
        <View style={styles.roomSizesCard}>
          <Text style={styles.roomSizesHeading}>Room sizes</Text>
          <View style={styles.roomSizesGrid}>
            <View style={styles.roomSizeItem}>
              <Text style={styles.roomName}>Living Room</Text>
              <Text style={styles.roomDimensions}>16' × 12'</Text>
            </View>
            <View style={styles.roomSizeItem}>
              <Text style={styles.roomName}>Bedroom 1</Text>
              <Text style={styles.roomDimensions}>12' × 11'</Text>
            </View>
            <View style={styles.roomSizeItem}>
              <Text style={styles.roomName}>Bedroom 2</Text>
              <Text style={styles.roomDimensions}>12' × 11'</Text>
            </View>
            <View style={styles.roomSizeItem}>
              <Text style={styles.roomName}>Kitchen</Text>
              <Text style={styles.roomDimensions}>10' × 8'</Text>
            </View>
            <View style={styles.roomSizeItem}>
              <Text style={styles.roomName}>Bathroom</Text>
              <Text style={styles.roomDimensions}>8' × 5'</Text>
            </View>
            <View style={styles.roomSizeItem}>
              <Text style={styles.roomName}>Balcony</Text>
              <Text style={styles.roomDimensions}>10' × 4'</Text>
            </View>
          </View>
        </View>

        {/* Bottom Action CTAs */}
        <View style={styles.bottomButtonsRow}>
          <TouchableOpacity
            style={styles.regenerateButton}
            activeOpacity={0.85}
            onPress={() => router.push('/voice')}
          >
            <Text style={styles.regenerateButtonText}>Regenerate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editPlanButton}
            activeOpacity={0.85}
            onPress={() => router.push('/editor')}
          >
            <Text style={styles.editPlanButtonText}>Edit Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    padding: 4,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.secondaryLight,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 12,
  },
  statusPillTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  statusPillSubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  canvasContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  specsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 10,
  },
  specItem: {
    alignItems: 'center',
  },
  specValue: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  specLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  specDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.border,
  },
  roomSizesCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    marginVertical: 10,
  },
  roomSizesHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  roomSizesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
  },
  roomSizeItem: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 12,
  },
  roomName: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  roomDimensions: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  bottomButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  regenerateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  regenerateButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  editPlanButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  editPlanButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
});
