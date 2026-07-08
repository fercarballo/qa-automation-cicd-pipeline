import { z } from 'zod';

/**
 * Contratos (schemas de Zod) de la API de reservas. Mínimos, lo necesario para
 * validar las respuestas de los tests de API que orquesta el pipeline.
 */

export const AuthTokenSchema = z.object({ token: z.string() });
export const BadCredentialsSchema = z.object({ reason: z.string() });

export const BookingSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  totalprice: z.number(),
  depositpaid: z.boolean(),
  bookingdates: z.object({ checkin: z.string(), checkout: z.string() }),
  additionalneeds: z.string().optional(),
});

export const CreateBookingResponseSchema = z.object({
  bookingid: z.number(),
  booking: BookingSchema,
});

export type Booking = z.infer<typeof BookingSchema>;
