'use client';

import React from 'react';
import useTodoListStore from '../../store/todoListStore';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateFormInputs } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskSchema } from './validationSchema';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Textarea,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const CreateFormSpec: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const { create } = useTodoListStore();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateFormInputs>({ resolver: zodResolver(TaskSchema) });

    const onSubmit: SubmitHandler<CreateFormInputs> = (data) => {
        setIsLoading(true);
        create({
            ...data,
            completed: false,
        });
        reset();
        router.replace('/');
    };

    const onBack = () => {
        router.back();
    };

    return (
        <Box flexGrow="1" p="4">
            <Box p={5}>
                <Button leftIcon={<ArrowBackIcon />} onClick={onBack}>
                    Back
                </Button>
            </Box>
            <Box
                onSubmit={handleSubmit(onSubmit)}
                as="form"
                maxW="600px"
                w="100%"
                margin="24px auto 0"
                display="flex"
                flexDir="column"
                gap="24px"
            >
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input isInvalid={!!errors.title} {...register('title', { required: true })} />
                    {errors.title && (
                        <FormHelperText color="red.500">{errors.title.message}</FormHelperText>
                    )}
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        isInvalid={!!errors.description}
                        {...register('description')}
                        size="sm"
                    />
                    {errors.description && (
                        <FormHelperText color="red.500">
                            {errors.description.message}
                        </FormHelperText>
                    )}
                </FormControl>
                <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={isLoading}
                    loadingText="creating"
                >
                    Create
                </Button>
            </Box>
        </Box>
    );
};

export default CreateFormSpec;
