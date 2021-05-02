import { Platform } from 'react-native';

export const theme = {
  colors: {
    textPrimary: '#EFEFEF',
    textSecondary: '#ccc',
    primary: '#cc2949',
    secondary: '#0CBEBD',
    MainBackground: '#1b1b1b',
    background: '#333333',
    danger: '#eb445a',
    warning: '#ffc409',
    success: '#2dd36f',
  },
  padding: {
    s: 5,
    m: 10,
    ml: 15,
    l: 20,
  },
  margin: {
    s: 5,
    m: 10,
    ml: 15,
    l: 20,
  },
  borderRadius: {
    s: 5,
    m: 10,
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 18,
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
};

export default theme;
