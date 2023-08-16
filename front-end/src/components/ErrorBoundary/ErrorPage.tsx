function ErrorPage() {
  setTimeout(() => window.location.href = '/', 5000);
  return (
    <div className='container error-page'>
      <div className='error-page__box'>
        <h1 className='heading-primary--error-page u-margin-bottom-small'>ERRO 404</h1>
        <h2 className='heading-secondary--error-page'>Página não encontrada.</h2>
      </div>
    </div>
  );
}

export default ErrorPage;