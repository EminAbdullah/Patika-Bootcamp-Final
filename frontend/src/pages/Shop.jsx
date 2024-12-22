// src/pages/Shop.js

import React, { useState, useEffect, useCallback } from "react";
import { Container, Grid, Text, Loader } from "@mantine/core";
import FilterPanel from "../components/ShopPage/FilterPanel";
import PaginationControl from "../components/ShopPage/PaginationControl";
import ProductGrid from "../components/ShopPage/ProductGrid";
import axios from "axios";

function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [sortOption, setSortOption] = useState("recommended");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null); // Hata durumunu sıfırla
    try {
      const params = {
        page: currentPage,
        limit: perPage,
        sort: sortOption,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        categories:
          selectedCategories.length > 0 ? selectedCategories.join(",") : undefined,
        themes: selectedThemes.length > 0 ? selectedThemes.join(",") : undefined,
        search: searchTerm || undefined,
      };

      const response = await axios.get('http://host.docker.internal:3000/api/products', { params });
      const data = response.data;

      setProducts(data.products);
      setTotalPages(data.pages);
    } catch (error) {
      console.error("Ürünler alınırken hata oluştu:", error);
      setError("Ürünler alınırken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    perPage,
    sortOption,
    minPrice,
    maxPrice,
    selectedCategories,
    selectedThemes,
    searchTerm
  ]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const applyFilters = useCallback(() => {
    setCurrentPage(1); // Filtre uygulandığında sayfayı 1'e sıfırlamak
    loadProducts();
  }, [loadProducts]);

  const resetFilters = useCallback(() => {
    setSortOption("recommended");
    setMinPrice("");
    setMaxPrice("");
    setPerPage(12);
    setSelectedCategories([]);
    setSelectedThemes([]);
    setSearchTerm("");
    setCurrentPage(1);
    loadProducts();
  }, [loadProducts]);

  return (
    <Container size="xl" style={{ marginTop: "20px", marginBottom: "30px" }}>
      <Grid gutter="lg">
        <Grid.Col span={3}>
          <FilterPanel
            sortOption={sortOption}
            setSortOption={setSortOption}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            perPage={perPage}
            setPerPage={setPerPage}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedThemes={selectedThemes}
            setSelectedThemes={setSelectedThemes}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
          />
        </Grid.Col>
        <Grid.Col span={9}>
          {loading ? (
            <Loader variant="dots" size="xl" />
          ) : error ? (
            <Text align="center" size="lg" color="red">
              {error}
            </Text>
          ) : products.length === 0 ? (
            <Text align="center" size="lg" color="dimmed">
              No products found.
            </Text>
          ) : (
            <ProductGrid products={products} />
          )}
          {products.length > 0 && (
            <PaginationControl
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={totalPages}
            />
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default Shop;
