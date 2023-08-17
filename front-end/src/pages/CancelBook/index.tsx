import { useState } from "react";
import useNav from "../../hooks/useNav";
import useAlert from "../../hooks/useAlert";
import api from "../../services/api";
import Header from "../../components/Header";

function CancelBook() {
  const { fadeOut, navigateTo } = useNav();
  const { throwAlert } = useAlert();

  const [protocol, setProtocol] = useState<string>('');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setProtocol(newValue);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (protocol.length < 1) {
      throwAlert(`
        Atenção! O campo protocolo é de preenchimento obrigatório.
      `,
        'warning'
      );
      return;
    }

    try {
      await api.deleteBook(protocol);
      throwAlert(`
        Sucesso! Cancelamento efetuado.
      `,
        'success'
      );
    }
    catch (error: any) {
      if (error.response && error.response.status === 401) {
        throwAlert(`
        Erro! Protocolo inválido.
      `,
          'error'
        );
      }
      else throwAlert(`
      Erro! Tente novamente mais tarde.
    `,
        'error'
      );
    }
  }

  return (
    <>
      <Header navigateTo={navigateTo} />
      <div className={`container cancel-book ${fadeOut ? 'fade-out--container' : ''}`}>
        <h1 className='heading-primary'>Cancelar agendamento</h1>
        <h2 className='heading-secondary'>Informe o protocolo do seu agendamento para <span>cancelá-lo!</span></h2>
        <form id='protocol' className='cancel-book__form' onSubmit={handleSubmit}>
          <input
            id='protocol-field'
            form='protocol'
            name='protocol'
            placeholder="Protocolo"
            onChange={handleInputChange}
            value={protocol}
            className='input u-margin-bottom-small'
          />
        </form>
        <button className='button--main' form='protocol'>Cancelar agendamento</button>
      </div>
    </>
  );
}

export default CancelBook;