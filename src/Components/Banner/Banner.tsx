import {Event} from '@mui/icons-material';
import {Button, Grid} from '@mui/material';
import {useRef} from 'react';
import ImageGallery, {ReactImageGalleryItem} from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import {useNavigate} from 'react-router-dom';
import {CarouselEvent, ResumeEvent} from '../../Types/Types';
// import Slider from 'react-slick';}
import React from 'react';

const ItemBanner = (item: ReactImageGalleryItem) => {
  return (
    <Grid
      style={{ height: '70%', width: '100%', maxHeight: '700px' }} // Ajusta la altura y el ancho máximo del contenedor
      sx={{
        display: 'flex',
        backgroundColor: 'black'
      }}
    >
      <img
        src={item.original}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }} // Ajusta cómo se muestra la imagen dentro del contenedor
        alt={item.originalAlt}
      />
    </Grid>
  );
};



const transfromEvents = (events: CarouselEvent[]) => {
  return events.map((event: CarouselEvent) => {
    const item: ReactImageGalleryItem = {
      original: event.urlImagen,
      // originalHeight: 400,
      renderItem: (item) => <ItemBanner {...item} />
    };
    return item;
  });
};

interface BannerProps {
  events: CarouselEvent[];
}

export const Banner = ({events}: BannerProps) => {
  const navigate = useNavigate();
  const ref = useRef<ImageGallery>(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const items = transfromEvents(events);

  const onNavigate = (event: ResumeEvent) => {
    navigate(`/reserva/${event.nombre}/${event.artista}/${event.codigo}`);
  };

  return (
    <ImageGallery
      ref={ref}
      items={items}
      showNav={false}
      showPlayButton={false}
      showBullets
      showFullscreenButton={false}
      showThumbnails={false}
      autoPlay
      slideInterval={3000}
      additionalClass='transform-none'
      useTranslate3D={false}
      stopPropagation={false}
      onMouseOver={(event) => {
        // console.log('event ', event.currentTarget.ariaLabel);
      }}
      renderCustomControls={() => {
        return (
          <Button
            style={{
              position: 'absolute',
              borderColor: 'white',
              color: 'white',
              borderWidth: 2,
              borderRadius: 24,
              zIndex: 100,
              bottom: '15%',
              left: '5%',
              paddingLeft: '2%',
              paddingRight: '2%'
              //   z
            }}
            onClick={() => {
              if (ref.current !== null) {
                const currentIndex = ref.current.getCurrentIndex();
                // onNavigate(events[currentIndex]);
                console.log('ref ', currentIndex);
              }
            }}
            variant='outlined'
            startIcon={<Event />}
          >
            Comprar ticket
          </Button>
        );
      }}
    />
  );
};
