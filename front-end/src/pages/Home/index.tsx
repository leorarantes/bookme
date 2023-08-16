import { useEffect, useState } from "react";

import Logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import useNav from "../../hooks/useNav";

function Home() {
  const { fadeOut, navigateTo } = useNav();

  const [logoLoaded, setLogoLoaded] = useState(false);

  function handleFindClick() {
    navigateTo('/servicos');
  }

  useEffect(() => {
    async function loadPage() {
      const image = new Image();
      image.src = Logo;
      image.onload = () => {
        setLogoLoaded(true);
      };
    }
    loadPage();
  }, []);

  if (!logoLoaded) return <></>;
  return (
    <div className={`container home ${fadeOut ? 'fade-out--container' : ''}`}>
      <div className='home__logo-box'><img src={Logo} className='home__logo u-margin-bottom-medium' /></div>

      <h2 className='heading-secondary'>Encontre o profissional perfeito para suas <span>necessidades!</span></h2>

      <button onClick={handleFindClick} className='button--main u-margin-bottom-small'>Encontre agora!</button>

      <h3 className='heading-terciary u-center-text'>
        Você gostaria de cancelar um agendamento?
        <Link to='#' className='u-margin-left-super-small'>Clique aqui!</Link>
      </h3>
    </div>
  );
}

export default Home;