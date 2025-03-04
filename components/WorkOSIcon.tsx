import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useColorScheme } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

export function WorkOSIcon(props: {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const { size = 24, color, style } = props;
  const colorScheme = useColorScheme();
  const iconColor = color || (colorScheme === 'dark' ? '#fff' : '#000');

  return (
    <Svg 
      width={size} 
      height={size * (210/242)} 
      viewBox="0 0 242 210" 
      fill="none"
      style={style}
    >
      <Path
        d="M1 105C1 109.56 2.2 114.12 4.52 118.04L46.5999 190.92C50.9199 198.36 57.4799 204.44 65.6399 207.16C81.7199 212.52 98.3599 205.64 106.28 191.88L116.44 174.28L76.3599 105L118.68 31.6404L128.84 14.0405C131.88 8.76048 135.96 4.44048 140.76 1.00049H136.36H75.4799C64.0399 1.00049 53.4799 7.08048 47.7999 17.0005L4.52 91.9604C2.2 95.8804 1 100.44 1 105Z"
        fill={iconColor}
      />
      <Path
        d="M241 105C241 100.44 239.8 95.8796 237.48 91.9596L194.84 18.1197C186.92 4.43972 170.28 -2.44028 154.2 2.83972C146.04 5.55971 139.48 11.6397 135.16 19.0797L125.56 35.6397L165.64 105L123.32 178.359L113.16 195.959C110.12 201.159 106.04 205.559 101.24 208.999H105.64H166.52C177.96 208.999 188.52 202.919 194.2 192.999L237.48 118.04C239.8 114.12 241 109.56 241 105Z"
        fill={iconColor}
      />
    </Svg>
  );
} 