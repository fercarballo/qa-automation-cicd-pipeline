import { test, expect } from '@fixtures/fixtures';
import { AuthTokenSchema, BadCredentialsSchema } from '@api/schemas';
import { ENV } from '@config/env';

test.describe('API · Autenticación', () => {
  test('credenciales válidas devuelven un token @smoke @regression', async ({ authClient }) => {
    const res = await authClient.createToken(ENV.apiUsername, ENV.apiPassword);
    expect(res.status()).toBe(200);
    const body = AuthTokenSchema.parse(await res.json());
    expect(body.token).not.toHaveLength(0);
  });

  test('credenciales inválidas devuelven "Bad credentials" @regression', async ({ authClient }) => {
    const res = await authClient.createToken(ENV.apiUsername, 'incorrecta');
    expect(res.status()).toBe(200); // rareza real de la API
    const body = BadCredentialsSchema.parse(await res.json());
    expect(body.reason).toBe('Bad credentials');
  });
});
