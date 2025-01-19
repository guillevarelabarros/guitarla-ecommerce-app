// src/theme.ts
import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#e99401', // Color principal
      },
      secondary: {
        main: '#f50057', // Color secundario
      },
    },
    typography: {
      fontFamily: ['Outfit', 'sans-serif'].join(','),
    },
  });
};
