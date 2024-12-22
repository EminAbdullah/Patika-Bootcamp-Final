// import React from "react";
// import {
//   Group,
//   Image,
//   ActionIcon,
//   UnstyledButton,
//   useMantineColorScheme,
//   useComputedColorScheme,
//   Burger,
// } from "@mantine/core";
// import {
//   IconSun,
//   IconMoon,
//   IconSearch,
//   IconUser,
//   IconShoppingCart,
// } from "@tabler/icons-react";
// import { useDisclosure } from "@mantine/hooks";
// import { useNavigate } from "react-router-dom";
// import classes from "./MobileNavbar.module.css";

// function Header() {
//   const navigate = useNavigate();
//   const computedColorScheme = useComputedColorScheme("light", {
//     getInitialValueInEffect: true,
//   });
//   const { colorScheme, setColorScheme } = useMantineColorScheme();
//   const [opened, { toggle }] = useDisclosure();

//   return (
//     <Group h="100%" px="md">
//       <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
//       <Group justify="space-between" style={{ flex: 1 }}>
//         <Group gap={20} visibleFrom="sm">
//           <Image
//             src="/images/logo.jpg"
//             alt="logo"
//             height={40}
//             fit="contain"
//             onClick={() => navigate("/")}
//             style={{
//               cursor: "pointer",
//             }}
//           />
//           <ActionIcon
//             onClick={() =>
//               setColorScheme(
//                 computedColorScheme === "light" ? "dark" : "light"
//               )
//             }
//             variant="default"
//             size="xl"
//             aria-label="Toggle color scheme"
//           >
//             {colorScheme === "dark" ? (
//               <IconSun className={classes.icon} stroke={1.5} />
//             ) : (
//               <IconMoon className={classes.icon} stroke={1.5} />
//             )}
//           </ActionIcon>
//         </Group>

//         <Group ml="xl" gap={0} visibleFrom="sm">
//           <UnstyledButton
//             className={classes.control}
//             onClick={() => navigate("/")}
//           >
//             Home
//           </UnstyledButton>
//           <UnstyledButton
//             className={classes.control}
//             onClick={() => navigate("/shop")}
//           >
//             Shop
//           </UnstyledButton>
//           <UnstyledButton
//             className={classes.control}
//             onClick={() => navigate("/about")}
//           >
//             About
//           </UnstyledButton>
//           <UnstyledButton
//             className={classes.control}
//             onClick={() => navigate("/contact-us")}
//           >
//             Contact Us
//           </UnstyledButton>
//         </Group>

//         <Group ml="xl" gap={0} visibleFrom="sm">
//           <ActionIcon variant="transparent" size="xl">
//             <IconSearch className={classes.icon} stroke={1.5} />
//           </ActionIcon>
//           <ActionIcon variant="transparent" size="xl">
//             <IconUser className={classes.icon} stroke={1.5} />
//           </ActionIcon>
//           <ActionIcon variant="transparent" size="xl"  onClick={() => navigate("/Basket")}>
//             <IconShoppingCart className={classes.icon} stroke={1.5} />
//           </ActionIcon>
//         </Group>
//       </Group>
//     </Group>
//   );
// }

// export default Header;
