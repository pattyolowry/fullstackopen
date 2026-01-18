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

    describe('and several blogs exist', () => {
        beforeEach(async ({ page }) => {
            await createBlog(page, 'Testing Blog', 'John Doe', 'http://testingblog.com')
            await createBlog(page, 'Groundbreaking Observation', 'Jane Doe', 'http://gbo.com')
        })

        test('a blog can be liked', async ({ page }) => {
            const blog = page.locator('.blog').filter({ hasText: 'Testing Blog' })
            await blog.getByRole('button', { name: 'View' }).click()
            const likesBefore = await blog.getByTestId('likes-count').textContent()
            await blog.getByRole('button', { name: 'Like' }).click()
            await blog.getByText(`Likes ${Number(likesBefore) + 1}`).waitFor()
            const likesAfter = await blog.getByTestId('likes-count').textContent()
            expect(Number(likesAfter)).toBe(Number(likesBefore) + 1)
        })

        test('a blog can be deleted', async ({ page }) => {
            await page.pause()
            const blog = page.locator('.blog').filter({ hasText: 'Testing Blog' })
            await blog.getByRole('button', { name: 'View' }).click()
            page.once('dialog', async (dialog) => {
                expect(dialog.type()).toBe('confirm')
                await dialog.accept()
            })
            await blog.getByRole('button', { name: 'Remove' }).click()
            await blog.waitFor({ state: 'detached' })
        })
    })
    })
})