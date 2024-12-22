// src/components/ShopPage/PaginationControl.js

import React from "react";
import { Pagination, Text, useMantineTheme } from "@mantine/core";

function PaginationControl({ currentPage, setCurrentPage, total }) {
  const theme = useMantineTheme();

  return (
    <div
      style={{
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Pagination
        page={currentPage}
        onChange={setCurrentPage}
        total={total}
        siblings={1}
        boundaries={1}
        color="blue"
        radius="md"
        styles={{
          item: {
            "&[data-active]": {
              backgroundColor: theme.colors.blue[6],
              color: theme.white,
              "&:hover": {
                backgroundColor: theme.colors.blue[7],
              },
            },
          },
        }}
      />
      <Text size="sm" color="dimmed" style={{ marginTop: "10px" }}>
        Page {currentPage} of {total}
      </Text>
    </div>
  );
}

export default PaginationControl;
