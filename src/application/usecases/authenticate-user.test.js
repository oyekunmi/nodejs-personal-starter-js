/*global jest, */
/*eslint no-undef: "error"*/

const bcrypt = require('bcrypt');
const { describe, it, expect, beforeEach } = require('@jest/globals');
const usecase = require('./authenticate-user');
const UserEntity = require('../../domain/entities/user-entity');

describe('authenticate-user', () => {
    let logger;
    let repositories;

    beforeEach(() => {
        logger = {
            info: jest.fn(),
            error: jest.fn(),
        };

        repositories = {
            user: {
                getUserByEmail: jest.fn(),
            },
        };
    });

    it('should authenticate a user with valid credentials', async () => {
        const email = 'testuser@testuser.com';
        const password = 'testpassword';
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserEntity({
            id: 1,
            name: 'Test User',
            email,
            password: hashedPassword,
        });

        repositories.user.getUserByEmail.mockResolvedValue(user);

        const result = await usecase(logger, repositories)({ email, password });

        expect(result).toEqual(new UserEntity({
            email: user.email,
            id: user.id,
            name: user.name,
            password: undefined,
        }));
        expect(logger.info).toHaveBeenCalledWith('user authenticated');
    });

    it('should not authenticate a user with invalid credentials', async () => {
        const email = 'testuser';
        const password = 'testpassword';
        const invalidPassword = 'invalidpassword';

        const user = new UserEntity({
            id: 1,
            name: 'Test User',
            email,
            password: await bcrypt.hash(password, 10)
        });
        repositories.user.getUserByEmail.mockResolvedValue(user);

        const result = await usecase(logger, repositories)({ email, password: invalidPassword });

        expect(result).toEqual(new Error('Invalid username or password'));
        expect(logger.error).toHaveBeenCalledWith('Invalid username or password');
    });

    it('should bubble database errors during authentication', async () => {
        const username = 'testuser';
        const password = 'testpassword';

        repositories.user.getUserByEmail.mockRejectedValue(new Error('Database error'));

        await expect(usecase(logger, repositories)(username, password)).rejects.toThrow('Database error');
        // expect(logger.error).toHaveBeenCalledWith('Error during authentication: Database error');
    });
});