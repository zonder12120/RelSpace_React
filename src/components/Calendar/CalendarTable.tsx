import React from 'react';
import classNames from 'classnames';
import styles from './Calendar.module.css'
import {format} from "date-fns";

const WEEKDAY: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'];

interface CalendarTableProps {
    calendarWeeks: Date[][];
    selectedRowIndex: number | null;
    hoveredRowIndex: number | null;
    handleRowHover: (i: number | null) => void;
    handleRowClick: (index: number | null) => void;
    isOtherMonth: (day: Date) => boolean;
}

const CalendarTable: React.FC<CalendarTableProps> = ({ calendarWeeks, selectedRowIndex, hoveredRowIndex, handleRowHover, handleRowClick, isOtherMonth }) => (
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
                ))}
            </tr>
        ))}
        </tbody>
    </table>
);

export default CalendarTable;