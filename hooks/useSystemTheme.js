import useTheme from 'react-use-system-theme';

export function useSystemTheme() {
  const theme = useTheme();
  return theme;
}