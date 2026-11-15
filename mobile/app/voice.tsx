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
import { ArrowLeft, Mic, Sparkles, Square } from 'lucide-react-native';
import Svg, { Rect } from 'react-native-svg';
import { Colors } from '../src/theme/colors';

// Animated Audio Waveform Simulation
const AudioWaveform: React.FC = () => {
  return (
    <View style={styles.waveRow}>
      <Svg width={60} height={40} viewBox="0 0 60 40">
        <Rect x="4" y="14" width="4" height="12" rx="2" fill={Colors.secondary} />
        <Rect x="14" y="6" width="4" height="28" rx="2" fill={Colors.secondary} />
        <Rect x="24" y="10" width="4" height="20" rx="2" fill={Colors.secondary} />
        <Rect x="34" y="2" width="4" height="36" rx="2" fill={Colors.secondary} />
        <Rect x="44" y="12" width="4" height="16" rx="2" fill={Colors.secondary} />
        <Rect x="54" y="16" width="4" height="8" rx="2" fill={Colors.secondary} />
      </Svg>
    </View>
  );
};

export default function VoiceInputPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(24);
  const [isRecording, setIsRecording] = useState(true);

  // Timer counter simulation
  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `00:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleStop = () => {
    setIsRecording(false);
    // Move to Screen 06 (Processing)
    router.replace('/processing');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Describe Your Dream Home</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Recording Timer Badge */}
        <View style={styles.timerBadge}>
          <View style={styles.recordingDot} />
          <Text style={styles.timerText}>Recording {formatTimer(seconds)}</Text>
        </View>

        {/* Central Audio Visualizer Circle */}
        <View style={styles.visualizerContainer}>
          <AudioWaveform />
          <View style={styles.micCircle}>
            <Mic size={36} color={Colors.white} />
          </View>
          <AudioWaveform />
        </View>

        {/* Listening State Label */}
        <View style={styles.labelSection}>
          <Text style={styles.listeningHeading}>Listening...</Text>
          <Text style={styles.listeningSubtitle}>
            Speak out your entire room and floor plan, and we'll take care of the rest.
          </Text>
        </View>

        {/* Live Transcript Card */}
        <View style={styles.transcriptCard}>
          <View style={styles.transcriptHeader}>
            <Sparkles size={16} color={Colors.secondary} />
            <Text style={styles.transcriptTag}>LIVE TRANSCRIPT</Text>
          </View>
          <Text style={styles.transcriptText}>
            "I want a two-bedroom house with an attached bathroom, a living room that opens onto the balcony, and an open kitchen with a dining table..."
          </Text>
        </View>

        {/* Controls Section */}
        <View style={styles.controlsSection}>
          <TouchableOpacity
            style={styles.stopButton}
            activeOpacity={0.85}
            onPress={handleStop}
          >
            <Square size={16} color={Colors.white} fill={Colors.white} />
            <Text style={styles.stopButtonText}>Stop</Text>
          </TouchableOpacity>
          <Text style={styles.stopHelperText}>Tap stop when you have finished describing.</Text>
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
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 14,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger,
  },
  timerText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.danger,
  },
  visualizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 28,
  },
  waveRow: {
    opacity: 0.8,
  },
  micCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  labelSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  listeningHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  listeningSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  transcriptCard: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  transcriptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  transcriptTag: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.secondary,
    letterSpacing: 0.5,
  },
  transcriptText: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  controlsSection: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
  },
  stopButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  stopHelperText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});
