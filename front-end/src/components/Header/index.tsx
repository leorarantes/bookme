import Logo from "../../assets/img/logo.svg";

interface HeaderProps {
  navigateTo: (route: string) => void;
}

function Header({ navigateTo }: HeaderProps) {
  function handleLogoClick() {
    navigateTo('/');
  }

  return (
    <header className='header'>
      <div onClick={handleLogoClick} className='header__logo-box'>
        <img src={Logo} className='header__logo'/>
      </div>
    </header>
  );
}

export default Header;