import { useContext } from "react";
import { ServiceContext } from "../contexts/ServiceContext";

function useService() {
  const serviceContext = useContext(ServiceContext);
  const id = serviceContext?.id || null;
  const setId = serviceContext?.setId || null;

  function setService(newValue: string) {
    if(setId) {
      setId(newValue);
    }
  }

  function getService() {
    if(id) return id;
    return '';
  }

  return { getService, setService };
}

export default useService;