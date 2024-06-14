import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import useAuthStore from '../../store/authStore';

jest.mock('../../store/authStore');

const mockedUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;

describe('Header component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the header with Logo', () => {
        mockedUseAuthStore.mockReturnValue({ isAuth: false, login: jest.fn(), logout: jest.fn() });
        render(<Header />);
        expect(screen.getByText('Todo List')).toBeInTheDocument();
    });

    test('renders login button when not authenticated', () => {
        mockedUseAuthStore.mockReturnValue({ isAuth: false, login: jest.fn(), logout: jest.fn() });
        render(<Header />);
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('renders logout button when authenticated', () => {
        mockedUseAuthStore.mockReturnValue({ isAuth: true, login: jest.fn(), logout: jest.fn() });
        render(<Header />);
        expect(screen.getByText('LogOut')).toBeInTheDocument();
    });

    test('calls login function when login button is clicked', () => {
        const mockLogin = jest.fn();
        mockedUseAuthStore.mockReturnValue({ isAuth: false, login: mockLogin, logout: jest.fn() });
        render(<Header />);
        fireEvent.click(screen.getByText('Login'));
        expect(mockLogin).toHaveBeenCalledTimes(1);
    });

    test('calls logout function when logout button is clicked', () => {
        const mockLogout = jest.fn();
        mockedUseAuthStore.mockReturnValue({ isAuth: true, login: jest.fn(), logout: mockLogout });
        render(<Header />);
        fireEvent.click(screen.getByText('LogOut'));
        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});
