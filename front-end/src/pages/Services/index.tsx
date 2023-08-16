import { useEffect, useState } from "react";

import useNav from "../../hooks/useNav";
import useService from "../../hooks/useService";
import api, { ServicePartialData } from "../../services/api";
import List from "../../components/List";
import { parseListElements, parseName } from "../../utils/parse";
import Header from "../../components/Header";

function Services() {
  const { fadeOut, navigateTo } = useNav();
  const { setServiceId } = useService();

  const [services, setServices] = useState<ServicePartialData[] | null>(null);

  function handleServiceClick(id: string | number, data: string) {
    setServiceId(id.toString());
    const name = parseName(data.split(' | ')[0]);
    navigateTo(`/servicos/${name}`);
  }

  useEffect(() => {
    async function loadPage() {
      const data: ServicePartialData[] = await api.getServices();
      setServices([...data]);
    }
    loadPage();
  }, []);

  if (!services) return <></>;
  return (
    <>
    <Header navigateTo={navigateTo} />
    <div className={`container services ${fadeOut ? 'fade-out--container' : ''}`}>
      <h1 className='heading-primary'>Serviços disponíveis</h1>
      <h2 className='heading-secondary'>Selecione um serviço para ver mais <span>informações</span></h2>
      <List
          elements={parseListElements(services)}
          elementType='serviços'
          handleElementClick={handleServiceClick}
        />
    </div>
    </>
  );
}

export default Services;