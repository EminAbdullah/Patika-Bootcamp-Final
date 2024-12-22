// src/components/ShopPage/FilterPanel.js

import React from "react";
import {
  Paper,
  Title,
  TextInput,
  NumberInput,
  Checkbox,
  Button,
  Group,
  Stack,
  Select,
  Divider,
} from "@mantine/core";

function FilterPanel({
  sortOption,
  setSortOption,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  perPage,
  setPerPage,
  selectedCategories,
  setSelectedCategories,
  selectedThemes,
  setSelectedThemes,
  searchTerm,
  setSearchTerm,
  applyFilters,
  resetFilters,
}) {
  // Kategoriler ve temalar backend modelinizle uyumlu hale getirildi
  const categories = [
    { value: "figure", label: "Figures" },
    { value: "artprints", label: "Art Prints" },
  ];

  const themes = [
    { value: "anime", label: "Anime" },
    { value: "marvel", label: "Marvel" },
    { value: "dc", label: "DC" },
    { value: "star wars", label: "Star Wars" },
  ];

  const handleCategoryChange = (categoryValue) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryValue)
        ? prev.filter((item) => item !== categoryValue)
        : [...prev, categoryValue]
    );
  };

  const handleThemeChange = (themeValue) => {
    setSelectedThemes((prev) =>
      prev.includes(themeValue)
        ? prev.filter((item) => item !== themeValue)
        : [...prev, themeValue]
    );
  };

  // `perPage` değiştiğinde filtreleri otomatik olarak uygulamak için
  const handlePerPageChange = (value) => {
    setPerPage(Number(value));
    // `useEffect` bu değişikliği yakalayacak ve sayfa numarasını ayarlayacak
  };

  return (
    <Paper
      radius="md"
      shadow="lg"
      padding="md"
      style={{ borderRadius: "10px" }}
    >
      <Title order={4} style={{ marginBottom: "20px" }}>
        Filter Products
      </Title>

      {/* Search Bar */}
      <TextInput
        label="Search"
        placeholder="Search products"
        size="md"
        radius="md"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
        style={{ marginBottom: "20px" }}
      />

      <Divider
        label="Price Range"
        labelPosition="center"
        style={{ marginBottom: "15px" }}
      />

      {/* Price Range */}
      <Group grow style={{ marginBottom: "20px" }}>
        <NumberInput
          placeholder="Min"
          label="Min Price"
          hideControls
          min={0}
          value={minPrice}
          onChange={setMinPrice}
          radius="md"
        />
        <NumberInput
          placeholder="Max"
          label="Max Price"
          hideControls
          min={0}
          value={maxPrice}
          onChange={setMaxPrice}
          radius="md"
        />
      </Group>

      <Divider
        label="Category"
        labelPosition="center"
        style={{ marginBottom: "15px" }}
      />

      {/* Category Filter */}
      <Stack spacing="xs" style={{ marginBottom: "20px" }}>
        {categories.map((category) => (
          <Checkbox
            key={category.value}
            label={category.label}
            checked={selectedCategories.includes(category.value)}
            onChange={() => handleCategoryChange(category.value)}
            radius="md"
          />
        ))}
      </Stack>

      <Divider
        label="Theme"
        labelPosition="center"
        style={{ marginBottom: "15px" }}
      />

      {/* Theme Filter */}
      <Stack spacing="xs" style={{ marginBottom: "20px" }}>
        {themes.map((theme) => (
          <Checkbox
            key={theme.value}
            label={theme.label}
            checked={selectedThemes.includes(theme.value)}
            onChange={() => handleThemeChange(theme.value)}
            radius="md"
          />
        ))}
      </Stack>

      <Divider
        label="Sorting & Pagination"
        labelPosition="center"
        style={{ marginBottom: "15px" }}
      />

      {/* Sort By */}
      <Select
        label="Sort By"
        placeholder="Recommended"
        data={[
          { value: "recommended", label: "Recommended" },
          { value: "price_asc", label: "Price: Low to High" },
          { value: "price_desc", label: "Price: High to Low" },
        ]}
        value={sortOption}
        onChange={setSortOption}
        radius="md"
        style={{ marginBottom: "15px" }}
      />

      {/* Per Page */}
      <Select
        label="Per Page"
        placeholder="12"
        data={[
          { value: "12", label: "12" },
          { value: "24", label: "24" },
          { value: "48", label: "48" },
        ]}
        value={String(perPage)}
        onChange={handlePerPageChange}
        radius="md"
        style={{ marginBottom: "20px" }}
      />

      {/* Apply and Reset Filters Buttons */}
      <Group position="apart" grow style={{ marginTop: "20px" }}>
        <Button
          variant="filled"
          color="blue"
          radius="md"
          size="md"
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
        <Button
          variant="outline"
          color="red"
          radius="md"
          size="md"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </Group>
    </Paper>
  );
}

export default FilterPanel;
