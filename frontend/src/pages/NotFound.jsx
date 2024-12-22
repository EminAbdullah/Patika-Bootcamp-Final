// src/pages/NotFound.js
import React from 'react';
import { Container, Title, Text, Button, Group, Image } from '@mantine/core';
import { IconMoodSad } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container
      size="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        textAlign: 'center',
      }}
    >
      <IconMoodSad size={80} color="#e74c3c" />

      <Title order={1} mt="md">
        Sayfa Bulunamadı
      </Title>
      <Text c="dimmed" size="lg" mt="sm">
        Aradığınız sayfa mevcut değil. Lütfen bağlantınızı kontrol edin veya ana sayfaya dönün.
      </Text>

      <Group position="center" mt="xl">
        <Button
          variant="light"
          color="blue"
          size="md"
          onClick={() => navigate('/')}
          leftIcon={<IconMoodSad size={16} />}
        >
          Ana Sayfaya Dön
        </Button>
      </Group>
    </Container>
  );
}

export default NotFound;
