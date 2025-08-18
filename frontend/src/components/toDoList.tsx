import { useEffect, useState } from 'react'
import axios from 'axios';
import './toDoList.css'
import ToDoForm from './toDoForm';
import type { Todo, TodoFormData } from '../container/types';

const API_URL = 'http://localhost:5000'; 

function ToDoList() {
    const [items, setItems] = useState<Todo[]>([])

    useEffect(() => {
        axios.get(`${API_URL}/gettodos`)
            .then(res => {
                setItems(res.data)
            })
    }, [])

    const Refresh = async () => {
        const res = await axios.get(`${API_URL}/gettodos`);
        setItems(res.data);
    };

    console.log(items)

    const DisplayData = items.map((item: any) => {
        return (
            <tr>
                <td>{item.todo_time}</td>
                <td>{item.todo_day}</td>
                <td>{item.todo_name}</td>
                <td>{item.todo_desc}</td>
            </tr>
        )
    })

    const handleAddTodo = async (formData: TodoFormData) => {
        const newtodo: Todo = {
            ...formData,
            id: Date.now().toString(),
            completed: false
        }
        console.log('data: ', newtodo)

        const res = await axios.post(`${API_URL}/addtodos`, newtodo);
        Refresh()
        console.log('result: ', res)
    }

    return (
        <>
            <div>
                <table className="table-main">
                    <thead className='table-header'>
                        <tr>
                            <th>Время</th>
                            <th>День</th>
                            <th>Название</th>
                            <th>Описание</th>
                        </tr>
                    </thead>
                    <tbody className='table-body'>
                        {DisplayData}
                    </tbody>
                </table>
            </div>

            <ToDoForm onAdd={handleAddTodo} />
        </>


    )
}

export default ToDoList