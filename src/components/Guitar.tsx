import { Dispatch } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material';
import type { Guitar } from '../types';
import type { CartActions } from '../reducers/cart-reducer';

type GuitarProps = {
  guitar: Guitar;
  dispatch: Dispatch<CartActions>;
};

export default function Guitar({ guitar, dispatch }: GuitarProps) {
  const { name, image, description, price } = guitar;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: 2,
        p: 2,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 6,
        },
        height: '100%',
      }}
      elevation={3}
    >
      <CardMedia
        component='img'
        image={`/img/${image}.jpg`}
        alt={`Image of the guitar ${name}`}
        sx={{
          width: { xs: '100%', sm: 150 },
          height: 'auto',
          objectFit: 'cover',
          borderRadius: 2,
        }}
      />

      <Box
        flex={1}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <CardContent sx={{ p: 0, mb: 2 }}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 900,
              textTransform: 'uppercase',
              color: 'text.primary',
              mb: 1,
            }}
          >
            {name}
          </Typography>

          <Typography variant='body2' sx={{ mb: 1, color: 'text.secondary' }}>
            {description}
          </Typography>

          <Typography
            variant='h5'
            sx={{ fontWeight: 900, color: 'primary.main', mb: 1 }}
          >
            ${price}
          </Typography>
        </CardContent>

        <CardActions sx={{ p: 0 }}>
          <Button
            variant='contained'
            color='primary'
            onClick={() =>
              dispatch({ type: 'add-to-cart', payload: { item: guitar } })
            }
          >
            Add to Cart
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
