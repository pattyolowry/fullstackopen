const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createBlog, loginWith } = require('./helper')

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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'duser', 'opensesame')
    })

    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'Testing Blog', 'John Doe', 'http://testingblog.com')
        await expect(page.locator('.blog').filter({ hasText: 'Testing Blog' })).toBeVisible()
    })
    })
})