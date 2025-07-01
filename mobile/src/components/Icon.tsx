import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({ 
  icon, 
  color = '#000', 
  size = 24, 
  strokeWidth = 2 
}) => {
  const Icon = icon;
  
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {Icon({}).props.children}
      </Svg>
    </View>
  );
};