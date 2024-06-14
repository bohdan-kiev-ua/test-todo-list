import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrivateRoute from './PrivateRoute';
import useAuthStore from '../../store/authStore';

jest.mock('../../store/authStore');
// eslint-disable-next-line react/display-name
jest.mock('../LoginComponent', () => () => <div>Mocked LoginComponent</div>);

const mockedUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;

describe('PrivateRoute component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders LoginComponent when not authenticated', () => {
        mockedUseAuthStore.mockReturnValue({ isAuth: false });
        render(
            <PrivateRoute>
                <div>Private Content</div>
            </PrivateRoute>,
        );

        expect(screen.getByText('Mocked LoginComponent')).toBeInTheDocument();
        expect(screen.queryByText('Private Content')).not.toBeInTheDocument();
    });

    test('renders children when authenticated', () => {
        mockedUseAuthStore.mockReturnValue({ isAuth: true });
        render(
            <PrivateRoute>
                <div>Private Content</div>
            </PrivateRoute>,
        );

        expect(screen.getByText('Private Content')).toBeInTheDocument();
        expect(screen.queryByText('Mocked LoginComponent')).not.toBeInTheDocument();
    });
});
