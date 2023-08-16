import { useNavigate } from 'react-router-dom';

import { getMonthName, getNextMonth, getPreviousMonth } from '../../utils/date';
import LeftArrowIcon from '../../assets/img/left-arrow-icon.svg';
import RightArrowIcon from '../../assets/img/right-arrow-icon.svg';

interface CalendarProps {
  calendarIdHash: { [key: number]: {dayOfTheMonth: number, month: number, year: number, isAvailable: boolean} };
  handleDayClick: (day: number, month: number, year: number) => void;
  monthYear: string;
}

interface DayData {
  dayOfTheMonth: number;
  month: number;
  year: number;
  isAvailable: boolean;
}

function Calendar({ calendarIdHash, monthYear, handleDayClick }: CalendarProps) {
  const navigate = useNavigate();

  const urlMonth = monthYear.split('-')[0];
  const urlYear = monthYear.split('-')[1];

  function getDaysColumn(index: number) {
    let column = [];
    let day = {
      id: index+1,
      data: calendarIdHash[index+1]
    };
    
    while(day.data) {
      column.push({...day.data, id: day.id});
      day.id = day.id + 7;
      day.data = calendarIdHash[day.id];
    }

    return column;
  }

  function handleHeaderButtonClick(direction: string) {
    let url = window.location.pathname;

    if (direction === 'previous') {
      if (+urlMonth !== new Date().getMonth() + 1) {
        const newUrl = url.replace(monthYear, getPreviousMonth(monthYear));
        navigate(newUrl);
      }
    }
    else {
      const newUrl = url.replace(monthYear, getNextMonth(monthYear));
      navigate(newUrl);
    }
  }

  function Day({ dayOfTheMonth, month, year, isAvailable }: DayData) {
    if (isAvailable)
    return <li onClick={() => handleDayClick(dayOfTheMonth, month, year)} className='calendar__box__day--active'>{dayOfTheMonth}</li>;
    return <li className='calendar__box__day'>{dayOfTheMonth}</li>;
  }

  return (
    <section className='calendar'>
      <div className='calendar__box'>
        <header className='calendar__box__header'>
          <button onClick={() => handleHeaderButtonClick('previous')} className='calendar__box__header__button'><img src={LeftArrowIcon} className='calendar__box__header__button__icon' /></button>
          <h1 className='calendar__box__header__title'>{getMonthName(+urlMonth)} | {urlYear}</h1>
          <button onClick={() => handleHeaderButtonClick('next')} className='calendar__box__header__button'><img src={RightArrowIcon} className='calendar__box__header__button__icon' /></button>
        </header>
        <div className='calendar__box__days__box'>
          <ul className='calendar__box__days__box__column'>
            <h2 className='calendar__box__week-day'>D</h2>
            {getDaysColumn(0).map((dayData) => {
              const {id, dayOfTheMonth, month, year, isAvailable} = dayData;
              return <Day key={id} dayOfTheMonth={dayOfTheMonth} month={month} year={year} isAvailable={isAvailable} />;
            })}
          </ul>
          <ul className='calendar__box__days__box__column'>
            <h2 className='calendar__box__week-day'>S</h2>
            {getDaysColumn(1).map((dayData) => {
              const {id, dayOfTheMonth, month, year, isAvailable} = dayData;
              return <Day key={id} dayOfTheMonth={dayOfTheMonth} month={month}year={year} isAvailable={isAvailable} />;
            })}
          </ul>
          <ul className='calendar__box__days__box__column'>
            <h2 className='calendar__box__week-day'>T</h2>
            {getDaysColumn(2).map((dayData) => {
              const {id, dayOfTheMonth, month, year, isAvailable} = dayData;
              return <Day key={id} dayOfTheMonth={dayOfTheMonth} month={month} year={year} isAvailable={isAvailable} />;
            })}
          </ul>
          <ul className='calendar__box__days__box__column'>
            <h2 className='calendar__box__week-day'>Q</h2>
            {getDaysColumn(3).map((dayData) => {
              const {id, dayOfTheMonth, month, year, isAvailable} = dayData;
              return <Day key={id} dayOfTheMonth={dayOfTheMonth} month={month} year={year} isAvailable={isAvailable} />;
            })}
          </ul>
          <ul className='calendar__box__days__box__column'>
            <h2 className='calendar__box__week-day'>Q</h2>
            {getDaysColumn(4).map((dayData) => {
              const {id, dayOfTheMonth, month, year, isAvailable} = dayData;
              return <Day key={id} dayOfTheMonth={dayOfTheMonth} month={month} year={year} isAvailable={isAvailable} />;
            })}
          </ul>
          <ul className='calendar__box__days__box__column'>
            <h2 className='calendar__box__week-day'>S</h2>
            {getDaysColumn(5).map((dayData) => {
              const {id, dayOfTheMonth, month, year, isAvailable} = dayData;
              return <Day key={id} dayOfTheMonth={dayOfTheMonth} month={month} year={year} isAvailable={isAvailable} />;
            })}
          </ul>
          <ul className='calendar__box__days__box__column'>
            <h2 className='calendar__box__week-day'>S</h2>
            {getDaysColumn(6).map((dayData) => {
              const {id, dayOfTheMonth, month, year, isAvailable} = dayData;
              return <Day key={id} dayOfTheMonth={dayOfTheMonth} month={month} year={year} isAvailable={isAvailable} />;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Calendar;