import React from 'react';
import { Container, Title, Text, Image, Grid, Paper, Button, Stack } from '@mantine/core';

function About() {
  return (
    <Container size="lg" style={{ padding: '50px 0' }}>
      {/* Kahraman Bölümü */}
      <Stack align="center" spacing="md" style={{ textAlign: 'center', marginBottom: '50px' }}>
        <Title
          style={{
            fontSize: '3rem',
            fontWeight: 800,
            lineHeight: 1.2,
            color: '#2C3E50',
          }}
        >
          Discover Who We Are
        </Title>
        <Text size="lg" color="dimmed" style={{ maxWidth: 700 }}>
          We are a team driven by passion and innovation. Every step we take is aimed at delivering exceptional results
          and pushing the boundaries of what's possible.
        </Text>
        <Button
          size="lg"
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
        >
          Contact Us
        </Button>
      </Stack>

      {/* Misyon, Vizyon ve Değerler */}
      <Grid gutter="lg" style={{ marginBottom: '50px' }}>
        <Grid.Col span={4}>
          <Paper radius="md" shadow="md" p="xl" style={{ height: '100%', textAlign: 'center' }}>
            <Title order={4} style={{ marginBottom: '10px', color: '#3498DB' }}>
              Our Mission
            </Title>
            <Text size="sm" color="dimmed">
              Our mission is to empower communities by creating innovative solutions that inspire and transform lives.
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Paper radius="md" shadow="md" p="xl" style={{ height: '100%', textAlign: 'center' }}>
            <Title order={4} style={{ marginBottom: '10px', color: '#E67E22' }}>
              Our Vision
            </Title>
            <Text size="sm" color="dimmed">
              We envision a world where technology serves as a bridge to opportunity, growth, and success for everyone.
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Paper radius="md" shadow="md" p="xl" style={{ height: '100%', textAlign: 'center' }}>
            <Title order={4} style={{ marginBottom: '10px', color: '#9B59B6' }}>
              Our Values
            </Title>
            <Text size="sm" color="dimmed">
              Integrity, innovation, and inclusivity are at the core of everything we do. We believe in making a positive
              impact every day.
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Ekibimiz */}
      <Title
        align="center"
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '20px',
          color: '#34495E',
        }}
      >
        Meet Our Team
      </Title>
      <Text
        align="center"
        size="sm"
        color="dimmed"
        style={{ maxWidth: '700px', margin: '0 auto', marginBottom: '40px' }}
      >
        We believe in the power of collaboration. Here are some of the brilliant minds who drive our success.
      </Text>

      <Grid gutter="lg">
        {['Alice', 'Bob', 'Charlie', 'Diana'].map((name, index) => (
          <Grid.Col span={3} key={index}>
            <Paper
              radius="md"
              shadow="sm"
              p="lg"
              style={{
                textAlign: 'center',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                height: '100%',
              }}
            >
              <Image
                src={`https://via.placeholder.com/150?text=${name}`}
                alt={name}
                radius="100%"
                style={{
                  margin: '0 auto',
                  marginBottom: '15px',
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                }}
              />
              <Text weight={600}>{name}</Text>
              <Text size="sm" color="dimmed">
                Team Member
              </Text>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

export default About;
