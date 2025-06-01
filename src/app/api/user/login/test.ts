import { describe, expect, it } from '@jest/globals';
import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import { POST as loginHandler } from './route';
import User from '@/models/model.users';
import bcrypt from 'bcrypt';

const MONGO_LOCAL =
  'mongodb://root:password@localhost:27017/kino_test_db?authSource=admin';

//SUPER IMORTANT!
jest.mock('@/lib/mongodb', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined),
}));

describe('User API Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_LOCAL);
  });

  afterEach(async () => {
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.collections();
      for (const collection of collections) {
        await collection.deleteMany({});
      }
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('POST /api/user/login', () => {
    const testUserEmail = 'user@mail.com';
    const testUserPassword = 'password';

    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash(testUserPassword, 10);
      await User.create({
        email: testUserEmail,
        hashedPassword: hashedPassword,
        name: 'TestUser',
        role: 'user',
      });
    });

    it('should return 400 if password is not valid', async () => {
      const mockRequest = new NextRequest('http://localhost/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
          email: testUserEmail,
          password: 'wrongpassword',
        }),
      });

      const response = await loginHandler(mockRequest);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.message).toBe('Password is not valid');
    });

    it('should return 400 if email or password are not provided', async () => {
      const mockRequest = new NextRequest('http://localhost/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
          email: testUserEmail,
        }),
      });

      const response = await loginHandler(mockRequest);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.message).toBe('Email, and password are required');
    });

    it('should return 400 for invalid email format', async () => {
      const mockRequest = new NextRequest('http://localhost/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'invalid-email',
          password: testUserPassword,
        }),
      });

      const response = await loginHandler(mockRequest);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.message).toBe('Invalid email format');
    });

    it('should return 400 if password is too short', async () => {
      const mockRequest = new NextRequest('http://localhost/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
          email: testUserEmail,
          password: '123',
        }),
      });

      const response = await loginHandler(mockRequest);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.message).toBe('Password should be longer than 6 characters');
    });
  });
});
