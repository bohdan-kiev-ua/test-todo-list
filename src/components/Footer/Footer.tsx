import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box p="3" bg="gray.900" color={'white'}>
            <Text fontSize="xl" as="i">
                {'Your Best Todo List'}
            </Text>
        </Box>
    );
};

export default Footer;
