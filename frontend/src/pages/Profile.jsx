import React, { useContext } from 'react';
import { Container, Title, Text, Loader, Center, Group, Avatar } from '@mantine/core';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user, loading, error } = useContext(UserContext);

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container>
        <Text c="red" size="lg">
          Kullanıcı bilgileri yüklenirken bir hata oluştu.
        </Text>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Text>Kullanıcı bulunamadı.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Group direction="column" align="center" spacing="md">
        <Avatar src={user.avatar} size="xl" radius="xl" />
        <Title order={2}>Profil</Title>
        <Text>
          <strong>İsim:</strong> {user.name}
        </Text>
        <Text>
          <strong>Email:</strong> {user.email}
        </Text>
        <Text>
          <strong>Rol:</strong> {user.role}
        </Text>
        {/* Diğer kullanıcı bilgileri */}
      </Group>
    </Container>
  );
};

export default Profile;
