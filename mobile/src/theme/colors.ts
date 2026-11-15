// BlueprintLabs Theme Tokens based on Figma Wireframe
export const Colors = {
  primary: '#1E2A4A',       // Deep Blueprint Navy
  primaryLight: '#2D3D66',  // Lighter Navy
  secondary: '#3B82F6',     // Accent Sky/Blue
  secondaryLight: '#E8F1FD',// Light Blue tint / Chip background
  background: '#FFFFFF',    // Screen Canvas Background
  surface: '#F8FAFC',       // Card / Section background
  border: '#E2E8F0',        // Subtle Gray Border
  borderFocus: '#1E2A4A',   // Focused Input Border
  textPrimary: '#0F172A',   // Dark Slate Headings
  textSecondary: '#64748B', // Cool Muted Text
  textMuted: '#94A3B8',     // Placeholder Gray
  danger: '#EF4444',        // Red
  success: '#10B981',       // Green
  white: '#FFFFFF',
  blueprintGrid: '#EBF3FA', // Subtle blueprint grid lines
};

export const Typography = {
  h1: { fontSize: 24, fontWeight: '700' as const, color: Colors.textPrimary },
  h2: { fontSize: 20, fontWeight: '700' as const, color: Colors.textPrimary },
  h3: { fontSize: 16, fontWeight: '600' as const, color: Colors.textPrimary },
  body: { fontSize: 14, fontWeight: '400' as const, color: Colors.textSecondary },
  caption: { fontSize: 12, fontWeight: '400' as const, color: Colors.textMuted },
  button: { fontSize: 15, fontWeight: '600' as const, color: Colors.white },
};
