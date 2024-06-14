import { create } from 'zustand';
import mockData from '../constants';
import { TODO } from '../types';

interface TodoListState {
    data: TODO[];
    create: (todoRequest: Omit<TODO, 'id'>) => void;
    remove: (todoId: number | string) => void;
    update: (todoId: number | string, todoRequest: Partial<TODO>) => void;
    clear: () => void;
}
const useTodoListStore = create<TodoListState>((set) => ({
    data: mockData,
    create: (todoRequest) => {
        set((state) => ({
            data: [
                {
                    id: new Date().getTime(),
                    ...todoRequest,
                },
                ...state.data,
            ],
        }));
    },
    remove: (todoId) => {
        set((state) => ({
            data: state.data.filter((item) => item.id !== todoId),
        }));
    },
    update: (todoId, todoRequest) => {
        set((state) => ({
            data: state.data.map((item) =>
                item.id === todoId
                    ? {
                          ...item,
                          ...todoRequest,
                      }
                    : item,
            ),
        }));
    },
    clear: () => {
        set(() => ({
            data: [],
        }));
    },
}));

export default useTodoListStore;
