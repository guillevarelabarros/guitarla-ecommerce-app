import { useReducer, useEffect } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import Guitar from './components/Guitar';
import Header from './components/Header';
import { cartReducer, initialState } from './reducers/cart-reducer';

type AppProps = {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
};

function App({ toggleColorMode, mode }: AppProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <Header
        cart={state.cart}
        dispatch={dispatch}
        toggleColorMode={toggleColorMode}
        mode={mode}
      />

      <Container sx={{ mt: 5, px: { xs: 2, sm: 3, md: 4 } }}>
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
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          Our Collection
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
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
          backgroundColor: 'background.paper',
          mt: 5,
          py: { xs: 3, sm: 5 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Container>
          <Typography
            variant='body1'
            align='center'
            sx={{
              color: 'text.primary',
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            GuitarLA - All rights reserved
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default App;
