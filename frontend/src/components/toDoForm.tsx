import React, { useState } from 'react'
import type { TodoFormData } from '../container/types';
import './toDoForm.css'

interface TodoFormProps {
    onAdd: (todo: TodoFormData) => void;
}

const ToDoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
    const [inputData, setInputData] = useState<TodoFormData>({
        title: '',
        description: '',
        date: '',
        time: ''
    })

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setInputData(prev => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('1')

        onAdd(inputData)

        console.log('data', inputData)
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="todo-form">
                <input type="text" name="title" id="title" placeholder="Название" onChange={(handleChangeInput)} />
                <input type='text' name="description" id="description" placeholder="Описание" onChange={(handleChangeInput)}></input>
                <input type="date" name="date" id="date" onChange={(handleChangeInput)} />
                <input type="time" name="time" id="time" onChange={(handleChangeInput)} />
                <button type="submit">Добавить задачу</button>
            </form>
        </>


    )
}

export default ToDoForm