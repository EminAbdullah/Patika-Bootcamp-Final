import { AppShell, Menu, Burger, Group, ScrollArea, Skeleton, Text, ThemeIcon, UnstyledButton ,  ActionIcon,  useMantineColorScheme, Loader,
  useComputedColorScheme} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {IconSun,  IconUser, IconBox, IconHome, IconSettings, IconShoppingCart, IconUsers } from '@tabler/icons-react';
import {
  IconMoon,
  IconLogin,
  IconUserPlus,
  IconLogout,
} from "@tabler/icons-react";
import { Outlet, useNavigate } from 'react-router-dom';
import classes from "./MobileNavbar.module.css";
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

export function AdminAppShell() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const { colorScheme, setColorScheme } = useMantineColorScheme();
    const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();
  const { user, loading, logout, error } = useContext(UserContext);


  const links = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <IconHome size={16} /> },
    { path: '/admin/add-product', label: 'Ürün Ekle', icon: <IconBox size={16} /> },
    { path: '/admin/view-products', label: 'Ürünleri Görüntüle', icon: <IconUsers size={16} /> },
    { path: '/admin/view-orders', label: 'Siparişleri Görüntüle', icon: <IconShoppingCart size={16} /> },
    { path: '/admin/settings', label: 'Ayarlar', icon: <IconSettings size={16} /> },
  ];
  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* <MantineLogo size={30} /> */}
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group gap={10} visibleFrom="sm">
             
              <ActionIcon
                onClick={() =>
                  setColorScheme(
                    computedColorScheme === "light" ? "dark" : "light"
                  )
                }
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
              >
                {colorScheme === "dark" ? (
                  <IconSun className={classes.icon} stroke={1.5} />
                ) : (
                  <IconMoon className={classes.icon} stroke={1.5} />
                )}
              </ActionIcon>

              <UnstyledButton
                className={classes.control}
                onClick={() => navigate("/")}
              >
                Home
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                onClick={() => navigate("/shop")}
              >
                Shop
              </UnstyledButton>
            </Group>
           

            <Group ml="xl" gap={0} visibleFrom="sm">
              {/* Auth Menüsü */}
              <Menu withArrow shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon variant="transparent" size="xl">
                    <IconUser className={classes.icon} stroke={1.5} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                <Menu.Item
                            // icon={<IconProfile size={16} />}
                            onClick={() => navigate("/profile")}
                          >
                            Profile
                          </Menu.Item>
                          <Menu.Item
                            icon={<IconLogout size={16} />}
                            onClick={() => {
                              logout();
                              navigate("/");
                            }}
                          >
                            Logout
                          </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
       
        <AppShell.Section grow  component={ScrollArea}>
        
        {links.map((link) => (
            <UnstyledButton
              key={link.label}
              onClick={() => navigate(link.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                backgroundColor:
                  location.pathname === link.path ? '#e0f7fa' : 'transparent',
                color: location.pathname === link.path ? '#20c997' : '#495057',
                marginBottom: '8px',
                cursor: 'pointer',
              }}
            >
              <ThemeIcon
                color={location.pathname === link.path ? 'teal' : 'gray'}
                variant="light"
                size={30}
              >
                {link.icon}
              </ThemeIcon>
              <Text size="sm" weight={500} ml="sm">
                {link.label}
              </Text>
            </UnstyledButton>
          ))}
        </AppShell.Section>
        
      </AppShell.Navbar>
      <AppShell.Main> <Outlet></Outlet></AppShell.Main>
    </AppShell>
  );
}

export default AdminAppShell;
