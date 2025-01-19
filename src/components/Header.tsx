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
} from '@mui/material';
import type { CartItem } from '../types';
import type { CartActions } from '../reducers/cart-reducer';

type HeaderProps = {
  cart: CartItem[];
  dispatch: Dispatch<CartActions>;
  toggleColorMode: () => void; // para alternar modo
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
                alt='imagen logo'
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
            {/* Botón para alternar modo claro/oscuro */}
            <Button variant='outlined' onClick={toggleColorMode} sx={{ mr: 2 }}>
              {mode === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
            </Button>

            {/* Carrito */}
            <Box className='carrito'>
              <img
                style={{ maxWidth: '100%' }}
                src='/img/carrito.png'
                alt='imagen carrito'
              />
              <Box id='carrito'>
                {isEmpty ? (
                  <Typography align='center'>El carrito está vacío</Typography>
                ) : (
                  <>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Imagen</TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Precio</TableCell>
                          <TableCell>Cantidad</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cart.map(guitar => (
                          <TableRow key={guitar.id}>
                            <TableCell>
                              <img
                                style={{ width: '50px' }}
                                src={`/img/${guitar.image}.jpg`}
                                alt={`Imagen de ${guitar.name}`}
                              />
                            </TableCell>
                            <TableCell>{guitar.name}</TableCell>
                            <TableCell>
                              <strong>${guitar.price}</strong>
                            </TableCell>
                            <TableCell>
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
                    <Typography align='right' sx={{ mt: 1 }}>
                      Total a pagar: <strong>${cartTotal}</strong>
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
                  Vaciar Carrito
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
