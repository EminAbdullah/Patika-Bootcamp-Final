import React from "react";
import { UnstyledButton } from "@mantine/core";
import classes from "./MobileNavbar.module.css";

function Navbar() {
  return (
    <>
      <UnstyledButton className={classes.control}>Home</UnstyledButton>
      <UnstyledButton className={classes.control}>Blog</UnstyledButton>
      <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
      <UnstyledButton className={classes.control}>Support</UnstyledButton>
    </>
  );
}

export default Navbar;
