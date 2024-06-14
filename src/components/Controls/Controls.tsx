import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import useTodoListStore from '../../store/todoListStore';

const Controls = () => {
    const { clear } = useTodoListStore();
    return (
        <Box pb={3} display="flex" alignItems="center" justifyContent="space-between">
            <Text fontWeight={700} fontSize="3xl">
                My tasks
            </Text>
            <Box gap={2} display="flex" alignItems="center">
                <NextLink href="/add-item">
                    <Button leftIcon={<AddIcon />} colorScheme="teal" size="sm" w={200}>
                        Add Task
                    </Button>
                </NextLink>
                <Button
                    onClick={clear}
                    leftIcon={<DeleteIcon />}
                    variant="outline"
                    colorScheme="teal"
                    size="sm"
                    w={200}
                >
                    Clear List
                </Button>
            </Box>
        </Box>
    );
};

export default Controls;
