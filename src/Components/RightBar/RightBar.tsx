import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Publicity } from '../../Types/Types';

interface RightBarProps {
  images: Publicity[];
}

export const RightBar = ({ images }: RightBarProps) => {
  const navigate = useNavigate();

  const goToLink = (link: string) => {
    navigate(link);
  };

  return (
    <>
      {images.map((image, index) => (
        <Card key={image.codigo} sx={{ 
          marginBottom: 2, 
          borderRadius: 1, // Keeps cards square
          boxShadow: '5px 5px 15px rgba(0,0,0,0.3)', // Adds 3D shadow effect
          width: { xs: 150, sm: 250 }, // 125px on xs and 250px on sm and above
          height: { xs: 150, sm: 250 }, // 125px on xs and 250px on sm and above
          marginRight: 2, // Adds space between cards
        }}>
          <Link to={image.urlPublicidad} target='_blank' style={{ textDecoration: 'none' }}>
            {index === 0 ? (
              <CardContent sx={{ paddingBottom: 0, textAlign: 'center' }}>
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: { xs: '13px', sm: '15px', md: '25px' }
                  }}
                >
                  PRESE
                  <span
                    style={{
                      borderBottomWidth: 3,
                      borderBottomColor: '#3EDB84',
                      borderBottomStyle: 'solid'
                    }}
                  >
                    NT
                  </span>
                  AMOS
                </Typography>
              </CardContent>
            ) : null}
            <CardMedia
              component='img'
              sx={{
                width: { xs: 150, sm: 250 }, // 125px on xs and 250px on sm and above
                height: { xs: 90, sm: 200 }, // 125px on xs and 250px on sm and above
                objectFit: 'fill' // Ensures image covers the area completely
              }}
              image={image.urlPromocional}
              alt={image.descripcion}
            />
            {index !== 0 && (
              <CardContent>
                <Typography variant='body1' color='text.secondary' sx={{fontSize:'10px', color:'black'}}>
                  {image.descripcion}
                </Typography>
              </CardContent>
            )}
          </Link>
        </Card>
      ))}
    </>
  );
};
