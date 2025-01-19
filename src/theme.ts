// src/theme.ts
import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#e99401', // Color principal (puedes cambiarlo)
      },
      secondary: {
        main: '#f50057', // Color secundario (puedes cambiarlo)
      },
      // Puedes agregar más colores: error, warning, info, etc.
    },
    typography: {
      fontFamily: ['Outfit', 'sans-serif'].join(','), // Tu fuente preferida
    },
  });
};
