import {
  AppShell,
  Burger,
  Button,
  Group,
  UnstyledButton,
  useMantineColorScheme,
  useComputedColorScheme,
  ActionIcon,
  Image,
  Menu,
  Center,
  Loader,
  Badge, // Import Badge from Mantine
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSun,
  IconMoon,
  IconShoppingCart,
  IconUser,
  IconLogin,
  IconUserPlus,
  IconLogout,
} from "@tabler/icons-react";
import { Outlet } from "react-router-dom";
import classes from "./MobileNavbar.module.css";
import FooterCentered from "./Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function AppShellTest() {
  const navigate = useNavigate();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const [opened, { toggle }] = useDisclosure();

  const {
    user,
    loading: userLoading,
    logout,
    error,
    cart,
    cartLoading,
  } = useContext(UserContext);

  // Calculate total items in the cart
  const cartItemCount = cart
    ? cart.items.reduce((count, item) => count + item.quantity, 0)
    : 0;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group gap={20} visibleFrom="sm">
              <Image
                src="/images/logo.jpg"
                alt="logo"
                height={40}
                fit="contain"
                onClick={() => navigate("/")}
                style={{
                  cursor: "pointer",
                }}
              />

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
            </Group>
            <Group ml="xl" gap={0} visibleFrom="sm">
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

              <UnstyledButton
                className={classes.control}
                onClick={() => navigate("/about")}
              >
                About
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                onClick={() => navigate("/contact-us")}
              >
                Contact Us
              </UnstyledButton>
            </Group>

            <Group ml="xl" gap={0} visibleFrom="sm">
              {/* Auth Menu */}
              <Menu withArrow shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon variant="transparent" size="xl">
                    <IconUser className={classes.icon} stroke={1.5} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  {(userLoading || cartLoading) ? (
                    <Center>
                      <Loader size="sm" />
                    </Center>
                  ) : (
                    <>
                      {!user && (
                        <>
                          <Menu.Item
                            icon={<IconLogin size={16} />}
                            onClick={() => navigate("/signin")}
                          >
                            Sign In
                          </Menu.Item>
                          <Menu.Item
                            icon={<IconUserPlus size={16} />}
                            onClick={() => navigate("/signup")}
                          >
                            Sign Up
                          </Menu.Item>
                        </>
                      )}
                      {user && (
                        <>
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
                          {user.role === "admin" && (
                            <Menu.Item
                              icon={<IconUser size={16} />}
                              onClick={() => navigate("/admin/dashboard")}
                            >
                              Admin Dashboard
                            </Menu.Item>
                          )}
                        </>
                      )}
                    </>
                  )}
                </Menu.Dropdown>
              </Menu>
              <ActionIcon
                variant="transparent"
                size="xl"
                onClick={() => navigate("/basket")}
                style={{ position: 'relative' }} // To position the badge
              >
                <IconShoppingCart className={classes.icon} stroke={1.5} />
                {cartItemCount > 0 && (
                  <Badge
                    color="red"
                    size="xs"
                    variant="filled"
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      pointerEvents: 'none',
                    }}
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </ActionIcon>
            </Group>
          </Group>
        </Group>
        {/* Error Message */}
        {error && (
          <Group position="center" mt="sm">
            <Text color="red" size="sm">
              {error}
            </Text>
          </Group>
        )}
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton
          className={classes.control}
          onClick={() => navigate("/")}
        >
          Home
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => navigate("/blog")}
        >
          Blog
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => navigate("/contacts")}
        >
          Contacts
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => navigate("/support")}
        >
          Support
        </UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet></Outlet>
      </AppShell.Main>

      <FooterCentered />
    </AppShell>
  );
}
export default AppShellTest;
