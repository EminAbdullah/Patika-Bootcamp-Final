import React, { useState } from 'react';
import {Button,Container,TextInput,PasswordInput,Title,Stack,Paper,Anchor,Text,Alert} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { IconCheck, IconAlertCircle } from '@tabler/icons-react';

function SignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            name: (value) =>
                value.trim().length >= 2 ? null : 'İsim en az 2 karakter olmalıdır',
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Geçerli bir e-posta adresi girin',
            password: (value) =>
                value.length >= 6
                    ? null
                    : 'Şifre en az 6 karakter olmalıdır',
            confirmPassword: (value, values) =>
                value === values.password ? null : 'Şifreler eşleşmiyor',
        },
    });

    const handleSignUp = async (values) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://host.docker.internal:3000/api/auth/register', {
                name: values.name, 
                email: values.email,
                password: values.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

             setSuccess(response.data.message);
            form.reset();

            setTimeout(() => {
                navigate('/signin');
            }, 2000); // 2 saniye bekledikten sonra yönlendirme
        } catch (error) {
        
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.';

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size={500} my={40}>
            <Title
                align="center"
                sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                })}
            >
                Hesap Oluşturun
            </Title>
            <Text c="dimmed" size="sm" align="center" mt={5}>
                Zaten bir hesabınız var mı?{' '}
                <Anchor component={Link} to="/signin" size="sm">
                    Giriş Yapın
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                {/* Hata Mesajı */}
                {error && (
                    <Alert icon={<IconAlertCircle size={16} />} title="Hata" color="red" mb="md" variant="filled">
                        {error}
                    </Alert>
                )}

                {/* Başarı Mesajı */}
                {success && (
                    <Alert icon={<IconCheck size={16} />} title="Başarılı" color="teal" mb="md" variant="filled">
                        {success}
                    </Alert>
                )}

                <form onSubmit={form.onSubmit(handleSignUp)}>
                    <Stack>
                        <TextInput
                            label="Ad Soyad"
                            placeholder="Adınız Soyadınız"
                            required
                            {...form.getInputProps('name')}
                        />
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
                        <PasswordInput
                            label="Şifreyi Onayla"
                            placeholder="Şifrenizi tekrar girin"
                            required
                            {...form.getInputProps('confirmPassword')}
                        />
                        <Button type="submit" fullWidth mt="xl" loading={loading}>
                            Kayıt Ol
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}

export default SignUp;
