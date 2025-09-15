import { test, expect } from '@playwright/test';

test.describe('Splashtastic Content Updates', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.E2E_BASE_URL || 'http://localhost:3000');
  });

  test('baseline visible sections exist', async ({ page }) => {
    await expect(page.getByText(/Packages|Starter Party|Deluxe Party|Premium Party/i)).toBeVisible();
    await expect(page.getByText(/Add-Ons|Policies|Guidelines|Contact/i)).toBeVisible();
    await expect(page.getByText(/Service Area|Coverage/i)).toBeVisible();
  });

  test('Safety Guidelines header standardized', async ({ page }) => {
    await page.goto('/policies');
    await expect(page.getByText(/Safety Guidelines & Requirements \(30 × 30\)/)).toBeVisible();
    await expect(page.getByText(/Safety Equipment/i)).toHaveCount(0);
  });

  test('no Safety Equipment sections remain', async ({ page }) => {
    const se = await page.getByText(/Safety Equipment/i).count();
    expect(se).toBe(0);
  });

  test('Starter Party copy', async ({ page }) => {
    await page.goto('/packages');
    const starter = page.getByRole('region', { name: /Starter Party/i });
    await expect(starter.getByText(/30 guests/i)).toBeVisible();
    await expect(starter.getByText(/Bubble Machine included/i)).toBeVisible();
    await expect(starter.getByText(/Safety Equipment/i)).toHaveCount(0);
  });

  test('Deluxe Party copy', async ({ page }) => {
    await page.goto('/packages');
    const deluxe = page.getByRole('region', { name: /Deluxe Party/i });
    await expect(deluxe).toBeVisible();
    await expect(deluxe.getByText(/30 guests/i)).toBeVisible();
    await expect(deluxe.getByText(/Bubble Machine included/i)).toBeVisible();
  });

  test('Premium Party price and details', async ({ page }) => {
    await page.goto('/packages');
    const premium = page.getByRole('region', { name: /Premium Party/i });
    await expect(premium.getByText(/\$699\b/)).toBeVisible();
    await expect(premium.getByText(/30 guests/i)).toBeVisible();
    await expect(premium.getByText(/Bubble Machine included/i)).toBeVisible();
  });

  test('Liability Waiver removed', async ({ page }) => {
    await page.goto('/policies');
    expect(await page.getByText(/Liability Waiver/i).count()).toBe(0);
  });

  test('Glow/Neon Foam Upgrade copy', async ({ page }) => {
    await page.goto('/add-ons');
    const glow = page.getByText(/Glow\/Neon Foam Upgrade/i);
    await expect(glow).toBeVisible();
    await expect(page.getByText(/nean/i)).toHaveCount(0);
  });

  test('footer contact info updated', async ({ page }) => {
    await expect(page.getByText(/splashtasticfoamparties@gmail\.com/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /splashtasticfoamparties\.com/i })).toBeVisible();
  });

  test('Add-Ons cleaned and extended', async ({ page }) => {
    await page.goto('/add-ons');
    await expect(page.getByText(/Save when you bundle!/i)).toHaveCount(0);
    // Either single clarified item:
    const single = await page.getByText(/Premium Experience \(Ultimate Party Included\)/i).count();
    const split = await page.getByText(/Premium Experience$/i).count() > 0 && await page.getByText(/Ultimate Party$/i).count() > 0;
    expect(single > 0 || split).toBeTruthy();
    await expect(page.getByText(/Extra Foam Cannons/i)).toBeVisible();
  });

  test('Travel charges copy present', async ({ page }) => {
    await page.goto('/service-area');
    await expect(page.getByText(/Travel Fees:/i)).toBeVisible();
    await expect(page.getByText(/\$50 higher|charge mileage/i)).toBeVisible();
  });

  test('Quick Coverage Check removed', async ({ page }) => {
    await page.goto('/service-area');
    expect(await page.getByText(/Quick Coverage Check/i).count()).toBe(0);
  });

  test('no known typos remain', async ({ page }) => {
    const pageText = await page.textContent('body');
    const forbidden = [
      /Deluxe\s+Patty/i, /Premium\s+Patty/i, /Jafety/i, /\bnean\b/i,
      /Some\s*whete/i, /porties/i, /\bsuse\b/i, /we\s*ase/i,
      /suriounding/i, /\bOus\b/i, /30x30|30 x 30|30×30/
    ];
    forbidden.forEach(rx => expect(rx.test(pageText || '')).toBeFalsy());
    // final required form must appear:
    expect(/30 × 30/.test(pageText || '')).toBeTruthy();
  });

  test('key sections snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('home-hero.png');
    await page.getByText(/Packages/i).scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot('packages.png');
    await page.getByText(/Add-Ons/i).scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot('addons.png');
    await page.getByText(/Policies|Guidelines/i).scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot('policies.png');
    await page.getByText(/Contact/i).scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot('footer.png');
  });
});
