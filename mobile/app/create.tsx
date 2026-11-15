import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Mic,
  LayoutGrid,
  PenTool,
  ChevronRight,
  Users,
} from 'lucide-react-native';
import { Colors } from '../src/theme/colors';

export default function CreateProjectPage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState('My House');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create New Project</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Project Name Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Project Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={projectName}
              onChangeText={setProjectName}
              placeholder="e.g. My House, Vacation Villa"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
        </View>

        {/* Section Heading */}
        <View style={styles.methodHeaderSection}>
          <Text style={styles.sectionHeading}>Choose How to Start</Text>
          <Text style={styles.sectionSubheading}>You can switch methods at any time</Text>
        </View>

        {/* Option 1: Describe with Voice */}
        <TouchableOpacity
          style={styles.optionCard}
          activeOpacity={0.85}
          onPress={() => router.push('/voice')}
        >
          <View style={styles.optionIconCircle}>
            <Mic size={22} color={Colors.primary} />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Describe with Voice</Text>
            <Text style={styles.optionDescription}>
              Speak your vision and AI will draw the floor plan.
            </Text>
          </View>
          <ChevronRight size={20} color={Colors.textMuted} />
        </TouchableOpacity>

        {/* Option 2: Start from Template */}
        <TouchableOpacity
          style={styles.optionCard}
          activeOpacity={0.85}
          onPress={() => router.push('/preview')}
        >
          <View style={styles.optionIconCircle}>
            <LayoutGrid size={22} color={Colors.primary} />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Start from Template</Text>
            <Text style={styles.optionDescription}>
              Pick a ready-made 1, 2 or 3 BHK layout.
            </Text>
          </View>
          <ChevronRight size={20} color={Colors.textMuted} />
        </TouchableOpacity>

        {/* Option 3: Create from Scratch */}
        <TouchableOpacity
          style={styles.optionCard}
          activeOpacity={0.85}
          onPress={() => router.push('/editor')}
        >
          <View style={styles.optionIconCircle}>
            <PenTool size={22} color={Colors.primary} />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Create from Scratch</Text>
            <Text style={styles.optionDescription}>
              Draw walls, rooms and blocks yourself.
            </Text>
          </View>
          <ChevronRight size={20} color={Colors.textMuted} />
        </TouchableOpacity>

        {/* Collaboration Footer Banner */}
        <View style={styles.footerNoteCard}>
          <Users size={18} color={Colors.secondary} />
          <Text style={styles.footerNoteText}>
            Invite family and friends to collaborate once your plan is ready.
          </Text>
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
    paddingHorizontal: 22,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    marginBottom: 10,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  section: {
    marginVertical: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
  },
  input: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  methodHeaderSection: {
    marginTop: 20,
    marginBottom: 14,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  sectionSubheading: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  optionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  optionDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  footerNoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.secondaryLight,
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
  },
  footerNoteText: {
    fontSize: 12,
    color: Colors.primary,
    flex: 1,
    lineHeight: 17,
    fontWeight: '500',
  },
});
