import React from 'react';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Text, Title, useMantineTheme, Button, Card, Image, Container } from '@mantine/core';
import { useNavigate } from "react-router-dom";
const data = [
  {
    image:
      'https://www.sideshow.com/cdn-cgi/image/width=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/906960/ahsoka-tano_star-wars_gallery_63d98efc0a6ae.jpg',
    title: '',
    category: '',
    artist: ''
  },
  {
    image:
      'https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/914044/hot-toys-dc-comics-batman-sixth-scale-figure-gallery-6761a6bf203af.jpg',
    title: '',
    category: '',
    artist: ''
  },
  {
    image:
      'https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/913946/hot-toys-league-of-legends-jinx-sixth-scale-figure-gallery-6740ac3aeaa6c.jpg',
    title: '',
    category: '',
    artist: ''
  },
  {
    image:
      'https://www.sideshow.com/cdn-cgi/image/width=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/908326/iron-man-neon-tech-40__gallery_60f8a8126efca.jpg',
    title: '',
    category: '',
    artist: ''
  },
  {
    image:
      'https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/906505/optimus-prime_transformers_gallery_5ee1007ba0a1e.jpg',
    title: 'Best places to visit this winter',
    category: '',
    artist: ''
  },
  {
    image:
      'https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/400369/the-child_star-wars_gallery_660c4c4ed663d.jpg',
    title: '',
    category: '',
    artist: ''
  },
];

function CardsCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const navigate = useNavigate();
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card 
        shadow="sm" 
        padding="md" 
        radius="md" 
        href="#" 
        style={{ 
          textAlign: 'center', 
          cursor: 'pointer', 
          height: '100%',
              
        }}
      >
        <Card.Section style={{ flex: 1,height:"200",  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image h={"100%"} w={"100%"} src={item.image} alt={item.title} style={{ objectFit:"cover"}} />
        </Card.Section>
       
      </Card>
    </Carousel.Slide>
  ));

  return (
    <Container size="xl">
      <Title 
        order={2} 
        align="center" 
        mt={20} 
        mb={30}
        style={{
          background: 'linear-gradient(to right, #ff6e7f, #bfe9ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700
        }}
      >
        LATEST RELEASES
      </Title>
      
      <Carousel
       containScroll="trimSnaps"
        slideSize={{  sm: '33.3333%',md:"25%" ,xs:"50%"}}
        slideGap="sm"
        align="start"
        slidesToScroll={1}
        
      >
        {slides}
      </Carousel>

      <div style={{ textAlign: 'center', paddingTop: 20 }}>
        <Button variant="outline" c="blue" size="md"  onClick={() => navigate("/shop")} >
          Show all
        </Button>
      </div>
    </Container>
  );
}

export default CardsCarousel;
