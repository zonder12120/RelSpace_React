import React from 'react';
import classNames from 'classnames';
import styles from './Calendar.module.css'

interface CalendarHeaderProps {
    subMonth: () => void;
    addMonth: () => void;
    formatMonthName: (date: Date) => string;
    selectedMonth: Date;
}


const CalendarHeader: React.FC<CalendarHeaderProps> = ({ subMonth, addMonth, formatMonthName, selectedMonth }) => (
    <div className={styles.calendarHeader}>
        <button
            className={classNames(styles.leftArrow, styles.changeMonth)}
            onClick={subMonth}>{'<'}</button>
        <div className={styles.currentMonth}>{formatMonthName(selectedMonth)}</div>
        <button
            className={classNames(styles.rightArrow, styles.changeMonth)}
            onClick={addMonth}>{'>'}</button>
    </div>
);

export default CalendarHeader;