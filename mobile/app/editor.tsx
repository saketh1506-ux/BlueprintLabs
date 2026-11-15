import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  MousePointer,
  Square,
  Minus,
  DoorOpen,
  AppWindow,
  Armchair,
  Type,
  Undo2,
  Redo2,
  Plus,
} from 'lucide-react-native';
import Svg, { Rect, Line, Text as SvgText, Circle, G } from 'react-native-svg';
import { Colors } from '../src/theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function InteractiveEditorPage() {
  const router = useRouter();
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [zoomLevel, setZoomLevel] = useState<number>(220);
  const [selectedElement, setSelectedElement] = useState<string>('sofa');

  const tools = [
    { id: 'select', name: 'Select', icon: MousePointer },
    { id: 'room', name: 'Room', icon: Square },
    { id: 'wall', name: 'Wall', icon: Minus },
    { id: 'door', name: 'Door', icon: DoorOpen },
    { id: 'window', name: 'Window', icon: AppWindow },
    { id: 'furniture', name: 'Furniture', icon: Armchair },
    { id: 'text', name: 'Text', icon: Type },
  ];

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 20, 400));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 20, 100));

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.projectName}>My House</Text>
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.85}
          onPress={() => router.push('/dashboard')}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Collaborator Activity Pill (Matching Screen 08) */}
      <View style={styles.collaboratorPillContainer}>
        <View style={styles.collaboratorPill}>
          <View style={styles.collaboratorAvatar}>
            <Text style={styles.avatarLetter}>A</Text>
          </View>
          <Text style={styles.collaboratorText}>Ananya is editing...</Text>
        </View>
      </View>

      {/* Main Interactive Canvas Area with Left Tool Palette */}
      <View style={styles.canvasWorkspace}>
        {/* Left Vertical Tool Palette */}
        <View style={styles.verticalPalette}>
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = selectedTool === tool.id;
            return (
              <TouchableOpacity
                key={tool.id}
                style={[styles.toolButton, isActive && styles.toolButtonActive]}
                onPress={() => setSelectedTool(tool.id)}
              >
                <Icon
                  size={18}
                  color={isActive ? Colors.primary : Colors.textMuted}
                />
                <Text style={[styles.toolLabel, isActive && styles.toolLabelActive]}>
                  {tool.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 2D Architectural CAD Canvas Surface */}
        <View style={styles.cadCanvas}>
          <Svg width={SCREEN_WIDTH - 84} height={420} viewBox="0 0 300 420">
            {/* Architectural Grid Lines */}
            <Line x1="0" y1="100" x2="300" y2="100" stroke={Colors.blueprintGrid} strokeWidth="1" />
            <Line x1="0" y1="200" x2="300" y2="200" stroke={Colors.blueprintGrid} strokeWidth="1" />
            <Line x1="0" y1="300" x2="300" y2="300" stroke={Colors.blueprintGrid} strokeWidth="1" />
            <Line x1="100" y1="0" x2="100" y2="420" stroke={Colors.blueprintGrid} strokeWidth="1" />
            <Line x1="200" y1="0" x2="200" y2="420" stroke={Colors.blueprintGrid} strokeWidth="1" />

            {/* Bedroom 1 Boundary */}
            <Rect x="20" y="20" width="260" height="130" stroke={Colors.primary} strokeWidth="3" fill="#FFFFFF" />
            <SvgText x="110" y="55" fontSize="13" fontWeight="bold" fill={Colors.primary}>
              Bedroom 1
            </SvgText>

            {/* Living Room Area */}
            <Rect x="20" y="160" width="260" height="240" stroke={Colors.primary} strokeWidth="3" fill="#FFFFFF" />
            <SvgText x="195" y="195" fontSize="13" fontWeight="bold" fill={Colors.primary}>
              Living Room
            </SvgText>

            {/* Selected Element: Sofa with Resize Handles & Dimension Pill */}
            <G onPress={() => setSelectedElement('sofa')}>
              {/* Sofa Object */}
              <Rect
                x="50"
                y="220"
                width="160"
                height="65"
                rx="4"
                stroke={Colors.primary}
                strokeWidth="2"
                fill="#E8F1FD"
              />
              <Rect x="54" y="224" width="152" height="18" rx="2" fill="#C7DDFC" />

              {/* Selection Bounding Box & Corner Handles */}
              <Rect
                x="45"
                y="215"
                width="170"
                height="75"
                stroke={Colors.secondary}
                strokeWidth="1.5"
                strokeDasharray="4 3"
                fill="none"
              />
              <Circle cx="45" cy="215" r="4" fill={Colors.secondary} />
              <Circle cx="215" cy="215" r="4" fill={Colors.secondary} />
              <Circle cx="45" cy="290" r="4" fill={Colors.secondary} />
              <Circle cx="215" cy="290" r="4" fill={Colors.secondary} />

              {/* Contextual Dimension Badge */}
              <Rect x="100" y="200" width="60" height="18" rx="4" fill={Colors.primary} />
              <SvgText x="112" y="213" fontSize="9" fontWeight="bold" fill={Colors.white}>
                Sofa 7' × 3'
              </SvgText>
            </G>

            {/* Kitchen Area Divider & Counter */}
            <Line x1="20" y1="330" x2="280" y2="330" stroke={Colors.primary} strokeWidth="2.5" strokeDasharray="6 3" />
            <SvgText x="125" y="360" fontSize="12" fontWeight="bold" fill={Colors.primary}>
              Kitchen
            </SvgText>
            <Rect x="80" y="380" width="90" height="28" rx="3" stroke={Colors.primary} strokeWidth="1.5" fill="#E8F1FD" />
            <Circle cx="105" cy="394" r="5" fill={Colors.primary} />
            <Circle cx="145" cy="394" r="5" fill={Colors.primary} />
          </Svg>
        </View>
      </View>

      {/* Floating Bottom Control Bar: Undo, Redo, Zoom %, Zoom +/- */}
      <View style={styles.bottomControlBar}>
        <TouchableOpacity style={styles.controlIconBtn}>
          <Undo2 size={18} color={Colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlIconBtn}>
          <Redo2 size={18} color={Colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.zoomDivider} />

        <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomOut}>
          <Minus size={14} color={Colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.zoomText}>{zoomLevel}%</Text>

        <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomIn}>
          <Plus size={14} color={Colors.textPrimary} />
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 6,
  },
  projectName: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 8,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  collaboratorPillContainer: {
    alignItems: 'center',
    marginVertical: 6,
  },
  collaboratorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  collaboratorAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.secondary,
  },
  collaboratorText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  canvasWorkspace: {
    flex: 1,
    flexDirection: 'row',
  },
  verticalPalette: {
    width: 64,
    backgroundColor: Colors.white,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  toolButton: {
    width: 50,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  toolButtonActive: {
    backgroundColor: Colors.secondaryLight,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  toolLabel: {
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  toolLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  cadCanvas: {
    flex: 1,
    backgroundColor: '#FAFBFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomControlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 14,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  controlIconBtn: {
    padding: 4,
  },
  zoomDivider: {
    width: 1,
    height: 18,
    backgroundColor: Colors.border,
  },
  zoomBtn: {
    padding: 4,
  },
  zoomText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
    minWidth: 40,
    textAlign: 'center',
  },
});
