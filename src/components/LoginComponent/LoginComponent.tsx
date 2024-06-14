import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import useAuthStore from '../../store/authStore';

const LoginComponent: React.FC = () => {
    const { login } = useAuthStore();
    return (
        <Box
            gap={3}
            flexGrow={1}
            display="flex"
            alignItems="center"
            flexDir="column"
            justifyContent="center"
        >
            <Text fontSize="3xl" fontWeight={900}>
                Todo List
            </Text>
            <Button colorScheme="blue" size="lg" w={400} onClick={login}>
                Login
            </Button>
        </Box>
    );
};

export default LoginComponent;
