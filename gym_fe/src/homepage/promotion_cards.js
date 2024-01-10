
import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

const Item = styled(Card)(({ theme }) => ({
  background: 'white',
  maxWidth: 200,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Promotion_cards({ homepagecards }) {  // homepagecards prop'ını alın
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {homepagecards.map((card) => (
          <Grid item xs={2} sm={4} md={4} key={card.homePageCardId}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={card.homePageCardImage}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {card.homePageCardContent}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Promotion_cards;
