import { APIRequestContext, APIResponse } from '@playwright/test';
import { Booking } from '@api/schemas';

/**
 * API Clients de reservas. Combinamos Auth y Booking en un archivo para mantener
 * el proyecto compacto (el foco acá es el CI/CD, no la arquitectura de API, que
 * está desarrollada en el Proyecto 2).
 */

export class AuthClient {
  constructor(private readonly request: APIRequestContext) {}

  createToken(username: string, password: string): Promise<APIResponse> {
    return this.request.post('/auth', { data: { username, password } });
  }

  async getToken(username: string, password: string): Promise<string> {
    const res = await this.createToken(username, password);
    return (await res.json()).token;
  }
}

export class BookingClient {
  constructor(private readonly request: APIRequestContext) {}

  getById(id: number): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`);
  }

  create(payload: Booking): Promise<APIResponse> {
    return this.request.post('/booking', { data: payload });
  }
}
