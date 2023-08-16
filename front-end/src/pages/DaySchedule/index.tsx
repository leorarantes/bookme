import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import api, { TimeSlotData } from '../../services/api';
import List from '../../components/List';
import { parseListElements, twoDigitsNumber } from '../../utils/parse';
import useNav from '../../hooks/useNav';
import { getUrl } from '../../utils/navigation';
import Header from '../../components/Header';
import useService from '../../hooks/useService';

function DaySchedule() {
  const monthYear = useParams().monthYear || null;
  const day = useParams().day || null;

  const { getServiceId } = useService();
  const { fadeOut, navigateTo } = useNav();

  const serviceId = getServiceId();
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlotData[] | null>(null);

  function handleTimeSlotClick(id: string | number, timeSlot: string) {
    navigateTo(`${getUrl()}/horario/${timeSlot}/novo-agendamento`);
  }

  useEffect(() => {
    async function loadPage() {
      const data: TimeSlotData[] = await api.getDaySchedule(monthYear, day, serviceId);
      setAvailableTimeSlots([...data]);
    }
    loadPage();
  }, []);

  if (!availableTimeSlots) return <></>;
  return (
    <>
    <Header navigateTo={navigateTo} />
    <div className={`container day-schedule ${fadeOut ? 'fade-out--container' : ''}`}>
      <h1 className='heading-primary'>Horários disponíveis</h1>
      <h1 className='heading-secondary'>Selecione um <span>horário!</span></h1>
      <List
        elements={parseListElements(availableTimeSlots)}
        elementType='horários'
        handleElementClick={handleTimeSlotClick}
      />
    </div >
    </>
  );
}

export default DaySchedule;