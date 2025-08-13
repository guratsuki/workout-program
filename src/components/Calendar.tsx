import { useState } from "react"

import './Calendar.css'

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    const getMonthName = (date: any) => {
        return date.toLocaleString('default', {month: 'long'})
    }

    const getYear = (date: any) => {
        return date.getFullYear() //сущ. метод
    }

    const changeMonth = (offset: any) => {
        const newDate = new Date(currentDate)
        newDate.setMonth(newDate.getMonth()) //гет месяц сущ. метод
        setCurrentDate(newDate)
    }

    const isToday = (day: any) => {
        const today = new Date()
        return(
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        )
    }

    const renderDays = () => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()

        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const startDay = firstDay.getDay()

        const currentMonthDays = []
        for (let i = 0; i <= lastDay.getDate(); i++){
            currentMonthDays.push(i)
        }

        return currentMonthDays.map((day: any, index: number ) => {
            let dayToRender = day
            return(
                <div className="calendar-day">
                    {dayToRender}
                </div>
            )
        })
    }

    return(
        <div className="calendar-days">
            {renderDays()}
        </div>
    )
}

export default Calendar