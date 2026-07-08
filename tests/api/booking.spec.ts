import { test, expect } from '@fixtures/fixtures';
import { CreateBookingResponseSchema } from '@api/schemas';

test.describe('API · Reservas', () => {
  const payload = {
    firstname: 'Fernando',
    lastname: 'Carballo',
    totalprice: 150,
    depositpaid: true,
    bookingdates: { checkin: '2026-08-01', checkout: '2026-08-10' },
    additionalneeds: 'Breakfast',
  };

  test('POST /booking crea una reserva y respeta el contrato @smoke @regression', async ({
    bookingClient,
  }) => {
    const res = await bookingClient.create(payload);
    expect(res.status()).toBe(200);
    const body = CreateBookingResponseSchema.parse(await res.json());
    expect(body.bookingid).toBeGreaterThan(0);
    expect(body.booking).toEqual(payload);
  });

  test('GET /booking/{id} inexistente devuelve 404 @regression', async ({ bookingClient }) => {
    const res = await bookingClient.getById(99_999_999);
    expect(res.status()).toBe(404);
  });
});
