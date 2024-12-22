// src/pages/ProductDetail.js

import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Image,
  Text,
  Title,
  Badge,
  Button,
  Group,
  Loader,
  Alert,
  NumberInput,
  Notification,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams(); // URL'den ürün ID'sini al
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UserContext'ten sepet fonksiyonlarına eriş
  const { addToCart } = useContext(UserContext);

  // Miktar seçimi için durum
  const [quantity, setQuantity] = useState(1);

  // Bildirim durumu
  const [notification, setNotification] = useState({
    opened: false,
    message: "",
    color: "green",
    icon: null,
  });

  // Backend API URL
  const API_BASE_URL = "http://host.docker.internal:3000/api"; // Backend ayarlarınıza göre güncelleyin

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(
          "Ürünü getirirken bir hata oluştu. Lütfen tekrar deneyin."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, API_BASE_URL]);

  const handleAddToCart = async () => {
    if (!product) return;

    if (quantity < 1) {
      setNotification({
        opened: true,
        message: "Miktar en az 1 olmalıdır.",
        color: "red",
        icon: <X size={16} />,
      });
      // Bildirimin otomatik kapanması için zamanlayıcı ekleyin
      setTimeout(() => {
        setNotification({ ...notification, opened: false });
      }, 3000);
      return;
    }

    try {
      await addToCart(product._id, quantity); // UserContext'ten addToCart kullan
      setNotification({
        opened: true,
        message: "Ürün sepete başarıyla eklendi!",
        color: "green"
      });
      setQuantity(1); // Başarılı eklemeden sonra miktarı sıfırla

      // Bildirimin otomatik kapanması için zamanlayıcı ekleyin
      setTimeout(() => {
        setNotification({ ...notification, opened: false });
      }, 3000);
    } catch (error) {
      console.error("Ürün sepete eklenemedi:", error);
      setNotification({
        opened: true,
        message: "Ürün sepete eklenemedi.",
        color: "red"
      });

      // Bildirimin otomatik kapanması için zamanlayıcı ekleyin
      setTimeout(() => {
        setNotification({ ...notification, opened: false });
      }, 3000);
    }
  };

  if (loading) {
    return (
      <Container size="md" style={{ textAlign: "center", marginTop: "50px" }}>
        <Loader variant="dots" size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="md" style={{ marginTop: "50px" }}>
        <Alert title="Hata!" color="red">
          {error}
        </Alert>
        <Group position="center" style={{ marginTop: "20px" }}>
          <Link to="/shop">
            <Button variant="filled" color="blue">
              Geri Dön
            </Button>
          </Link>
        </Group>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container size="md" style={{ marginTop: "50px" }}>
        <Text align="center" size="lg" color="dimmed">
          Ürün bulunamadı.
        </Text>
        <Group position="center" style={{ marginTop: "20px" }}>
          <Link to="/shop">
            <Button variant="filled" color="blue">
              Geri Dön
            </Button>
          </Link>
        </Group>
      </Container>
    );
  }

  return (
    <Container size="xl" style={{ marginTop: "30px", marginBottom: "30px" }}>
      {/* Bildirim */}
      {notification.opened && (
        <Notification
          onClose={() =>
            setNotification({ ...notification, opened: false })
          }
          color={notification.color}
          title={notification.color === "green" ? "Başarılı" : "Hata"}
          icon={notification.icon}
          withCloseButton={true} // 'disallowClose' yerine 'withCloseButton' kullanıldı
          mb="md"
          style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}
        >
          {notification.message}
        </Notification>
      )}

      <Group position="apart" align="flex-start">
        {/* Ürün Resimleri - Sol Taraf */}
        <div style={{ flex: 1, maxWidth: "500px" }}>
          {product.images && product.images.length > 0 ? (
            <Carousel
              withIndicators
              height={400}
              slideSize="100%"
              slideGap="sm"
              loop
              align="start"
              styles={{
                control: (theme, props) => ({
                  opacity: props.inactive ? 0 : 1, // 'inactive' özelliğini kullan
                  cursor: props.inactive ? "default" : "pointer",
                }),
              }}
            >
              {product.images.map((image, index) => (
                <Carousel.Slide key={index}>
                  <Image
                    src={`http://host.docker.internal:3000${image}`}
                    alt={`${product.name} resmi ${index + 1}`}
                    width="100%"
                    height={400}
                    fit="contain"
                    radius="md"
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          ) : (
            <Text color="dimmed" size="sm">
              Görüntü Yok
            </Text>
          )}
        </div>

        {/* Ürün Bilgileri - Sağ Taraf */}
        <div style={{ flex: 1, maxWidth: "600px", paddingLeft: "20px" }}>
          <Title order={2} style={{ marginBottom: "10px" }}>
            {product.name}
          </Title>
          <Text
            size="lg"
            weight={700}
            color="blue"
            style={{ marginBottom: "15px" }}
          >
            ${product.price.toFixed(2)}
          </Text>
          <Group spacing="xs" style={{ marginBottom: "15px" }}>
            <Badge color="blue" variant="light">
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </Badge>
            <Badge color="green" variant="light">
              {product.theme.charAt(0).toUpperCase() +
                product.theme.slice(1)}
            </Badge>
          </Group>
          <Text size="md" style={{ marginBottom: "20px" }}>
            {product.description}
          </Text>
          <Text size="sm" color={product.stock > 0 ? "green" : "red"}>
            {product.stock > 0
              ? `Stokta: ${product.stock}`
              : "Stokta Yok"}
          </Text>

          {/* Miktar Seçici */}
          {product.stock > 0 && (
            <Group style={{ marginTop: "20px" }}>
              <Text>Miktar:</Text>
              <NumberInput
                value={quantity}
                onChange={(val) => {
                  if (val === "") {
                    setQuantity("");
                  } else {
                    setQuantity(Math.min(Math.max(val, 1), product.stock));
                  }
                }}
                min={1}
                max={product.stock}
                style={{ width: 100 }}
                hideControls={false} // Kullanıcı deneyimi için kontrolleri göster
              
              />
            </Group>
          )}

          {/* Sepete Ekle Butonu */}
          {product.stock > 0 && (
            <Button
              variant="filled"
              color="blue"
              style={{ marginTop: "20px" }}
              onClick={handleAddToCart}
            >
              Sepete Ekle
            </Button>
          )}
        </div>
      </Group>

      {/* Mağazaya Geri Dön Butonu */}
      <Group position="center" style={{ marginTop: "30px" }}>
        <Link to="/shop">
          <Button variant="outline" color="blue">
            Mağazaya Geri Dön
          </Button>
        </Link>
      </Group>
    </Container>
  );
}

export default ProductDetail;
