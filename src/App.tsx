// src/App.tsx
import { useReducer, useEffect } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import Guitar from './components/Guitar';
import Header from './components/Header';
import { cartReducer, initialState } from './reducers/cart-reducer';

// Tipado de las props que vienen de main.tsx
type AppProps = {
  toggleColorMode: () => void;
  mode: 'light' | 'dark'; // PaletteMode
};

function App({ toggleColorMode, mode }: AppProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      {/* Pasamos toggleColorMode y mode al Header para que haya un botón de cambio */}
      <Header
        cart={state.cart}
        dispatch={dispatch}
        toggleColorMode={toggleColorMode}
        mode={mode}
      />

      <Container sx={{ mt: 5 }}>
        <Typography
          variant='h3'
          align='center'
          gutterBottom
          sx={{
            fontWeight: 900,
            background: 'linear-gradient(45deg, #e99401, #f50057)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            mb: 4,
          }}
        >
          Nuestra Colección
        </Typography>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {state.data.map(guitar => (
            <Grid item xs={12} sm={6} md={4} key={guitar.id}>
              <Guitar guitar={guitar} dispatch={dispatch} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        component='footer'
        sx={{
          // En vez de color fijo, usamos la paleta del theme:
          backgroundColor: 'background.paper',
          mt: 5,
          py: 5,
        }}
      >
        <Container>
          <Typography
            variant='body1'
            align='center'
            sx={{ color: 'text.primary', fontSize: '1.25rem', mt: 2 }}
          >
            GuitarLA - Todos los derechos Reservados
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default App;
