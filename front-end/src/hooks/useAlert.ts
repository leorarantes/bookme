import { useContext } from "react";
import { AlertContext, AlertType } from "../contexts/AlertContext";

function useAlert() {
  const alert = useContext(AlertContext);
  const isActive = alert?.isActive || false;
  const setIsActive = alert?.setIsActive || null;
  const fadeOut = alert?.fadeOut || false;
  const setFadeOut = alert?.setFadeOut || null;
  const message = alert?.message || null;
  const setMessage = alert?.setMessage || null;
  const type = alert?.type || null;
  const setType = alert?.setType || null;
  
  function throwAlert(message: string, type: AlertType) {
    if(setIsActive && setMessage && setType) {
      setType(type);
      setMessage(message);
      setIsActive(true);
    }
  }

  function closeAlert() {
    if(setIsActive && setFadeOut && setMessage && setType) {
      setFadeOut(true);
      setTimeout(() => {
        setIsActive(false);
        setType(null);
        setMessage(null);
        setFadeOut(false);
      }, 150);
    }
  }

  return {isActive, fadeOut, message, type, throwAlert, closeAlert};
}

export default useAlert;