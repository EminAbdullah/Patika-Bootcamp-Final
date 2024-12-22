import React, { useContext } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Table,
  Image,
  Group,
  Stack,
  NumberInput,
  Loader,
  Center,
} from "@mantine/core";
import { IconTrash, IconPlus, IconMinus } from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../context/UserContext"; // Import UserContext
import wsClientInstance from "../utils/wsClient";

function Basket() {
  const {
    cart,
    cartLoading,
    cartError,
    addToCart,
    updateCartItem,
    removeFromCart,
    user
  } = useContext(UserContext);
  const navigate = useNavigate();

  const checkout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Optionally, navigate to login
      navigate('/signin');
      return;
    }

    try {

      wsClientInstance.connect(user._id);
    

       axios.post(
        "http://host.docker.internal:3000/api/order/create",
        {
          items: cart.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          totalAmount: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
     

      
      navigate('/basket/order');


    } catch (error) {
      console.error("Error creating order:", error);
 
    }
  };

  if (cartLoading) {
    return (
      <Container size="md" py="xl">
        <Center>
          <Loader />
        </Center>
      </Container>
    );
  }

  if (cartError) {
    return (
      <Container size="md" py="xl">
        <Title order={2} mb="lg">
          YOUR <Text component="span" weight={700}>CART</Text>
        </Title>
        <Text color="red">{cartError}</Text>
      </Container>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Container size="md" py="xl">
        <Title order={2} mb="lg">
          YOUR <Text component="span" weight={700}>CART</Text>
        </Title>
        <Text>Sepetiniz boş.</Text>
      </Container>
    );
  }

  const cartItems = cart.items;
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.productId?.price || 0) * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="lg">
        YOUR <Text component="span" weight={700}>CART</Text>
      </Title>

      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Ürün</th>
            <th>Adı</th>
            <th>Fiyat</th>
            <th>Miktar</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId._id}>
              <td>
                <Image
                  src={`http://host.docker.internal:3000${item.productId.images[0]}`}
                  width={70}
                  height={70}
                  radius="md"
                  style={{ objectFit: "contain" }}
                  alt={item.productId.name}
                />
              </td>
              <td>{item.productId.name}</td>
              <td>{item.productId.price} $</td>
              <td>
                <Group spacing="xs">
                  <Button
                    variant="subtle"
                    color="blue"
                    size="xs"
                    onClick={() =>
                      updateCartItem(item.productId._id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    <IconMinus size={16} />
                  </Button>
                  <NumberInput
                    value={item.quantity}
                    onChange={(val) => {
                      if (val !== undefined) {
                        updateCartItem(item.productId._id, val);
                      }
                    }}
                    min={1}
                    style={{ width: 60 }}
                  />
                  <Button
                    variant="subtle"
                    color="blue"
                    size="xs"
                    onClick={() =>
                      updateCartItem(item.productId._id, item.quantity + 1)
                    }
                  >
                    <IconPlus size={16} />
                  </Button>
                </Group>
              </td>
              <td>
                <Button
                  onClick={() => removeFromCart(item.productId._id)}
                  variant="subtle"
                  color="red"
                >
                  <IconTrash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Stack mt="xl" spacing="xs" align="flex-end">
        <Text size="lg">Subtotal: ${subtotal.toFixed(2)}</Text>
        <Title order={4}>Total: ${total.toFixed(2)}</Title>
        <Button color="dark" radius="md" size="md" onClick={checkout}>
          PROCEED TO CHECKOUT
        </Button>
      </Stack>
    </Container>
  );
}

export default Basket;
