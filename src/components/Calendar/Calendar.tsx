import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarTable from './CalendarTable';
import useCalendar from './useCalendar';
import styles from './Calendar.module.css'

const Calendar: React.FC = () => {
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
    } = useCalendar();

    return (
        <div className={styles.calendar}>
            <CalendarHeader
                subMonth={subMonth}
                addMonth={addMonth}
                formatMonthName={formatMonthName}
                selectedMonth={selectedMonth}
            />
            <CalendarTable
                calendarWeeks={calendarWeeks}
                selectedRowIndex={selectedRowIndex}
                hoveredRowIndex={hoveredRowIndex}
                handleRowHover={handleRowHover}
                handleRowClick={handleRowClick}
                isOtherMonth={isOtherMonth}
            />
        </div>
    );
};

export default Calendar;