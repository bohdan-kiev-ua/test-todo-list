'use client';
import React from 'react';
import useTodoListStore from '../../store/todoListStore';
import Controls from '../Controls';
import { Box } from '@chakra-ui/react';
import TaskItem from '../TaskItem';

const TasksList: React.FC = () => {
    const { data } = useTodoListStore();
    return (
        <Box flexGrow={1} p={3}>
            <Controls />
            <Box
                display={'flex'}
                flexDir={'column'}
                pt={5}
                borderTop="1px"
                borderColor="gray.200"
                gap={2}
            >
                {data.map((item) => (
                    <TaskItem key={item.id} task={item} />
                ))}
            </Box>
        </Box>
    );
};

export default TasksList;
