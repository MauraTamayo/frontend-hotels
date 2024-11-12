// pages/reservations.js
"use client"
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Divider, Button } from '@mui/material';
import { useRouter } from 'next/navigation'
import { listReservations } from '@/apiFunctions/bookingServices'; // Asegúrate de importar la función correctamente
import Header from '@/components/Header';

const Booking = () => {
  const [reservations, setReservations] = useState([]);
  const userId = 4; // Número quemado para filtrar por usuario específico
  const router = useRouter();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const allReservations = await listReservations();
        const userReservations = allReservations.filter(reservation => reservation.usuario === userId);
        setReservations(userReservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = (index) => {
    const updatedReservations = [...reservations];
    updatedReservations.splice(index, 1);
    setReservations(updatedReservations);
    // Aquí podrías actualizar tu backend para reflejar la eliminación si es necesario
  };

  const handlePay = (reservation) => { router.push(`/payment?reservation=${encodeURIComponent(JSON.stringify(reservation))}`); };

  if (!reservations.length) {
    return <Typography variant="h6">No hay reservas disponibles</Typography>;
  }

  return (
    <>
      <Header/>
      <Box sx={{ margin: 'auto', padding: 2, background: "#070F1B" }}>
      <Typography variant="h4" gutterBottom>
        Lista de Reservas
      </Typography>
      {reservations.map((reservation, index) => (
        <Card key={index} sx={{ display: 'flex', flexDirection: 'column', mb: 4 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">Habitación: {reservation.room.nombre}</Typography>
            <Typography variant="body2" color="text.secondary">Precio por noche: {reservation.room.precio_por_noche}</Typography>
            <Typography variant="body2" color="text.secondary">Cantidad de dias: {reservation.dias_reservados}</Typography>
            <Typography variant="body2" color="text.secondary">Número de habitaciones: {reservation.room.numero_de_camas}</Typography>
            <Typography variant="body2" color="text.secondary">Estado: {reservation.pagado ? 'Pagada' : 'Pendiente'}</Typography>
            {reservation.pagado && (
              <>
                <Typography variant="body2" color="text.secondary">Fecha de pago: {reservation.payment.fecha}</Typography>
                <Typography variant="body2" color="text.secondary">Monto pagado: {reservation.payment.monto}</Typography>
                <Typography variant="body2" color="text.secondary">ID de transacción: {reservation.payment.id_transaccion}</Typography>
              </>
            )}
            <Divider sx={{ my: 2 }} />
            {!reservation.pagado && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary" onClick={() => handlePay(reservation)}>
                  Pagar
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(index)}>
                  Eliminar
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
      
    </>
   
  );
};

export default Booking;