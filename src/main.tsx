// src/main.tsx
import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Importaciones de MUI
import { ThemeProvider, CssBaseline } from '@mui/material';
import { PaletteMode } from '@mui/material';

// Importamos la función para crear el tema
import { getTheme } from './theme';

function Main() {
  // 1) Revisamos si existe alguna preferencia almacenada en localStorage
  const storedMode = localStorage.getItem('themeMode') as PaletteMode | null;

  // 2) Definimos el estado para el modo, usando la preferencia o 'light' por defecto
  const [mode, setMode] = useState<PaletteMode>(storedMode || 'light');

  // 3) Creamos el tema con un useMemo para no recalcular en cada render
  const theme = useMemo(() => getTheme(mode), [mode]);

  // 4) Función para cambiar el modo (light/dark)
  const toggleColorMode = () => {
    setMode(prev => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        {/* CssBaseline aplica ajustes globales acorde al modo */}
        <CssBaseline />
        {/* Pasamos la función y el modo al App para que desde ahí lo usemos */}
        <App toggleColorMode={toggleColorMode} mode={mode} />
      </ThemeProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
