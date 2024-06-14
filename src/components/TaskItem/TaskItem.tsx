import React from 'react';
import { Box, Checkbox, Collapse, Text, useDisclosure } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { TODO } from '../../types';
import useTodoListStore from '../../store/todoListStore';

interface TaskItemProps {
    task: TODO;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const { title, description, completed } = task;
    const { isOpen, onToggle } = useDisclosure();
    const { update } = useTodoListStore();
    return (
        <Box
            onClick={onToggle}
            p={3}
            border="1px"
            borderColor="blue.200"
            rounded="md"
            shadow="md"
            color="blue.500"
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" gap={2} alignItems="center">
                    <Box
                        w="24px"
                        h="24px"
                        rounded="full"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        bg="blue.500"
                    >
                        <ChevronRightIcon
                            w="20px"
                            h="20px"
                            color="white"
                            transition="0.2s"
                            transform={isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}
                        />
                    </Box>
                    <Text>{title}</Text>
                </Box>
                <Checkbox
                    onChange={(event) => {
                        update(task.id, {
                            ...task,
                            completed: event.target.checked,
                        });
                    }}
                    checked={completed}
                    colorScheme="green"
                    defaultChecked={completed}
                >
                    Completed
                </Checkbox>
            </Box>

            <Collapse onClick={(e) => e.stopPropagation()} in={isOpen} animateOpacity>
                <Text borderTop="1px" borderColor="gray.200" pt={3} mt={3} color="blue.500">
                    {description}
                </Text>
            </Collapse>
        </Box>
    );
};

export default TaskItem;
