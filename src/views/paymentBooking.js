// // pages/payment.js
// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Card, CardContent, Divider, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
// import { useRouter } from 'next/router';
// import dayjs from 'dayjs';

// const Payment = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [reservation, setReservation] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState('');

//   useEffect(() => {
//     const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
//     const currentReservation = storedReservations.find(res => res.roomId === id);
//     setReservation(currentReservation);
//   }, [id]);

//   const handlePayment = () => {
//     if (paymentMethod === 'pse-bancolombia') {
//       const paymentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
//       const transactionId = Math.floor(10000000 + Math.random() * 90000000).toString(); // ID único de 8 dígitos

//       const updatedReservation = {
//         ...reservation,
//         isPaid: true,
//         paymentDate,
//         transactionId,
//         totalAmount: reservation.roomPrice * reservation.numberOfRooms,
//       };

//       const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
//       const updatedReservations = storedReservations.map(res => 
//         res.roomId === reservation.roomId ? updatedReservation : res
//       );

//       localStorage.setItem('reservations', JSON.stringify(updatedReservations));
//       setReservation(updatedReservation);
//       router.push('/booking');
      
      
//     }
//   };

//   // localStorage.clear();

//   if (!reservation) {
//     return <Typography variant="h6">No hay reservas disponibles</Typography>;
//   }

//   return (
//     <Box sx={{ margin: 'auto', padding: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Pago de Reserva
//       </Typography>
//       <Card sx={{ display: 'flex', flexDirection: 'column', mb: 4 }}>
//         <CardContent>
//           <Typography variant="h5" fontWeight="bold">Habitación: {reservation.roomName}</Typography>
//           <Typography variant="body2" color="text.secondary">Precio por noche: {reservation.roomPrice}</Typography>
//           <Typography variant="body2" color="text.secondary">Número de habitaciones: {reservation.numberOfRooms}</Typography>
//           <Typography variant="body2" color="text.secondary">Total: {reservation.roomPrice * reservation.numberOfRooms}</Typography>
//           <Divider sx={{ my: 2 }} />
//           <Typography variant="body1" gutterBottom>Método de Pago</Typography>
//           <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
//             <FormControlLabel value="credit-card" control={<Radio />} label="Tarjeta de Crédito/Débito" />
//             <FormControlLabel value="pse-bancolombia" control={<Radio />} label="PSE con Bancolombia" />
//           </RadioGroup>
//           <Button 
//             variant="contained" 
//             color="primary" 
//             onClick={handlePayment} 
//             disabled={!paymentMethod}
//             sx={{ mt: 2 }}
//           >
//             Pagar
//           </Button>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default Payment;


// pages/payment.js
// pages/payment.js
"use client"
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Divider, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import Image from 'next/image';
import Header from '@/components/Header';


const Payment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reservationParam = searchParams.get('reservation');
  const [reservation, setReservation] = useState(reservationParam ? JSON.parse(reservationParam) : null);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    if (!reservation && reservationParam) {
      setReservation(JSON.parse(reservationParam));
    }
  }, [reservationParam]);

  const handlePayment = () => {
    const paymentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const transactionId = Math.floor(10000000 + Math.random() * 90000000).toString(); // ID único de 8 dígitos

    const updatedReservation = {
      ...reservation,
      isPaid: true,
      paymentDate,
      transactionId,
      totalAmount: reservation.room.precio_por_noche * reservation.dias_reservados,
    };

    const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const updatedReservations = storedReservations.map(res => 
      res.id === reservation.id ? updatedReservation : res
    );

    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
    setReservation(updatedReservation);
    router.push('/booking');
  };

  if (!reservation) {
    return <Typography variant="h6">No hay reservas disponibles</Typography>;
  }

  return (
    <>
      <Header/>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4, background: "#070F1B"}}>
      {/* Información del Producto */}
      <Box sx={{ width: '40%', paddingRight: 4}}>
        <Card>
          <CardContent >
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, height:'58vh'}}>
            <Image
                src="/web.jpg"
                alt="Logo"
                layout="responsive"
                width={500}
                height={500}
                style={{ objectFit: 'cover', width: '58vh', height: '100%' }}
              />
            </Box>
            <Typography variant="h5" fontWeight="bold">
                {reservation.room.nombre}
            </Typography>
            <Typography variant="h4" color="primary" fontWeight="bold" sx={{ marginY: 2 }}>
            ${reservation.room.precio_por_noche * reservation.dias_reservados}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Numero de dias: {reservation.dias_reservados}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Precio por noche: ${reservation.room.precio_por_noche}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Número de habitaciones: {reservation.room.numero_de_camas}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Opciones de Pago */}
      <Box sx={{ width: '60%'}}>
        <Typography variant="h6" gutterBottom>
          Escoge un método de pago
        </Typography>
        <Card sx={{marginTop: '30px'}}>
          <CardContent>
            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <FormControlLabel
                value="Davivienda"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' , height:'11vh'}}>
                    <Image src="/davivi.jpg" alt="Tarjeta" width={40} height={40} />
                    <Typography sx={{ marginLeft: 2 }}>Desde tu cuenta Davivienda</Typography>
                  </Box>
                }
              />
              <Divider />
              <Divider />
              <FormControlLabel
                value="Daviplata"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' , height:'11vh'}}>
                    <Image src="/Icono_daviplata.png" alt="Tarjeta" width={40} height={40} />
                    <Typography sx={{ marginLeft: 2 }}>Desde tu billetera Daviplata</Typography>
                  </Box>
                }
              />
              <Divider />
              <Divider />
              <FormControlLabel
                value="PSE"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', height:'11vh'}}>
                    <Image src="/PSE_.png" alt="Tarjeta" width={40} height={40} border={1} />
                    <Typography sx={{ marginLeft: 2 }}>Desde la pasarela 3</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="3banco"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' , height:'11vh'}}>
                    <Image src="/favicon.ico" alt="Tarjeta" width={40} height={40} />
                    <Typography sx={{ marginLeft: 2 }}>Desde tu cuenta de Banco 3</Typography>
                  </Box>
                }
              />
              <Divider />
              <Divider />
              <FormControlLabel
                value="Bancolombia"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' , height:'11vh'}}>
                    <Image src="/favicon.ico" alt="Tarjeta" width={40} height={40} />
                    <Typography sx={{ marginLeft: 2 }}>Desde tu billetera uno</Typography>
                  </Box>
                }
              />
              <Divider />
              <Divider />
             
            </RadioGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePayment}
              disabled={!paymentMethod}
              sx={{ mt: 2, width: '100%' }}
            >
              Pagar
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
    </>
    
  );
};

export default Payment;


