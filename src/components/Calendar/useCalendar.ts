import {useEffect, useState} from 'react';
import CalendarState from './useCalendarState';

function useCalendar() {

    const [hasLoaded, setHasLoaded] = useState(false);

    const {
        selectedMonth,
        selectedRowIndex,
        hoveredRowIndex,
        calendarWeeks,
        subMonth,
        addMonth,
        formatMonthName,
        handleRowHover,
        handleRowClick,
        isOtherMonth,
        updateCalendar,
        findCurrentWeek,
    } = CalendarState();

    useEffect(() => {
        updateCalendar();
    }, [selectedMonth, updateCalendar]);

    useEffect(() => {
        if (!hasLoaded) {
            setHasLoaded(true);
        }
        findCurrentWeek();
    }, [hasLoaded]);

    return {
        hasLoaded,
        selectedMonth,
        selectedRowIndex,
        hoveredRowIndex,
        calendarWeeks,
        subMonth,
        addMonth,
        formatMonthName,
        handleRowHover,
        handleRowClick,
        isOtherMonth,
    };
}

export default useCalendar;