import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useNav from "../../hooks/useNav";
import { getUrl } from "../../utils/navigation";
import { parseIdHash, twoDigitsNumber } from "../../utils/parse";
import api, { DayData } from "../../services/api";
import useService from "../../hooks/useService";
import Header from "../../components/Header";
import Calendar from "../../components/Calendar";
import ErrorPage from "../../components/ErrorBoundary/ErrorPage";

function MonthSchedule() {
  const monthYear = useParams().monthYear || null;

  const { getServiceId } = useService();
  const { fadeOut, navigateTo } = useNav();

  const serviceId = getServiceId();
  const [days, setDays] = useState<DayData[] | null>(null);

  function handleDayClick(day: number, month: number, year: number) {
    let arrUrl = getUrl().split('/');
    arrUrl.pop();
    navigateTo(`${arrUrl.join('/')}/${twoDigitsNumber(month)}-${twoDigitsNumber(year)}/dia/${twoDigitsNumber(day)}`);
  }

  useEffect(() => {
    async function loadPage() {
      const data: DayData[] = await api.getMonthSchedule(monthYear, serviceId);
      setDays([...data]);
    }
    loadPage();
  }, [monthYear]);

  if (!days || !monthYear) return <></>;
  if(!serviceId) return <ErrorPage />;
  return (
    <>
      <Header navigateTo={navigateTo} />
      <div className={`container month-schedule ${fadeOut ? 'fade-out--container' : ''}`}>
        <h1 className='heading-primary'>Agenda do mês</h1>
        <h2 className='heading-secondary'>Selecione um dia disponível para <span>continuar!</span></h2>
        <Calendar
          calendarIdHash={parseIdHash(days)}
          monthYear={monthYear}
          handleDayClick={handleDayClick}
        />
      </div>
    </>
  );
}

export default MonthSchedule;