import React, {useCallback, useEffect, useState} from 'react';
import classNames from 'classnames';
import {
    startOfMonth,
    endOfMonth,
    subMonths,
    addMonths,
    addDays,
    getDay,
    isWeekend,
    format,
    getDate,
    getMonth
} from 'date-fns';
import styles from './Calendar.module.css'

const WEEKDAY: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'];

export const Calendar = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
    const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
    const [calendarWeeks, setCalendarWeeks] = useState<Date[][]>([]);
    const findCurrentWeek = () => {
        const currentDate = new Date(); // Текущая дата
        const currentDay = currentDate.getDate(); // День текущей даты
        let foundRowIndex = selectedRowIndex;

        for (let i = 0; i < calendarWeeks.length; i++) {
            const week = calendarWeeks[i];
            for (let j = 0; j < week.length; j++) {
                const cellDate = week[j];
                const cellDay = getDate(cellDate);

                if (cellDay === currentDay) {
                    foundRowIndex = i;
                    break;
                }
            }

            if (foundRowIndex !== null) {
                break;
            }
        }
        setSelectedRowIndex(foundRowIndex);
        console.log(foundRowIndex);
    };

    const handleRowHover = (i: number | null) => {
        setHoveredRowIndex(i);
    }

    const handleRowClick = (index: number | null) => {
        setSelectedRowIndex(index);
        console.log(index);
    }

    const subMonth = useCallback(() => {
        setSelectedMonth(subMonths(selectedMonth, 1));
        setSelectedRowIndex(null);
    }, [selectedMonth]);

    const addMonth = useCallback(() => {
        setSelectedMonth(addMonths(selectedMonth, 1));
        setSelectedRowIndex(null);
    }, [selectedMonth]);

    const generateMonthsArr = useCallback((month: Date) => {

        const firstDay = startOfMonth(month);
        const lastDay = endOfMonth(month);
        const monthDays: Date[] = [];

        if (month < selectedMonth) {
            for (let date: Date = firstDay; date <= lastDay; date = addDays(date, 1)) {
                monthDays.unshift(date);
            }
        } else {
            for (let date: Date = firstDay; date <= lastDay; date = addDays(date, 1)) {
                monthDays.push(date);
            }
        }
        return monthDays;
    }, [selectedMonth]);

    const updateCalendar = useCallback(() => {
        const firstDaySelMonth = startOfMonth(selectedMonth);
        const lastDaySelMonth = endOfMonth(selectedMonth);
        const prevMonthArr = generateMonthsArr(subMonths(selectedMonth, 1));
        const nextMonthArr = generateMonthsArr(addMonths(selectedMonth, 1));
        let calendarDays: Date[] = [];

        for (let date = firstDaySelMonth; date <= lastDaySelMonth; date = addDays(date, 1)) {

            if (date === firstDaySelMonth) {
                const firstDay = getDay(date);
                if (firstDay > 1 && firstDay <= 5) {
                    for (let i = 0; i < 5 - (6 - firstDay); i++) {
                        calendarDays.unshift(prevMonthArr[i]);
                    }
                }
            }

            if (!isWeekend(date)) {
                calendarDays.push(date);
            }

            if (date.setHours(0, 0, 0, 0) === lastDaySelMonth.setHours(0, 0, 0, 0)) {
                const lastDay = getDay(date);
                if (lastDay >= 1 && lastDay < 5) {
                    for (let i = 0; i < 5 - lastDay; i++) {
                        calendarDays.push(nextMonthArr[i]);
                    }
                }
            }
        }
        setCalendarWeeks(splitArrayIntoWeeks(calendarDays));
    }, [selectedMonth, generateMonthsArr]);

    const splitArrayIntoWeeks = (array: Date[]): Date[][] => {
        let weeks: Date[][] = [];
        let week: Date[] = [];

        array.forEach((date, index) => {
            week.push(date);

            if (week.length === 5 || index === array.length - 1) {
                weeks.push(week);
                week = [];
            }
        });
        return weeks;
    }

    const isOtherMonth = useCallback((day: Date) => {
        return getMonth(day) !== getMonth(selectedMonth);
    }, [selectedMonth]);

    const formatMonthName = (date: Date) => {
        const month = new Intl.DateTimeFormat('ru', {month: 'long'}).format(date);
        const year = date.getFullYear();
        return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
    }

    useEffect(() => {
        updateCalendar();
    }, [selectedMonth, updateCalendar]);

    useEffect(() => {
        if (!hasLoaded) {
            setHasLoaded(true);
        }
        findCurrentWeek();
    }, [hasLoaded]);

    return (
        <div className={styles.calendar}>
            <div className={styles.calendarHeader}>
                <button
                    className={classNames(styles.leftArrow, styles.changeMonth)}
                    onClick={subMonth}>{'<'}</button>
                <div className={styles.currentMonth}>{formatMonthName(selectedMonth)}</div>
                <button
                    className={classNames(styles.rightArrow, styles.changeMonth)}
                    onClick={addMonth}>{'>'}</button>
            </div>
            <table className={styles.calendarTable}>
                <thead>
                <tr>
                    {WEEKDAY.map((item, index) => (
                        <th key={index}>{item}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {calendarWeeks.map((row, index) => (
                    <tr key={index}
                        className={classNames(styles.calendarWeek, index === selectedRowIndex ? styles.selectedRow : '',
                            index === hoveredRowIndex && index !== selectedRowIndex ? styles.hoveredRow : '',)}
                        onMouseEnter={() => handleRowHover(index)}
                        onMouseLeave={() => handleRowHover(null)}
                        onClick={() => handleRowClick(index)}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className={isOtherMonth(cell) ? styles.otherMonth : ''}>{(format(cell, 'dd'))}</td>
                        ))}</tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}