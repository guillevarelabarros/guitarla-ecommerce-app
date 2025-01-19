import { useReducer, useEffect } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import Guitar from './components/Guitar';
import Header from './components/Header';
import { cartReducer, initialState } from './reducers/cart-reducer';

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <Header cart={state.cart} dispatch={dispatch} />

      {/* Contenedor principal */}
      <Container sx={{ mt: 5 }}>
        <Typography
          variant='h4'
          align='center'
          gutterBottom
          sx={{ fontWeight: 900 }}
        >
          Nuestra Colección
        </Typography>

        {/* Grid para las guitarras */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {state.data.map(guitar => (
            <Grid item xs={12} sm={6} md={4} key={guitar.id}>
              <Guitar guitar={guitar} dispatch={dispatch} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component='footer'
        sx={{
          backgroundColor: '#262626',
          mt: 5,
          py: 5,
        }}
      >
        <Container>
          <Typography
            variant='body1'
            align='center'
            sx={{ color: '#fff', fontSize: '1.25rem', mt: 2 }}
          >
            GuitarLA - Todos los derechos Reservados
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default App;
