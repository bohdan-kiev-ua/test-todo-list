'use client';
import React from 'react';
import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import useAuthStore from '../../store/authStore';
const Header = () => {
    const { logout, login, isAuth } = useAuthStore();
    return (
        <Box
            as="header"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={4}
            color="white"
            bg="gray.800"
        >
            <Text fontSize="3xl" fontWeight={700}>
                Todo List
            </Text>
            <Box>
                {isAuth ? (
                    <Button onClick={logout} colorScheme="teal" size="md">
                        LogOut
                    </Button>
                ) : (
                    <Button onClick={login} colorScheme="teal" size="md">
                        Login
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default Header;
