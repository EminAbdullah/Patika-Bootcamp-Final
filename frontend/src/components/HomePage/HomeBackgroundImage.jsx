import { BackgroundImage, Button, Container, Text, Title } from '@mantine/core'
import React from 'react'

const HomeBackgroundImage = () => {
  return (
    <BackgroundImage
      src="https://wallpapers.com/images/hd/1366-x-768-marvel-vs-dc-vk10rl9i62v86vpv.jpg"
      style={{ width: '100%', minHeight: '500px', display: 'flex', alignItems: 'center' }}
    >
      <Container size="md">
        <Title order={1} color="#fff">Discover Exclusive Collectibles</Title>
        <Text c="#fff" size="xl" mt="md">
          From iconic figures to rare finds, start your collection today.
        </Text>
        <Button mt="xl" size="lg" variant="white" color="dark">Shop Now</Button>
      </Container>
    </BackgroundImage>
  )
}

export default HomeBackgroundImage