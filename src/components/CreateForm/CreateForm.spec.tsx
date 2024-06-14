import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateForm from './CreateForm';
import useTodoListStore from '../../store/todoListStore';
import { useRouter } from 'next/navigation';
import { jest } from '@jest/globals';

jest.mock('../../store/todoListStore');
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

const mockedUseTodoListStore = useTodoListStore as jest.MockedFunction<typeof useTodoListStore>;
const mockedUseRouter = useRouter as jest.Mock;

describe('CreateForm component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders form with inputs and submit button', () => {
        mockedUseTodoListStore.mockReturnValue({ create: jest.fn() });
        mockedUseRouter.mockReturnValue({ replace: jest.fn(), back: jest.fn() });

        render(<CreateForm />);

        expect(screen.getByLabelText('Title')).toBeInTheDocument();
        expect(screen.getByLabelText('Description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    });

    test('shows validation errors when fields are empty', async () => {
        mockedUseTodoListStore.mockReturnValue({ create: jest.fn() });
        mockedUseRouter.mockReturnValue({ replace: jest.fn(), back: jest.fn() });

        render(<CreateForm />);

        fireEvent.click(screen.getByRole('button', { name: /create/i }));

        await waitFor(() => {
            expect(screen.getByText(/Title is too short/i)).toBeInTheDocument();
        });
    });

    test('calls create function and redirects on submit', async () => {
        const mockCreate = jest.fn();
        const mockReplace = jest.fn();
        mockedUseTodoListStore.mockReturnValue({ create: mockCreate });
        mockedUseRouter.mockReturnValue({ replace: mockReplace, back: jest.fn() });

        render(<CreateForm />);

        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Title' } });
        fireEvent.change(screen.getByLabelText('Description'), {
            target: { value: 'Test Description' },
        });

        fireEvent.click(screen.getByRole('button', { name: /create/i }));

        await waitFor(() => {
            expect(mockCreate).toHaveBeenCalledWith({
                title: 'Test Title',
                description: 'Test Description',
                completed: false,
            });
            expect(mockReplace).toHaveBeenCalledWith('/');
        });
    });

    test('navigates back when back button is clicked', () => {
        const mockBack = jest.fn();
        mockedUseTodoListStore.mockReturnValue({ create: jest.fn() });
        mockedUseRouter.mockReturnValue({ replace: jest.fn(), back: mockBack });

        render(<CreateForm />);

        fireEvent.click(screen.getByRole('button', { name: /back/i }));

        expect(mockBack).toHaveBeenCalledTimes(1);
    });
});
