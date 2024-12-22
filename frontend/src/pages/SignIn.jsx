import React, { useState, useContext } from 'react';
import { Button, Container, TextInput, PasswordInput, Title, Stack, Paper, Anchor, Text, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { UserContext } from '../context/UserContext';


function SignIn() {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext); // UserContext'ten setToken fonksiyonunu alıyoruz

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'Geçerli bir e-posta adresi girin',
      password: (value) =>
        value.length >= 6 ? null : 'Şifre en az 6 karakter olmalıdır',
    },
  });

  const handleSignIn = async (values) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://host.docker.internal:3000/api/auth/login', {
        email: values.email,
        password: values.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { token, message } = response.data;
      setSuccess(`${message} Ana sayfaya yönlendiriliyorsunuz.`);

      setToken(token);

      setTimeout(() => {
        navigate('/');
      }, 2000); // 2 saniye bekledikten sonra yönlendirme
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Giriş yaparken bir hata oluştu. Lütfen tekrar deneyin.';

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Hoş Geldiniz!
      </Title>
      <Text c="dimmed" size="sm" align="center" mt={5}>
        Henüz bir hesabınız yok mu?{' '}
        <Anchor component={Link} to="/signup" size="sm">
          Kayıt Olun
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {/* Hata Mesajı */}
        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Hata"
            color="red"
            mb="md"
            variant="filled"
          >
            {error}
          </Alert>
        )}

        {/* Başarı Mesajı */}
        {success && (
          <Alert
            icon={<IconCheck size={16} />}
            title="Başarılı"
            color="teal"
            mb="md"
            variant="filled"
          >
            {success}
          </Alert>
        )}

        <form onSubmit={form.onSubmit(handleSignIn)}>
          <Stack>
            <TextInput
              label="E-posta"
              placeholder="you@example.com"
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Şifre"
              placeholder="Şifrenizi girin"
              required
              {...form.getInputProps('password')}
            />

            <Button type="submit" fullWidth mt="xl" loading={loading}>
              Giriş Yap
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default SignIn;
