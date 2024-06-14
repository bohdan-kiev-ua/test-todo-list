import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskItem from './TaskItem';
import useTodoListStore from '../../store/todoListStore';
import { TODO } from '../../types';

jest.mock('../../store/todoListStore');

const mockedUseTodoListStore = useTodoListStore as jest.MockedFunction<typeof useTodoListStore>;

const task: TODO = {
    id: 1,
    title: 'Test Task',
    description: 'This is a test task',
    completed: false,
};

describe('TaskItem component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the task item', () => {
        mockedUseTodoListStore.mockReturnValue({ update: jest.fn() });
        render(<TaskItem task={task} />);

        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
        expect(screen.queryByText('This is a test task')).toBeInTheDocument();
    });

    test('toggles the description on click', () => {
        mockedUseTodoListStore.mockReturnValue({ update: jest.fn() });
        render(<TaskItem task={task} />);

        const taskItem = screen.getByText('Test Task');
        fireEvent.click(taskItem);

        expect(screen.getByText('This is a test task')).toBeInTheDocument();
        fireEvent.click(taskItem);
        expect(screen.queryByText('This is a test task')).toBeInTheDocument;
    });

    test('calls update function when checkbox is clicked', () => {
        const mockUpdate = jest.fn();
        mockedUseTodoListStore.mockReturnValue({ update: mockUpdate });

        render(<TaskItem task={task} />);

        const checkbox = screen.getByLabelText('Completed');
        fireEvent.click(checkbox);

        expect(mockUpdate).toHaveBeenCalledTimes(1);
        expect(mockUpdate).toHaveBeenCalledWith(task.id, {
            ...task,
            completed: true,
        });
    });
});
