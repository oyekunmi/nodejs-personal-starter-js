/*global jest, */
/*eslint no-undef: "error"*/

const bcrypt = require('bcrypt');
const { describe, it, expect, beforeEach } = require('@jest/globals');

const registerUserUsecase = require('./register-user');
const UserEntity = require('../../domain/entities/user-entity');

describe('registerUser usecase', () => {
    let mockLogger, mockRepositories;

    beforeEach(() => {
        mockLogger = { info: jest.fn() };
        mockRepositories = {
            user: {
                getUserByEmail: jest.fn(),
                createUser: jest.fn()
            },
        };
    });

    it('should register a new user if email does not exist', async () => {
        const newUser = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
        mockRepositories.user.getUserByEmail.mockResolvedValue(null);
        mockRepositories.user.createUser.mockImplementation(user => Promise.resolve({ ...user, id: 1 }));
        bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

        const registerUser = registerUserUsecase(mockLogger, mockRepositories);
        const result = await registerUser(newUser);

        expect(mockRepositories.user.getUserByEmail).toHaveBeenCalledWith(newUser.email);
        expect(bcrypt.hash).toHaveBeenCalledWith(newUser.password, 10);
        expect(mockRepositories.user.createUser).toHaveBeenCalledWith(expect.any(UserEntity));
        expect(result).toHaveProperty('id');
        expect(result.password).toBeUndefined();
        expect(mockLogger.info).toHaveBeenCalledWith('User registered');
    });

    it('should return an error if user already exists', async () => {
        const existingUser = { name: 'Jane Doe', email: 'jane@example.com', password: 'securePassword' };
        mockRepositories.user.getUserByEmail.mockResolvedValue(existingUser);

        const registerUser = registerUserUsecase(mockLogger, mockRepositories);
        const result = await registerUser(existingUser);

        expect(mockRepositories.user.getUserByEmail).toHaveBeenCalledWith(existingUser.email);
        expect(result).toBeInstanceOf(Error);
        expect(result.message).toEqual('User already exists');
    });


});