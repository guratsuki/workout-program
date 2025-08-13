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
        for (let i = 1; i <= lastDay.getDate(); i++){
            currentMonthDays.push(i)
        }

        const prevMonthDays = []
        if (startDay > 0){
            const prevMonthLastDay = new Date(year, month, 0).getDate()
            for (let i = 1; i < startDay; i++){
                prevMonthDays.push(prevMonthLastDay - startDay + 1 + i)
            }
        }

        const nextMonthDays = []
        if (startDay < 8){
            const nextMonthFirstDay = new Date(year, month + 1, 1).getDate()
            for (let i = 0; i < 7; i++){
                nextMonthDays.push(nextMonthFirstDay + i)
            }
        }

        console.log(nextMonthDays)

        const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]


        return allDays.map((day: any, index: number ) => {
            let dayToRender = day
            let classNameForDay = 'calendar-day'

            console.log(index)

            if (index < prevMonthDays.length){
                classNameForDay += ' calendar-other-month-day'
            }

            if (index > prevMonthDays.length && index < allDays.length - nextMonthDays.length){
                classNameForDay += ' calendar-day-current'
            }

            if (index >= allDays.length - nextMonthDays.length){
                classNameForDay += ' calendar-other-month-day'
            }


            return(
                <div className={classNameForDay}>
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