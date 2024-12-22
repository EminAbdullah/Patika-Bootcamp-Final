// LoginRegister.js
import React from 'react';
import {
  TextInput,
  PasswordInput,
  Paper,
  Text,
  Container,
  Button,
  Group,
  Alert,
  Divider,
  Stack,
  Transition,
} from '@mantine/core';
import {
  IconAt,
  IconLock,
  IconUser,
  IconAlertCircle,
  IconCheck,
} from '@tabler/icons-react';

function LoginRegister({ onLogin, onRegister }) {
  // State to toggle between 'login' and 'register' forms
  const [formType, setFormType] = React.useState('login');

  // Login form state
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');

  // Register form state
  const [registerUsername, setRegisterUsername] = React.useState('');
  const [registerEmail, setRegisterEmail] = React.useState('');
  const [registerPassword, setRegisterPassword] = React.useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = React.useState('');
  const [registerError, setRegisterError] = React.useState('');
  const [registrationSuccess, setRegistrationSuccess] = React.useState('');

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Example user data
    const mockUser = {
      email: 'user@example.com',
      password: 'password123',
    };

    if (loginEmail === mockUser.email && loginPassword === mockUser.password) {
      onLogin();
    } else {
      setLoginError('Invalid email or password.');
    }
  };

  // Handle Register
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Passwords do not match.');
      return;
    }

    // Registration operations can be done here
    // For example, send user data to an API
    // In this example, we will assume it is successful
    onRegister();

    // Set success message
    setRegistrationSuccess('Registration successful! You can now log in.');

    // Switch to login form after successful registration
    setFormType('login');

    // Optionally, reset registration form fields
    setRegisterUsername('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
    setRegisterError('');
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="lg" p={40} radius="md">
        {/* Toggle Buttons for Forms */}
        <Group position="center" mb="md">
          <Button
            variant={formType === 'login' ? 'filled' : 'subtle'}
            color={formType === 'login' ? 'blue' : 'gray'}
            onClick={() => setFormType('login')}
            leftIcon={<IconLock size={16} />}
          >
            Login
          </Button>
          <Button
            variant={formType === 'register' ? 'filled' : 'subtle'}
            color={formType === 'register' ? 'teal' : 'gray'}
            onClick={() => setFormType('register')}
            leftIcon={<IconUser size={16} />}
          >
            Register
          </Button>
        </Group>

        <Divider my="sm" />

        {/* Transition for Smooth Form Switching */}
        <Transition mounted={formType === 'login'} transition="fade" duration={300} timingFunction="ease">
          {(styles) =>
            formType === 'login' && (
              <div style={styles}>
                {/* Login Form */}
                <form onSubmit={handleLoginSubmit}>
                  <Stack spacing="md">
                    {/* Display success message if coming from registration */}
                    {registrationSuccess && (
                      <Alert
                        icon={<IconCheck size={16} />}
                        title="Success"
                        color="green"
                        withCloseButton
                        onClose={() => setRegistrationSuccess('')}
                      >
                        {registrationSuccess}
                      </Alert>
                    )}

                    <TextInput
                      label="Email"
                      placeholder="your.email@example.com"
                      required
                      icon={<IconAt size={16} />}
                      value={loginEmail}
                      onChange={(event) => setLoginEmail(event.currentTarget.value)}
                    />

                    <PasswordInput
                      label="Password"
                      placeholder="Enter your password"
                      required
                      icon={<IconLock size={16} />}
                      value={loginPassword}
                      onChange={(event) => setLoginPassword(event.currentTarget.value)}
                    />

                    {loginError && (
                      <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="Error"
                        color="red"
                        withCloseButton
                        onClose={() => setLoginError('')}
                      >
                        {loginError}
                      </Alert>
                    )}

                    <Button fullWidth type="submit" mt="md" color="blue">
                      Login
                    </Button>
                  </Stack>
                </form>
              </div>
            )
          }
        </Transition>

        <Transition mounted={formType === 'register'} transition="fade" duration={300} timingFunction="ease">
          {(styles) =>
            formType === 'register' && (
              <div style={styles}>
                {/* Register Form */}
                <form onSubmit={handleRegisterSubmit}>
                  <Stack spacing="md">
                    <TextInput
                      label="Username"
                      placeholder="Enter your username"
                      required
                      icon={<IconUser size={16} />}
                      value={registerUsername}
                      onChange={(event) => setRegisterUsername(event.currentTarget.value)}
                    />

                    <TextInput
                      label="Email"
                      placeholder="your.email@example.com"
                      required
                      icon={<IconAt size={16} />}
                      value={registerEmail}
                      onChange={(event) => setRegisterEmail(event.currentTarget.value)}
                    />

                    <PasswordInput
                      label="Password"
                      placeholder="Enter your password"
                      required
                      icon={<IconLock size={16} />}
                      value={registerPassword}
                      onChange={(event) => setRegisterPassword(event.currentTarget.value)}
                    />

                    <PasswordInput
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      required
                      icon={<IconLock size={16} />}
                      value={registerConfirmPassword}
                      onChange={(event) => setRegisterConfirmPassword(event.currentTarget.value)}
                    />

                    {registerError && (
                      <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="Error"
                        color="red"
                        withCloseButton
                        onClose={() => setRegisterError('')}
                      >
                        {registerError}
                      </Alert>
                    )}

                    <Button fullWidth type="submit" mt="md" color="teal">
                      Register
                    </Button>
                  </Stack>
                </form>
              </div>
            )
          }
        </Transition>
      </Paper>
    </Container>
  );
}

export default LoginRegister;
