import { useEffect, useState } from "react"

import axios from "axios";
const API_URL = 'http://localhost:5000';
import ToDoForm from './toDoForm';
import type { Todo, TodoFormData } from '../container/types';


import './Calendar.css'

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())


    //asdfghjg
    const [todos, setTodos] = useState<any[]>([])

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get('http://localhost:5000/gettodos');
            setTodos(response.data);
        };
        fetchTodos();
    }, []);

    //asdfghfdjg

    const getMonthName = (date: any) => {
        let month = date.toLocaleString('default', { month: 'long' })
        return month.charAt(0).toUpperCase() + month.slice(1);
    }

    const getYear = (date: any) => {
        return date.getFullYear() //сущ. метод
    }

    const changeMonth = (offset: any) => {
        const newDate = new Date(currentDate)
        newDate.setMonth(newDate.getMonth() + offset) //гет месяц сущ. метод
        setCurrentDate(newDate)
    }

    const isToday = (day: any) => {
        const today = new Date()
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        )
    }

    const isSelected = (day: any) => {
        return (
            day === selectedDate.getDate() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            currentDate.getFullYear() === selectedDate.getFullYear()
        )
    }





    const renderDays = () => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()

        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const startDay = firstDay.getDay()

        const currentMonthDays = []
        for (let i = 1; i <= lastDay.getDate(); i++) {
            currentMonthDays.push(i)
        }

        const prevMonthDays = []
        if (startDay > 0) {
            const prevMonthLastDay = new Date(year, month, 0).getDate()
            for (let i = 1; i < startDay; i++) {
                prevMonthDays.push(prevMonthLastDay - startDay + 1 + i)
            }
        }

        const nextMonthDays = []
        let nextDays = 42 - (prevMonthDays.length + currentMonthDays.length);

        if (prevMonthDays.length + currentMonthDays.length > 35) {
            nextDays = 42 - (prevMonthDays.length + currentMonthDays.length);
        }
        else {
            nextDays = 35 - (prevMonthDays.length + currentMonthDays.length);
        }

        for (let i = 1; i <= nextDays; i++) {
            nextMonthDays.push(i)
        }

        const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]

        return allDays.map((day: any, index: number) => {
            let i = 0
            let dayToRender = day
            let classNameForDay = 'calendar-day'
            let a = false
            const dateFor = new Date(year, month, day + i + 1)
            const dateString = dateFor.toISOString().replaceAll('.', "-").substring(0, 10)
            todos.some(todo => {
                if (todo.todo_day == dateString) {
                    a = true
                }
            })

            i += 1
            let b = ''

            if (index < prevMonthDays.length || index >= prevMonthDays.length + currentMonthDays.length) {
                classNameForDay += ' calendar-other-month-day'
            }

            if (index >= prevMonthDays.length && index < allDays.length - nextMonthDays.length) {
                classNameForDay += ' calendar-day-current'
            }

            if (isToday(day)) {
                b = "calendar-day-today"
            }

            if (isSelected(day) && index >= prevMonthDays.length && index < prevMonthDays.length + currentMonthDays.length) {
                b = "calendar-day-selected"

            }
            if (a && index >= prevMonthDays.length && index < allDays.length - nextMonthDays.length) {
                classNameForDay += ' calendar-day-with-todo'
            }

            const handleDaySelect = () => {
                if (index >= prevMonthDays.length && index < allDays.length - nextMonthDays.length) {
                    const newSelectedDay = new Date(year, month, day)
                    setSelectedDate(newSelectedDay)
                    handleGetToDoByDay(newSelectedDay)
                }
            }

            return (
                <div id={b} className={classNameForDay} key={index} onClick={handleDaySelect}>
                    {dayToRender}
                </div>
            )
        })
    }


    const calendarWeekDays = () => {
        const daysNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

        return daysNames.map((day) => {
            return (
                <div>
                    {day}
                </div>
            )
        })
    }

    //Data adding
    const Refresh = async () => {
        axios.get(`${API_URL}/gettodos`).then((res) => {
            setTodos(res.data);
        });
    };

    const [items, setItems] = useState<Todo[]>([])

    const handleGetToDoByDay = async (date: Date) => {
        let reqdata = { 'date': date.toLocaleString().substring(0, 10) }
        try {
            const res = await axios.post(`${API_URL}/gettodobyday`, reqdata);
            console.log(res)
            setItems(res.data)
        }
        catch (err: any) {
            console.log(err.response.data.message)
        }

        // const res = await axios.post(`${API_URL}/gettodobyday`, reqdata);
        // console.log('asd')
        // setItems(res.data)
    }

    const handleAddTodo = async (formData: TodoFormData) => {
        const newtodo: Todo = {
            ...formData,
            id: Date.now().toString(),
            completed: false
        }

        await axios.post(`${API_URL}/addtodos`, newtodo);
        alert("Абоба")
        Refresh()
    }

    const handleDelete = async (id: any) => {
        const res = await axios.delete(`${API_URL}/deletetodo/${id}`)
        console.log("qwe", res.data)
        console.log(res)
        if (res.status == 200)
            alert("Удалено")
        Refresh()
    }

    useEffect(() => {
        let date = { 'date': selectedDate.toLocaleString().substring(0, 10) }
        axios.post(`${API_URL}/gettodobyday`, date)
            .then(res => {
                setItems(res.data)
            })
    }, [])


    const DisplayData = items.map((item: any) => {
        return (
            <tr>
                <td>{item.todo_time}</td>
                <td>{item.todo_day}</td>
                <td>{item.todo_name}</td>
                <td>{item.todo_desc}</td>
                <td>
                    <button onClick={() => { handleDelete(item.id) }}>
                        Удалить
                    </button>
                </td>
            </tr>
        )
    })

    //Data adding

    return (
        <>
            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={() => changeMonth(-1)}>&lt;</button>
                    {getMonthName(currentDate)} {getYear(currentDate)}
                    <button onClick={() => changeMonth(1)}>&gt;</button>
                </div>
                <div className="calendar-week-days">
                    {calendarWeekDays()}
                </div>
                <div className="calendar-days">
                    {renderDays()}
                </div>
            </div>

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

export default Calendar