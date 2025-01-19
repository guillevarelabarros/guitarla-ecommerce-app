import { Dispatch } from 'react';
import { Button, Box, Typography } from '@mui/material';
import type { Guitar } from '../types';
import type { CartActions } from '../reducers/cart-reducer';

type GuitarProps = {
  guitar: Guitar;
  dispatch: Dispatch<CartActions>;
};

export default function Guitar({ guitar, dispatch }: GuitarProps) {
  const { name, image, description, price } = guitar;

  return (
    <Box display='flex' alignItems='center' gap={2}>
      <Box flex='0 0 auto' sx={{ maxWidth: '100px' }}>
        <img
          style={{ width: '100%' }}
          src={`/img/${image}.jpg`}
          alt={`Imagen de la guitarra ${name}`}
        />
      </Box>

      <Box flex='1'>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 900,
            textTransform: 'uppercase',
            color: '#000',
          }}
        >
          {name}
        </Typography>

        <Typography variant='body2' sx={{ mb: 1 }}>
          {description}
        </Typography>

        <Typography
          variant='h5'
          sx={{
            fontWeight: 900,
            color: '#e99401',
            mb: 1,
          }}
        >
          ${price}
        </Typography>

        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={() =>
            dispatch({ type: 'add-to-cart', payload: { item: guitar } })
          }
        >
          Agregar al Carrito
        </Button>
      </Box>
    </Box>
  );
}
