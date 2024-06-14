import { z, ZodType } from 'zod';
import { CreateFormInputs } from '../../types';

export const TaskSchema: ZodType<CreateFormInputs> = z
    .object({
        title: z.string().min(2, { message: 'Title is too short' }),
        description: z.string().min(2, { message: 'Description is too short' }),
    })
    .required();
