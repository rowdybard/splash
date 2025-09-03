import '@testing-library/jest-dom'
import { beforeAll, afterAll, afterEach } from 'vitest'
import React from 'react'

// Make React available globally for JSX
global.React = React

// Mock environment variables for tests
beforeAll(() => {
  process.env.TIMEZONE = 'America/Detroit'
  process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'
})

afterEach(() => {
  // Reset any mocks after each test
  // vi.clearAllMocks?.() // Only available in test context
})
