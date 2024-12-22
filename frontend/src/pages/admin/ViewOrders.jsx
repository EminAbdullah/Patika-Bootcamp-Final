import React, { useEffect, useState } from 'react';
import { Table, Title, Alert, Loader, Badge, List, ScrollArea, Paper } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import axios from 'axios';

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Kullanıcı kimlik doğrulanmamış.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://host.docker.internal:3000/api/order', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('API Yanıtı:', response.data);

        if (response.data.orders && Array.isArray(response.data.orders)) {
          setOrders(response.data.orders);
        } else if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          setError('Beklenmeyen yanıt yapısı.');
        }
      } catch (err) {
        console.error(err);
        setError('Siparişler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'CREATED':
        return 'gray';
      case 'PAID':
        return 'blue';
      case 'INVOICED':
        return 'green';
      default:
        return 'gray';
    }
  };

  const rows = orders.map((order) => (
    <tr key={order._id}>
      <td>{order._id}</td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        <strong>{order.userId?.name}</strong>
        <br />
        <span style={{ color: 'gray', fontSize: '0.9em' }}>{order.userId?.email}</span>
      </td>
      <td>
        {order.items?.length > 0 ? (
          <List
            type="ordered"
            size="sm"
            spacing="xs"
            styles={{
              item: {
                marginBottom: '4px', // Her ürün arasındaki boşluk
              },
            }}
          >
            {order.items.map((item) => (
              <List.Item
                key={`${order._id}-${item.productId._id}`}
                style={{
                  padding: '4px 0', // Ürün başlıklarıyla içerik arasındaki boşluk
                  fontSize: '0.9em', // Daha küçük font boyutu
                }}
              >
                <strong>{item.productId.name}</strong> x {item.quantity}
              </List.Item>
            ))}
          </List>
        ) : (
          'Ürün bulunamadı.'
        )}
      </td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        {order.items?.reduce((acc, item) => acc + item.quantity, 0)}
      </td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        {order.totalAmount.toLocaleString()} $
      </td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        <Badge color={getStatusColor(order.status)} variant="light">
          {order.status}
        </Badge>
      </td>
    </tr>
  ));

  return (
    <div>
      <Title order={2} mb="md">Siparişler</Title>
      {error && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Hata"
          color="red"
          withCloseButton
          onClose={() => setError('')}
          mb="md"
        >
          {error}
        </Alert>
      )}
      {loading ? (
        <Loader size="lg" variant="dots" />
      ) : (
        <Paper shadow="sm" p="md" withBorder>
          <ScrollArea>
            <Table
              highlightOnHover
              verticalSpacing="sm"
              striped
              fontSize="md"
              sx={{
                borderCollapse: 'collapse',
                border: '1px solid #dee2e6',
                'th, td': {
                  border: '1px solid #dee2e6',
                  padding: '8px',
                  textAlign: 'left',
                  verticalAlign: 'middle',
                },
                'th': {
                  backgroundColor: '#f8f9fa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                },
                'tbody tr:hover': {
                  backgroundColor: '#f1f3f5',
                },
              }}
            >
              <thead>
                <tr >
                  <th>ID</th>
                  <th>Müşteri</th>
                  <th>Ürünler</th>
                  <th>Toplam Miktar</th>
                  <th>Toplam Tutar</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? rows : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center' }}>Sipariş bulunamadı.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </ScrollArea>
        </Paper>
      )}
    </div>
  );
}

export default ViewOrders;
