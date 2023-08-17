import { useEffect, useState } from "react";

import useNav from "../../hooks/useNav";
import useService from "../../hooks/useService";
import api, { ServiceData } from "../../services/api";
import Header from "../../components/Header";
import { getUrl } from "../../utils/navigation";
import { getCurrentMonthYear } from "../../utils/date";
import ErrorPage from "../../components/ErrorBoundary/ErrorPage";

function Service() {
  const { fadeOut, navigateTo } = useNav();
  const { getServiceId } = useService();

  const serviceId = getServiceId();
  const [service, setService] = useState<ServiceData | null>(null);

  function handleSeeScheduleClick() {
    navigateTo(`${getUrl()}/agenda/mes-ano/${getCurrentMonthYear()}`);
  }

  useEffect(() => {
    async function loadPage() {
      const data: ServiceData = await api.getService(serviceId);
      setService({...data});
    }
    loadPage();
  }, []);

  if (!service) return <></>;
  if(!serviceId) return <ErrorPage />;
  return (
    <>
    <Header navigateTo={navigateTo} />
    <div className={`container service ${fadeOut ? 'fade-out--container' : ''}`}>
      <h1 className='heading-primary'>{service.name}</h1>
      <div className='service__data-box'>
        <h2 className='heading-secondary--data-box u-uppercase-text'>Descrição</h2>
        <p className='text--data-box'>{service.description}</p>
        <div className='service__data-box__divider'></div>
        <h2 className='heading-secondary--data-box u-uppercase-text'>Duração</h2>
        <p className='text--data-box'>{service.duration}</p>
        <div className='service__data-box__divider'></div>
        <h2 className='heading-secondary--data-box u-uppercase-text'>Preço</h2>
        <p className='text--data-box'>{service.price}</p>
        <div className='service__data-box__divider'></div>
        <h2 className='heading-secondary--data-box u-uppercase-text'>Profissional</h2>
        <p className='text--data-box'>{service.professional}</p>
        <div className='service__data-box__divider'></div>
        <h2 className='heading-secondary--data-box u-uppercase-text'>Disponibilidade</h2>
        <p className='text--data-box'>
          {service.availability.map((strAvailability, index) => {
            if(index !== service.availability.length-1) return strAvailability + ', ';
            return strAvailability;
          })}
        </p>
      </div>
      <button onClick={handleSeeScheduleClick} className='button--main u-margin-top-small'>Ver agenda</button>
    </div>
    </>
  );
}

export default Service;