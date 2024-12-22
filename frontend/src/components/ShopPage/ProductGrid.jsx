// src/components/ShopPage/ProductGrid.js

import React from "react";
import { Grid, Paper, Text, Image, Badge, Button } from "@mantine/core";
import { Link } from "react-router-dom";

function ProductGrid({ products }) {
  return (
    <Grid>
      {products.map((product) => (
        <Grid.Col span={4} key={product._id}>
          <Paper
            radius="md"
            shadow="xs"
            padding="10px"
            style={{
              textAlign: "center",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            {/* Ürün Resmi */}
            <div
              style={{
                marginBottom: "10px",
                height: "200px",
                backgroundColor: "#f8f9fa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {product.images && product.images.length > 0 ? (
                <Image
                  src={`http://localhost:3000${product.images[0]}`} 
                  alt={product.name}
                  height={200}
                  fit="cover"
                  radius="md"
                />
              ) : (
                <Text color="dimmed" size="sm">
                  No Image Available
                </Text>
              )}
            </div>

            {/* Ürün Adı */}
            <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }}>
              <Text weight={600} size="lg" style={{ color: "#1c7ed6" }}>
                {product.name}
              </Text>
            </Link>

            {/* Kısa Açıklama */}
            <Text size="sm" color="dimmed" style={{ marginTop: "5px" }}>
              {product.description.substring(0, 100)}...
            </Text>

            {/* Fiyat */}
            <Text size="lg" weight={700} style={{ marginTop: "10px" }}>
              ${product.price.toFixed(2)}
            </Text>

            {/* Kategori ve Tema Etiketleri */}
            <div style={{ marginTop: "10px" }}>
              <Badge color="blue" variant="light" style={{ marginRight: "5px" }}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Badge>
              <Badge color="green" variant="light">
                {product.theme.charAt(0).toUpperCase() + product.theme.slice(1)}
              </Badge>
            </div>

            {/* Detay Butonu */}
            <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }}>
              <Button variant="light" color="blue" fullWidth style={{ marginTop: "15px" }}>
                View Details
              </Button>
            </Link>
          </Paper>
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default ProductGrid;
