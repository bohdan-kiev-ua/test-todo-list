import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TasksList from './TasksList';
import useTodoListStore from '../../store/todoListStore';
jest.mock('../../store/todoListStore');

const mockedUseTodoListStore = useTodoListStore as jest.MockedFunction<typeof useTodoListStore>;

describe('TasksList component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders Controls component', () => {
        mockedUseTodoListStore.mockReturnValue({ data: [] });
        render(<TasksList />);

        expect(screen.getByText('Add Task')).toBeInTheDocument();
    });

    test('renders list of tasks', () => {
        const tasks = [
            { id: 1, title: 'Test Task 1', description: 'Description 1', completed: false },
            { id: 2, title: 'Test Task 2', description: 'Description 2', completed: false },
        ];

        mockedUseTodoListStore.mockReturnValue({ data: tasks });
        render(<TasksList />);

        expect(screen.getByText('Test Task 1')).toBeInTheDocument();
        expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    });
});
