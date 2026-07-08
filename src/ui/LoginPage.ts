import { Locator, Page } from '@playwright/test';

/**
 * Page Object de login (SauceDemo). Versión mínima: este proyecto se enfoca en
 * el CI/CD, no en re-enseñar POM (eso está en el Proyecto 1), así que traemos
 * solo lo necesario para tener una suite de UI real que el pipeline orqueste.
 */
export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly error: Locator;

  constructor(private readonly page: Page) {
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.error = page.locator('[data-test="error"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  errorLocator(): Locator {
    return this.error;
  }
}
