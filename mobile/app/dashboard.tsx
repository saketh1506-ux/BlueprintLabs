import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Menu,
  Plus,
  Home as HomeIcon,
  LayoutGrid,
  Users,
  MoreVertical,
  Clock,
} from 'lucide-react-native';
import Svg, { Rect, Path, Line } from 'react-native-svg';
import { Colors } from '../src/theme/colors';

// Miniature Floor Plan Vector Thumbnail Component
const FloorPlanThumbnail: React.FC<{ type?: number }> = ({ type = 1 }) => {
  return (
    <View style={styles.thumbnailContainer}>
      <Svg width={110} height={70} viewBox="0 0 110 70">
        <Rect x="2" y="2" width="106" height="66" rx="4" stroke={Colors.primary} strokeWidth="1.5" fill="#F8FAFC" />
        {type === 1 && (
          <>
            {/* 2BHK Layout Thumbnail */}
            <Line x1="45" y1="2" x2="45" y2="68" stroke={Colors.primary} strokeWidth="1.5" />
            <Line x1="45" y1="36" x2="108" y2="36" stroke={Colors.primary} strokeWidth="1.5" />
            <Line x1="2" y1="42" x2="45" y2="42" stroke={Colors.primary} strokeWidth="1.5" />
            {/* Furniture cues */}
            <Rect x="8" y="8" width="18" height="18" rx="2" stroke={Colors.secondary} strokeWidth="1" fill="#E8F1FD" />
            <Rect x="65" y="8" width="22" height="16" rx="2" stroke={Colors.secondary} strokeWidth="1" fill="#E8F1FD" />
            <Rect x="60" y="46" width="20" height="14" rx="2" stroke={Colors.secondary} strokeWidth="1" fill="#E8F1FD" />
          </>
        )}
        {type === 2 && (
          <>
            {/* Vacation Villa Thumbnail */}
            <Line x1="60" y1="2" x2="60" y2="45" stroke={Colors.primary} strokeWidth="1.5" />
            <Line x1="2" y1="45" x2="108" y2="45" stroke={Colors.primary} strokeWidth="1.5" />
            <Rect x="12" y="10" width="24" height="20" rx="2" stroke={Colors.secondary} strokeWidth="1" fill="#E8F1FD" />
            <Rect x="70" y="12" width="22" height="18" rx="2" stroke={Colors.secondary} strokeWidth="1" fill="#E8F1FD" />
          </>
        )}
        {type === 3 && (
          <>
            {/* Parents House */}
            <Line x1="38" y1="2" x2="38" y2="68" stroke={Colors.primary} strokeWidth="1.5" />
            <Line x1="75" y1="2" x2="75" y2="68" stroke={Colors.primary} strokeWidth="1.5" />
            <Line x1="38" y1="34" x2="75" y2="34" stroke={Colors.primary} strokeWidth="1.5" />
          </>
        )}
        {type === 4 && (
          <>
            {/* Studio Apartment */}
            <Line x1="55" y1="2" x2="55" y2="68" stroke={Colors.primary} strokeWidth="1.5" strokeDasharray="3 3" />
            <Rect x="14" y="15" width="28" height="22" rx="2" stroke={Colors.secondary} strokeWidth="1" fill="#E8F1FD" />
          </>
        )}
      </Svg>
    </View>
  );
};

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'home' | 'templates' | 'shared'>('home');

  const projects = [
    { id: '1', title: 'Dream Home', meta: '2B, 3 members', thumbnail: 1 },
    { id: '2', title: 'Vacation Villa', meta: '3B, 5 members', thumbnail: 2 },
    { id: '3', title: 'Parents House', meta: '2B, 2 members', thumbnail: 3 },
    { id: '4', title: 'Studio Apartment', meta: '1B, 1 member', thumbnail: 4 },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top App Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.iconButton}>
          <Menu size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>BlueprintLabs</Text>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>S</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Welcome Banner */}
        <View style={styles.welcomeRow}>
          <View>
            <Text style={styles.welcomeSubtitle}>Welcome back, Saketh</Text>
            <Text style={styles.sectionTitle}>My Projects</Text>
          </View>
          <TouchableOpacity
            style={styles.newProjectButton}
            activeOpacity={0.85}
            onPress={() => router.push('/create')}
          >
            <Plus size={16} color={Colors.white} />
            <Text style={styles.newProjectText}>New Project</Text>
          </TouchableOpacity>
        </View>

        {/* 2-Column Projects Grid (Matching Wireframe Screen 03) */}
        <View style={styles.projectsGrid}>
          {projects.map((project) => (
            <TouchableOpacity
              key={project.id}
              style={styles.projectCard}
              activeOpacity={0.88}
              onPress={() => router.push('/preview')}
            >
              <FloorPlanThumbnail type={project.thumbnail} />
              <View style={styles.projectInfoRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.projectTitle} numberOfLines={1}>
                    {project.title}
                  </Text>
                  <Text style={styles.projectMeta}>{project.meta}</Text>
                </View>
                <TouchableOpacity style={styles.cardMenuButton}>
                  <MoreVertical size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity Notification Card */}
        <View style={styles.recentActivityCard}>
          <View style={styles.activityIconCircle}>
            <Clock size={16} color={Colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.activityText}>
              <Text style={{ fontWeight: '700' }}>Ananya</Text> edited the kitchen in Dream Home
            </Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('home')}
        >
          <HomeIcon
            size={20}
            color={activeTab === 'home' ? Colors.primary : Colors.textMuted}
          />
          <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('templates')}
        >
          <LayoutGrid
            size={20}
            color={activeTab === 'templates' ? Colors.primary : Colors.textMuted}
          />
          <Text style={[styles.navText, activeTab === 'templates' && styles.navTextActive]}>
            Templates
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('shared')}
        >
          <Users
            size={20}
            color={activeTab === 'shared' ? Colors.primary : Colors.textMuted}
          />
          <Text style={[styles.navText, activeTab === 'shared' && styles.navTextActive]}>
            Shared
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconButton: {
    padding: 6,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondaryLight,
    borderWidth: 1.5,
    borderColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.secondary,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  welcomeSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  newProjectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
  },
  newProjectText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'space-between',
  },
  projectCard: {
    width: '47.5%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  thumbnailContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    marginBottom: 10,
  },
  projectInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  projectMeta: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  cardMenuButton: {
    padding: 2,
  },
  recentActivityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    marginTop: 24,
  },
  activityIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityText: {
    fontSize: 13,
    color: Colors.textPrimary,
    lineHeight: 18,
  },
  activityTime: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  navText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  navTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
