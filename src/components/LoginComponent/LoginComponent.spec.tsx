import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginComponent from './LoginComponent';
import useAuthStore from '../../store/authStore';

jest.mock('../../store/authStore');

const mockedUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;

describe('LoginComponent', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the component', () => {
        mockedUseAuthStore.mockReturnValue({ login: jest.fn() });
        render(<LoginComponent />);

        expect(screen.getByText('Todo List')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('calls login function when button is clicked', () => {
        const mockLogin = jest.fn();
        mockedUseAuthStore.mockReturnValue({ login: mockLogin });

        render(<LoginComponent />);

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(mockLogin).toHaveBeenCalledTimes(1);
    });
});
