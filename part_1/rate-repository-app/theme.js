import { Platform } from 'react-native';

const theme = {
  colors: {
    appBarBackground: '#24292e',
    appBarText: 'white',
    separator: '#e1e4e8',
    primary: '#0366d6',
    textPrimary: '#24292e',
    textSecondary: '#586069',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  spacing: {
    small: 10,
    medium: 15,
  },
};

export default theme;
