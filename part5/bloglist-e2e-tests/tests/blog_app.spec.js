const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Dummy User',
        username: 'duser',
        password: 'opensesame'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'login' })
    await expect(loginButton).toBeVisible()
  })

  test('User can log in', async ({ page }) => {
    await page.getByLabel('username ').fill('duser')
    await page.getByLabel('password ').fill('opensesame')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Dummy User logged in')).toBeVisible()
  })

  test('Invalid login credentials shows error', async ({ page }) => {
    await page.getByLabel('username ').fill('duser')
    await page.getByLabel('password ').fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('invalid username or password')).toBeVisible()
    await expect(page.getByText('Dummy User logged in')).not.toBeVisible()
  })
})