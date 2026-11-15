import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Circle } from 'lucide-react-native';
import { Colors } from '../src/theme/colors';
import { BlueprintLabsBrandHeader } from '../src/components/BlueprintLabsBrandHeader';
import { BlueprintHouseIllustration } from '../src/components/BlueprintHouseIllustration';

export default function ProcessingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(65);

  const steps = [
    { id: 1, label: 'Understanding your requirements', status: 'completed' },
    { id: 2, label: 'Placing rooms', status: 'completed' },
    { id: 3, label: 'Generating floor plan', status: 'in_progress' },
    { id: 4, label: 'Adding furniture', status: 'pending' },
    { id: 5, label: 'Finalizing design', status: 'pending' },
  ];

  // Simulated generation progress towards Screen 07
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
      router.replace('/preview');
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Brand Header */}
        <BlueprintLabsBrandHeader />

        {/* Blueprint House Animated Illustration */}
        <View style={styles.illustrationWrapper}>
          <BlueprintHouseIllustration width={220} height={130} />
        </View>

        {/* Progress Bar & Percentage */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Generating floor plan...</Text>
            <Text style={styles.progressPercentage}>{progress}%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* Step-by-Step Generation Checklist (Matching Screen 06) */}
        <View style={styles.stepsCard}>
          {steps.map((step) => {
            return (
              <View key={step.id} style={styles.stepRow}>
                {step.status === 'completed' && (
                  <View style={styles.stepCircleCompleted}>
                    <Check size={12} color={Colors.white} strokeWidth={3} />
                  </View>
                )}
                {step.status === 'in_progress' && (
                  <View style={styles.stepCircleActive}>
                    <View style={styles.stepInnerDot} />
                  </View>
                )}
                {step.status === 'pending' && (
                  <View style={styles.stepCirclePending} />
                )}
                <Text
                  style={[
                    styles.stepLabel,
                    step.status === 'completed' && styles.stepLabelCompleted,
                    step.status === 'in_progress' && styles.stepLabelActive,
                  ]}
                >
                  {step.label}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Footnote */}
        <Text style={styles.footnote}>This may take a few seconds...</Text>

        {/* Cancel Button */}
        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.85}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  illustrationWrapper: {
    marginVertical: 14,
    alignItems: 'center',
  },
  progressSection: {
    width: '100%',
    marginVertical: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.secondary,
  },
  progressBarTrack: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  stepsCard: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    padding: 18,
    gap: 16,
    marginVertical: 10,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepCircleCompleted: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  stepCirclePending: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  stepLabel: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  stepLabelCompleted: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  stepLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  footnote: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 6,
    marginBottom: 14,
  },
  cancelButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});
