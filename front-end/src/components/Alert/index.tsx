import { useEffect } from "react";

import ErrorIcon from "../../assets/img/error-icon.svg";
import SuccesIcon from "../../assets/img/success-icon.svg";
import WarningIcon from "../../assets/img/warning-icon.svg";
import CloseIcon from "../../assets/img/close-icon.svg";
import useAlert from "../../hooks/useAlert";
import useTimer from "../../hooks/useTimer";
import { AlertType } from "../../contexts/AlertContext";

function Alert() {
  const { isActive, fadeOut, message, type, closeAlert } = useAlert();

  const { timer, stopTimer } = useTimer();

  function getIcon(type: AlertType | null) {
    switch (type) {
      case "error":
        return ErrorIcon;
      case "success":
        return SuccesIcon;
      default:
        return WarningIcon;
    }
  }

  function handleClose() {
    stopTimer();
    closeAlert();
  }

  useEffect(() => {
    if (isActive) timer(closeAlert, 5000);
  }, [isActive]);

  if (!isActive) return <></>;
  return (
    <div className={`alert--${type} ${fadeOut ? 'fade-out--alert' : ''}`}>
      <div className='alert__box'>
        <img src={getIcon(type)} className='alert__box__icon' />
        <h1 className={`heading-primary--${type}-alert`}>{message}</h1>
      </div>
      <img src={CloseIcon} onClick={handleClose} className={`alert__close-icon--${type}`} />
    </div>
  );
}

export default Alert;