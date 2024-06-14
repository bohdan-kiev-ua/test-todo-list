export interface TODO {
    id: string | number;
    title: string;
    description: string;
    completed: boolean;
}

export type CreateFormInputs = {
    title: string;
    description: string;
};
