import { useContext } from "react";
import { ServiceContext } from "../contexts/ServiceContext";

function useService() {
  const serviceContext = useContext(ServiceContext);
  const id = serviceContext?.id || null;
  const setId = serviceContext?.setId || null;

  function setServiceId(newValue: string) {
    if(setId) {
      setId(newValue);
    }
  }

  function getServiceId() {
    if(id) return id;
    return '';
  }

  return { getServiceId, setServiceId };
}

export default useService;