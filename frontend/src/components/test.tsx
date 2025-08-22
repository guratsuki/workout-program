import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test: React.FC = () => {
    const [todos, setTodos] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get('http://localhost:5000/gettodos');
            setTodos(response.data);
        };
        fetchTodos();
    }, []);

    const handleDateClick = (date: string) => {
        setSelectedDate(date);
    };

    const renderDays = () => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < 20; i++) {
            const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
            const dateString = date.toISOString().split('T')[0];
            let a = false
            todos.some(todo => {
                if (todo.todo_day == dateString){
                    a = true
                }
            })

            const dayStyle = {
                backgroundColor: a ? 'red' : 'white',
                padding: '10px',
                margin: '5px',
                cursor: 'pointer',
                border: '1px solid #ccc',
                borderRadius: '5px',
                textAlign: 'center' as const,
                width: '30px'
            };

            days.push(
                <div
                    key={dateString}
                    onClick={() => handleDateClick(dateString)}
                    style={dayStyle}
                >
                    {date.getDate()}
                </div>
            );
        }
        return days;
    };

    return (
        <div>
            <h2>Календарь</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '210px' }}>
                {renderDays()}
            </div>
            <h3>Дела на {selectedDate}</h3>
            <ul>
                {todos.filter(todo => todo.todo_day == selectedDate).map(todo => (
                    <li key={todo.id}>{todo.todo_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Test;
