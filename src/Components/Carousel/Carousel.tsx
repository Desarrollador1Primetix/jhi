import React, { FC } from 'react';
import Carousel from 'react-material-ui-carousel';

interface ItemProps {
  name: string;
  description: string;
  image: string;
}

// function srcset(image: string, width: number, height: number, rows = 2, cols = 2) {
//   return {
//     src: `${image}?fit=fill&auto=format`,
//     srcSet: `${image}?fit=fill&auto=format&dpr=2 2x`
//   };
// }

export const Carrousel = () => {
  var items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'
    },
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'
    }
  ];

  return (
    <Carousel indicators={true} sx={{ height: 400 }}>
      {items.map(({ description, name, image }, i) => (
        <Item key={i} description={description} name={name} image={image} />
      ))}
    </Carousel>
  );
};

export const Item: FC<ItemProps> = ({ name, description, image }) => {
  return (
    <img src={image} alt={'test'} height={'100%'} width={'100%'} style={{ objectFit: 'fill' }} />

    // <Paper style={{ padding: 10 }}>
    //     <Image/>
    //   <h2>{name}</h2>
    //   <p>{description}</p>
    //   <Button className="CheckButton">Check it out!</Button>
    //   <Button className="CheckButton">Check it out!</Button>
    //   <Button className="CheckButton">Check it out!</Button>
    // </Paper>
  );
};
