import React from 'react';
import Svg, { Rect, Path, Line, Circle } from 'react-native-svg';
import { Colors } from '../theme/colors';

export const BlueprintHouseIllustration: React.FC<{ width?: number; height?: number }> = ({
  width = 240,
  height = 140,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 140" fill="none">
      {/* Background blueprint grid cues */}
      <Line x1="10" y1="120" x2="230" y2="120" stroke={Colors.border} strokeWidth="1" strokeDasharray="4 4" />
      <Line x1="20" y1="10" x2="20" y2="130" stroke={Colors.border} strokeWidth="1" strokeDasharray="4 4" />
      <Line x1="220" y1="10" x2="220" y2="130" stroke={Colors.border} strokeWidth="1" strokeDasharray="4 4" />

      {/* Main House Outline */}
      <Path
        d="M60 120 V65 L110 30 L160 65 V120 H60 Z"
        stroke={Colors.primary}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Roof Gable Lines */}
      <Path
        d="M50 72 L110 24 L170 72"
        stroke={Colors.primary}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Chimney */}
      <Path
        d="M138 48 V34 H150 V57"
        stroke={Colors.primary}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Window */}
      <Rect
        x="78"
        y="75"
        width="24"
        height="24"
        stroke={Colors.primary}
        strokeWidth="2"
        fill={Colors.secondaryLight}
      />
      <Line x1="90" y1="75" x2="90" y2="99" stroke={Colors.primary} strokeWidth="1.5" />
      <Line x1="78" y1="87" x2="102" y2="87" stroke={Colors.primary} strokeWidth="1.5" />

      {/* Door */}
      <Rect
        x="122"
        y="78"
        width="22"
        height="42"
        stroke={Colors.primary}
        strokeWidth="2"
        fill={Colors.surface}
      />
      <Circle cx="138" cy="100" r="1.8" fill={Colors.primary} />

      {/* Adjacent Side Wing / Garage */}
      <Path
        d="M160 80 H195 V120 H160"
        stroke={Colors.primary}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Line x1="172" y1="92" x2="188" y2="92" stroke={Colors.primary} strokeWidth="1.5" />
      <Line x1="172" y1="102" x2="188" y2="102" stroke={Colors.primary} strokeWidth="1.5" />

      {/* Side Tree Left */}
      <Circle cx="38" cy="98" r="14" stroke={Colors.primary} strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
      <Line x1="38" y1="112" x2="38" y2="120" stroke={Colors.primary} strokeWidth="2" />

      {/* Side Tree Right */}
      <Circle cx="210" cy="95" r="12" stroke={Colors.primary} strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
      <Line x1="210" y1="107" x2="210" y2="120" stroke={Colors.primary} strokeWidth="2" />
    </Svg>
  );
};
