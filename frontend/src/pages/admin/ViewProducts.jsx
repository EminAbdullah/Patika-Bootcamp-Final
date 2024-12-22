import React, { useEffect, useState } from 'react';
import {
  Button,
  Title,
  Alert,
  Modal,
  TextInput,
  Select,
  Stack,
  Textarea, // Textarea bileşenini ekleyin
  Image,
  Group,
  Loader,
  Card,
  ScrollArea,
  Flex,
  Text,
} from '@mantine/core';
import {
  IconTrash,
  IconEdit,
  IconCheck,
  IconAlertCircle,
} from '@tabler/icons-react';
import axios from 'axios';

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editStock, setEditStock] = useState('');
  const [editCategory, setEditCategory] = useState('none');
  const [editTheme, setEditTheme] = useState('none');

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://host.docker.internal:3000/api/products');
        console.log('API Response:', response.data);

        if (response.data.products && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else if (Array.isArray(response.data)) {
          setProducts(response.data);
          console.log(response.data);
        } else {
          throw new Error('Unexpected response structure.');
        }
        setError('');
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || 'An error occurred while fetching products.'
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    const token = localStorage.getItem('token'); // Retrieve the token

    try {
      await axios.delete(`http://host.docker.internal:3000/api/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in headers
        },
      });
      setProducts(products.filter((product) => product._id !== id));
      setSuccess('Product deleted successfully.');
      setError('');
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred while deleting the product.'
      );
      setSuccess('');
    }
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setCurrentProduct(product);
    setEditName(product.name);
    setEditDescription(product.description);
    setEditPrice(product.price);
    setEditStock(product.stock);
    setEditCategory(product.category || 'none');
    setEditTheme(product.theme || 'none');
    setIsModalOpen(true);
    setError('');
    setSuccess('');
  };

  // Update Product
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token'); 

      const updateData = {
        name: editName,
        description: editDescription,
        price: editPrice,
        stock: editStock,
        category: editCategory,
        theme: editTheme,
      };

      const response = await axios.put(
        `http://host.docker.internal:3000/api/products/${currentProduct._id}`,
        updateData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      alert("Product updated successfully!");
      setProducts(
        products.map((product) =>
          product._id === currentProduct._id ? response.data : product
        )
      );
      setSuccess('Product updated successfully.');
      setError('');
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        alert("Error: " + error.response.data.message);
      } else {
        alert("An error occurred.");
      }
      setError(
        error.response?.data?.message || 'An error occurred while updating the product.'
      );
      setSuccess('');
    }
  };

  // Validate Unique Keys
  const validateUniqueKeys = () => {
    const ids = products.map((product) => product._id);
    const uniqueIds = new Set(ids);
    if (uniqueIds.size !== ids.length) {
      console.warn('Some product IDs are not unique or not defined.');
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      validateUniqueKeys();
    }
  }, [products]);

  const productCards = products.map((product) => {
    const key = product._id || `${product.name}-${product.price}`;

    return (
      <Card key={key} shadow="sm" padding="lg" radius="md" withBorder style={{ minWidth: 250 }}>
        <Card.Section>
          {product.images && product.images[0] ? (
            <Image
              src={`http://host.docker.internal:3000${product.images[0]}`}
              alt={product.name}
              height={200} // Yüksekliği artırdık
              fit="contain" // fit="cover" yerine "contain" kullandık
             
            />
          ) : (
            <Image
              src="https://via.placeholder.com/200x160?text=No+Image" // Placeholder resim
              alt="No Image Available"
              height={200}
              fit="contain"
            />
          )}
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{product.name}</Text>
          <Text size="sm" color="dimmed">
            ${product.price.toLocaleString()}
          </Text>
        </Group>

        <Text size="sm" color="dimmed" style={{ height: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {product.description}
        </Text>

        <Group position="right" mt="md">
          <Button
            color="blue"
            variant="outline"
            size="xs"
            onClick={() => openEditModal(product)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <IconEdit size={16} style={{ marginRight: '4px' }} />
            Edit
          </Button>
          <Button
            color="red"
            variant="outline"
            size="xs"
            onClick={() => handleDelete(product._id)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <IconTrash size={16} style={{ marginRight: '4px' }} />
            Delete
          </Button>
        </Group>
      </Card>
    );
  });

  return (
    <div>
      <Title order={2} mb="md">
        Products
      </Title>
      {success && (
        <Alert
          icon={<IconCheck size={16} />}
          title="Success"
          color="green"
          onClose={() => setSuccess('')}
          mb="md"
        >
          {success}
        </Alert>
      )}
      {error && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Error"
          color="red"
          onClose={() => setError('')}
          mb="md"
        >
          {error}
        </Alert>
      )}
      {loading ? (
        <Group position="center" mt="xl">
          <Loader variant="dots" size="xl" />
        </Group>
      ) : (
        <ScrollArea type="auto" style={{ width: '100%' }}>
          <Flex wrap="wrap" gap="md">
            {productCards}
          </Flex>
        </ScrollArea>
      )}

      {/* Edit Product Modal */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Product"
        size="lg"
      >
        <Stack>
          <TextInput
            label="Product Name"
            value={editName}
            onChange={(e) => setEditName(e.currentTarget.value)}
            required
          />
          <Textarea // Textarea kullanıldı
            label="Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.currentTarget.value)}
            required
            minRows={4} // Minimum satır sayısı
          />
          <TextInput
            label="Price"
            type="number"
            value={editPrice}
            onChange={(e) => setEditPrice(e.currentTarget.value)}
            required
            min={0} // Negatif değerleri engellemek için
          />
          <TextInput
            label="Stock"
            type="number"
            value={editStock}
            onChange={(e) => setEditStock(e.currentTarget.value)}
            required
            min={0} // Negatif değerleri engellemek için
          />
          {/* Category Select */}
          <Select
            label="Category"
            value={editCategory}
            onChange={setEditCategory}
            data={[
              { value: 'none', label: 'None' },
              { value: 'figure', label: 'Figure' },
              { value: 'artprints', label: 'Art Prints' },
            ]}
            required
          />
          {/* Theme Select */}
          <Select
            label="Theme"
            value={editTheme}
            onChange={setEditTheme}
            data={[
              { value: 'none', label: 'None' },
              { value: 'anime', label: 'Anime' },
              { value: 'marvel', label: 'Marvel' },
              { value: 'dc', label: 'DC' },
              { value: 'star wars', label: 'Star Wars' }
            ]}
            required
          />

          <Group position="right" mt="md">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleUpdate} style={{ display: 'flex', alignItems: 'center' }}>
              <IconCheck size={16} style={{ marginRight: '4px' }} />
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}

export default ViewProducts;
