import React, { useContext } from 'react'
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {Container, Stepper, rem,Button,Group ,Loader} from '@mantine/core';
import wsClientInstance from '../utils/wsClient';
import { UserContext } from '../context/UserContext';


function OrderProgress() {
  const { fetchCart} = useContext(UserContext);
  const [active, setActive] = useState(1);
  const [orderId,setOrderId]= useState(null);
  const navigate = useNavigate();
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));

  wsClientInstance.addListener('exampleListener', (message) => {
  
    console.log('Gelen mesaj:', message);
    message = JSON.parse(message);
    console.log("girdiiii",message.type)
    if (message.type=="payment_result" && message.data.paymentResult.isSucces) {
   
      nextStep();
    }
    if (message.type=="billing_result"&& message.data.result.isSucces) {
      nextStep();
      setOrderId(message.data.result.orderId);

fetchCart();
    }
  });

  return (
    <>
    <Container pt={30}>
      <Stepper active={active} onStepClick={setActive} >
        <Stepper.Step label="Sipariş" description="Sipariş alınıyor" allowStepSelect={false}>
        <Loader color="blue" />
        </Stepper.Step>
        <Stepper.Step label="Ödeme" description="Ödeme yapılıyor" allowStepSelect={false}>
        <Loader color="blue" />
        </Stepper.Step>
        <Stepper.Step label="Fatura" description="Fatura Oluşturuluyor" allowStepSelect={false}>
        <Loader color="blue" />
        </Stepper.Step>
        <Stepper.Completed>
        Sipariş numaranız:{orderId}
        </Stepper.Completed>
      </Stepper>
  
      <Group justify="center" mt="xl">
        <Button variant="default" onClick={() => navigate("/")}>anasayfaya dön</Button>
     
      </Group>
      </Container>
    </>
  );
}



export default OrderProgress