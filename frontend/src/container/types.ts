export interface Todo {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    completed: boolean;
}

export type TodoFormData = Omit<Todo, 'id' | 'completed'>