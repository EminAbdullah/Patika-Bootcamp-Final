import React, { useState } from 'react';
import {
  Button,
  Container,
  Title,
  TextInput,
  Textarea,
  Select,
  FileInput,
  Group,
  Stack,
  Image,
  Card,
  Grid,
  Badge,
  Text,
  Notification,
} from '@mantine/core';
import { IconUpload, IconTrash, IconCheck, IconAlertTriangle } from '@tabler/icons-react';
import axios from 'axios';

function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('none');
  const [theme, setTheme] = useState('none');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageChange = (selectedFiles) => {
    if (selectedFiles) {
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      setError('Lütfen en az bir resim ekleyiniz.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('category', category);
    formData.append('theme', theme);

    images.forEach((image) => {
      formData.append('images', image);
    });

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://host.docker.internal:3000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('Ürün başarıyla eklendi!');
      setError('');
      // Formu sıfırlama
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setCategory('none');
      setTheme('none');
      setImages([]);
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.'
      );
      setSuccess('');
    }
  };

  return (
    <Container size="sm" my="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2} align="center" mb="md">
          Ürün Ekle
        </Title>

        {success && (
          <Notification
            icon={<IconCheck size={18} />}
            color="green"
            title="Başarılı!"
            onClose={() => setSuccess('')}
            mb="md"
          >
            {success}
          </Notification>
        )}
        {error && (
          <Notification
            icon={<IconAlertTriangle size={18} />}
            color="red"
            title="Hata!"
            onClose={() => setError('')}
            mb="md"
          >
            {error}
          </Notification>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing="md">
            <TextInput
              label="Ürün Adı"
              placeholder="Ürün adını giriniz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Textarea
              label="Açıklama"
              placeholder="Ürün açıklamasını giriniz"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              minRows={4}
            />

            <Grid gutter="md">
              <Grid.Col span={6}>
                <TextInput
                  label="Fiyat"
                  placeholder="Ürün fiyatını giriniz"
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Stok"
                  placeholder="Stok miktarını giriniz"
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </Grid.Col>
            </Grid>

            <Select
              label="Kategori"
              placeholder="Kategori seçiniz"
              data={[
                { value: 'none', label: 'Seçiniz' },
                { value: 'figure', label: 'Figure' },
                { value: 'artprints', label: 'Art Prints' },
              ]}
              value={category}
              onChange={setCategory}
              required
            />

            <Select
              label="Tema"
              placeholder="Tema seçiniz"
              data={[
                { value: 'none', label: 'Seçiniz' },
                { value: 'anime', label: 'Anime' },
                { value: 'marvel', label: 'Marvel' },
                { value: 'dc', label: 'DC' },
                { value: 'star wars', label: 'Star Wars' },
              ]}
              value={theme}
              onChange={setTheme}
              required
            />

            <FileInput
              label="Resimler"
              placeholder="Resim yükleyiniz"
              multiple
              accept="image/*"
              icon={<IconUpload size={14} />}
              value={images}
              onChange={handleImageChange}
              required
            />

            {images.length > 0 && (
              <Stack spacing="sm">
                <Text weight={500}>Seçilen Resimler:</Text>
                <Grid>
                  {images.map((img, index) => (
                    <Grid.Col span={4} key={index}>
                      <Card shadow="xs" padding="xs" radius="md" withBorder>
                        <Image
                          src={URL.createObjectURL(img)}
                          alt={img.name}
                          height={100}
                          fit="cover"
                          radius="md"
                        />
                        <Group position="apart" mt="sm">
                          <Text size="xs" truncate>
                            {img.name}
                          </Text>
                          <Button
                            variant="subtle"
                            color="red"
                            size="xs"
                            onClick={() => handleRemoveImage(index)}
                         
                          >
                            Sil
                          </Button>
                        </Group>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            )}

            <Button type="submit" fullWidth color="green" >
              Ürün Ekle
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}

export default AddProduct;
