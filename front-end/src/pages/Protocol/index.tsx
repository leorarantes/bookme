import useBook from "../../hooks/useBook";
import useNav from "../../hooks/useNav";
import ErrorPage from "../../components/ErrorBoundary/ErrorPage";
import Header from "../../components/Header";

function Protocol() {
  const { fadeOut, navigateTo } = useNav();

  const { getBook } = useBook();
  const book = getBook();

  if (!book) return <ErrorPage />;
  return (
    <>
      <Header navigateTo={navigateTo} />
      <div className={`container protocol ${fadeOut ? 'fade-out--container' : ''}`}>
        <h1 className='heading-primary'>Agendamento realizado!</h1>
        <div className='protocol__book-data-box'>
          <h2 className='heading-secondary u-margin-bottom-super-small'>Data: <span>{book.date}</span></h2>
          <h2 className='heading-secondary u-margin-bottom-super-small'>Horário: <span>{book.time}</span></h2>
          <h2 className='heading-secondary u-text-bold u-no-margin'>Protocolo: <span>{book.protocol}</span></h2>
        </div>
      </div>
    </>
  );
}

export default Protocol;