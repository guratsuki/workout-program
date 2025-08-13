import { useState } from "react"

import './Calendar.css'

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

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
        const remainingDays = 42 - (prevMonthDays.length + currentMonthDays.length);
        for (let i = 1; i <= remainingDays; i++) {
            nextMonthDays.push(i)
        }

        const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]


        return allDays.map((day: any, index: number) => {
            let dayToRender = day
            let classNameForDay = 'calendar-day'

            console.log(index)

            if (index < prevMonthDays.length || index >= prevMonthDays.length + currentMonthDays.length) {
                classNameForDay += ' calendar-other-month-day'
            }

            if (index >= prevMonthDays.length && index < allDays.length - nextMonthDays.length) {
                classNameForDay += ' calendar-day-current'
            }

            if (isToday(day)) {
                classNameForDay += ' calendar-day-today'
            }

            if (isSelected(day) && index >= prevMonthDays.length && index < prevMonthDays.length + currentMonthDays.length) {
                classNameForDay += ' calendar-day-selected'
            }

            console.log(isToday(day))


            const handleDaySelect = () => {
                if (index >= prevMonthDays.length && index < allDays.length - nextMonthDays.length) {
                    const newSelectedDay = new Date(year, month, day)
                    setSelectedDate(newSelectedDay)
                }
            }

            return (
                <div className={classNameForDay} key={index} onClick={handleDaySelect}>
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

    return (
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
    )
}

export default Calendar