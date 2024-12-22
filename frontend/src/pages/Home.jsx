import CardsCarousel from '../components/Carousel/CardCarousel';
import { Container, Title, Text, Button,  Grid, Card, Image } from '@mantine/core';
import CategoriesSection from '../components/HomePage/CategoriesSection';
import HomeBackgroundImage from '../components/HomePage/HomeBackgroundImage';



const Home= () => {
  

  return (
    <>
 
  <HomeBackgroundImage/>

      <CardsCarousel />
     <CategoriesSection/>
    </>
  );
};

export default Home;
