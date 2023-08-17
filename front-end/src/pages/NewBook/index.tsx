import { useState } from "react";
import { useParams } from "react-router-dom";
import useService from "../../hooks/useService";
import useNav from "../../hooks/useNav";
import api, { BookData, NewBookData } from "../../services/api";
import Header from "../../components/Header";
import useAlert from "../../hooks/useAlert";
import { getUrl } from "../../utils/navigation";
import useBook from "../../hooks/useBook";
import ErrorPage from "../../components/ErrorBoundary/ErrorPage";

function NewBook() {
  const monthYear = useParams().monthYear || null;
  const day = useParams().day || null;
  const hourMinute = useParams().hourMinute || '';

  const { getServiceId } = useService();
  const { fadeOut, navigateTo } = useNav();
  const { throwAlert } = useAlert();
  const { setBook } = useBook();

  const serviceId = getServiceId();
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    switch (e.target.name) {
      case 'name':
        setClientName(newValue);
        break;

      case 'email':
        setClientEmail(newValue);
        break;

      default:
        const number = newValue;
        const newNumber = number
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2')
        setClientPhone(newNumber);
        break;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (clientName.length < 1
      || (clientEmail.length < 1)) {
      throwAlert(`
        Atenção! Todos os campos do formulário são de preenchimento obrigatório.
      `,
        'warning'
      );
      return;
    }
    if (clientPhone.length < 14) {
      throwAlert(`
        Atenção! O número de telefone informado é inválido.
      `,
        'warning'
      );
      return;
    }

    let newBook: NewBookData = {
      dateTime: {
        date: `${day}-${monthYear}`,
        time: hourMinute
      },
      clientData: {
        name: clientName,
        email: clientEmail,
        phone: clientPhone.replace(/\D/g, '')
      },
      serviceId
    };

    try {
      const data: BookData = await api.bookService(newBook);
      setBook(data.date, data.time, data.protocol);
      navigateTo(`${getUrl()}/protocolo`);
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            if (error.response.data.includes('date')) throwAlert(`
              Não foi possível processar sua solicitação,
              pois a data informada não está disponível. Atualize
              a data e tente novamente.
            `,
              'error'
            );
            else throwAlert(`
              Não foi possível processar sua solicitação, atualize os
              dados informados ou tente novamente mais tarde.
            `,
              'error'
            );
            break;

          case 409:
            if (error.response.data.includes('date')) throwAlert(`
                Não foi possível processar sua solicitação,
                pois a data informada não está disponível. Atualize
                a data e tente novamente.
              `,
              'error'
            );
            else throwAlert(`
                Não foi possível processar sua solicitação, atualize os
                dados informados ou tente novamente mais tarde.
              `,
              'error'
            );
            break;

          case 422:
            if (error.response.data.includes('date')) throwAlert(`
              Não foi possível processar sua solicitação,
              pois a data informada é inválida. Atualize
              a data e tente novamente.
            `,
              'error'
            );
            else throwAlert(`
              Não foi possível processar sua solicitação, atualize os
              dados informados ou tente novamente mais tarde.
            `,
              'error'
            );
            break;

          default:
            throwAlert(`
              Não foi possível processar sua solicitação, atualize os
              dados informados ou tente novamente mais tarde.
            `,
              'error'
            );
            break;
        }
      }
      else throwAlert(`
        Não foi possível processar sua solicitação, tente novamente mais tarde.
      `,
        'error'
      );
      console.error("Error: ", error);
    }
  }

  if(!serviceId) return <ErrorPage />;
  return (
    <>
      <Header navigateTo={navigateTo} />
      <div className={`container new-book ${fadeOut ? 'fade-out--container' : ''}`}>
        <h1 className='heading-primary'>Novo agendamento</h1>
        <h2 className='heading-secondary'>Preencha o formulário abaixo para <span>finalizar seu agendamento!</span></h2>
        <form id='client-data' className='new-book__form' onSubmit={handleSubmit}>
          <input
            id='name-field'
            form='client-data'
            name='name'
            placeholder="Nome"
            onChange={handleInputChange}
            value={clientName}
            className='input u-margin-bottom-small'
          />

          <input
            id='email-field'
            form='client-data'
            name='email'
            placeholder="Email"
            onChange={handleInputChange}
            value={clientEmail}
            className='input u-margin-bottom-small'
          />

          <input
            id='phone-field'
            form='client-data'
            name='phone'
            placeholder="Telefone/Celular"
            maxLength={15}
            onChange={handleInputChange}
            value={clientPhone}
            className='input u-margin-bottom-small'
          />
            <button className='button--main' form='client-data'>Agendar horário</button>
        </form>
      </div>
    </>
  );
}

export default NewBook;