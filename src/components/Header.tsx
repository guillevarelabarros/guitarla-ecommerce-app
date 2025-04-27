// src/components/Header.tsx
import { useMemo, Dispatch } from 'react';
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Button,
  Container,
  IconButton,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import type { CartItem } from '../types';
import type { CartActions } from '../reducers/cart-reducer';

type HeaderProps = {
  cart: CartItem[];
  dispatch: Dispatch<CartActions>;
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
};

export default function Header({
  cart,
  dispatch,
  toggleColorMode,
  mode,
}: HeaderProps) {
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return (
    <Box component='header' className='header' sx={{ py: 5 }}>
      <Container>
        <Grid
          container
          alignItems='flex-start'
          justifyContent={{ xs: 'center', md: 'space-between' }}
        >
          <Grid item xs={8} md={3}>
            <a href='index.html'>
              <img
                style={{ maxWidth: '100%' }}
                src='/img/logo.svg'
                alt='logo image'
              />
            </a>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            display='flex'
            alignItems='center'
            justifyContent='flex-end'
            sx={{ mt: { xs: 3, md: 0 } }}
          >
            <IconButton
              onClick={toggleColorMode}
              sx={{
                mr: 2,
                backgroundColor:
                  mode === 'light' ? '#fff' : 'rgba(255,255,255,0.1)',
                p: 1,
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor:
                    mode === 'light' ? '#f0f0f0' : 'rgba(255,255,255,0.2)',
                },
              }}
            >
              {mode === 'light' ? (
                <DarkModeIcon sx={{ fontSize: 28, color: '#000' }} />
              ) : (
                <LightModeIcon sx={{ fontSize: 28, color: '#fff' }} />
              )}
            </IconButton>

            <Box className='carrito'>
              <img
                style={{ maxWidth: '100%' }}
                src='/img/carrito.png'
                alt='cart image'
              />
              <Box id='carrito'>
                {isEmpty ? (
                  <Typography align='center' sx={{ color: 'black' }}>
                    The cart is empty
                  </Typography>
                ) : (
                  <>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: 'black' }}>Image</TableCell>
                          <TableCell sx={{ color: 'black' }}>Name</TableCell>
                          <TableCell sx={{ color: 'black' }}>Price</TableCell>
                          <TableCell sx={{ color: 'black' }}>
                            Quantity
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cart.map(guitar => (
                          <TableRow key={guitar.id}>
                            <TableCell sx={{ color: 'black' }}>
                              <img
                                style={{ width: '50px' }}
                                src={`/img/${guitar.image}.jpg`}
                                alt={`Image of ${guitar.name}`}
                              />
                            </TableCell>
                            <TableCell sx={{ color: 'black' }}>
                              {guitar.name}
                            </TableCell>
                            <TableCell sx={{ color: 'black' }}>
                              <strong>${guitar.price}</strong>
                            </TableCell>
                            <TableCell sx={{ color: 'black' }}>
                              <Box display='flex' alignItems='center' gap={1}>
                                <Button
                                  variant='contained'
                                  color='inherit'
                                  onClick={() =>
                                    dispatch({
                                      type: 'decrease-quantity',
                                      payload: { id: guitar.id },
                                    })
                                  }
                                  sx={{
                                    backgroundColor:
                                      mode === 'dark' ? '#424242' : undefined,
                                    color: mode === 'dark' ? '#fff' : undefined,
                                    '&:hover': {
                                      backgroundColor:
                                        mode === 'dark' ? '#616161' : undefined,
                                    },
                                  }}
                                >
                                  -
                                </Button>
                                {guitar.quantity}
                                <Button
                                  variant='contained'
                                  color='inherit'
                                  onClick={() =>
                                    dispatch({
                                      type: 'increase-quantity',
                                      payload: { id: guitar.id },
                                    })
                                  }
                                  sx={{
                                    backgroundColor:
                                      mode === 'dark' ? '#424242' : undefined,
                                    color: mode === 'dark' ? '#fff' : undefined,
                                    '&:hover': {
                                      backgroundColor:
                                        mode === 'dark' ? '#616161' : undefined,
                                    },
                                  }}
                                >
                                  +
                                </Button>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant='contained'
                                color='error'
                                onClick={() =>
                                  dispatch({
                                    type: 'remove-from-cart',
                                    payload: { id: guitar.id },
                                  })
                                }
                              >
                                X
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Typography align='right' sx={{ mt: 1, color: 'black' }}>
                      Total: <strong>${cartTotal}</strong>
                    </Typography>
                  </>
                )}
                <Button
                  variant='contained'
                  color='secondary'
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => dispatch({ type: 'clear-cart' })}
                >
                  Clear Cart
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
