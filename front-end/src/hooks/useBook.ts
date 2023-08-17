import { useContext } from "react";
import { BookContext } from "../contexts/BookContext";

function useBook() {
  const book = useContext(BookContext);
  const date = book?.date || null;
  const setDate = book?.setDate || null;
  const time = book?.time || null;
  const setTime = book?.setTime || null;
  const protocol = book?.protocol || null;
  const setProtocol = book?.setProtocol || null;
  
  function setBook(date: string, time: string, protocol: string) {
    if(setDate && setTime && setProtocol) {
      setDate(date);
      setTime(time);
      setProtocol(protocol);
    }
  }

  function getBook() {
    if(date && time && protocol) {
      return {date, time, protocol};
    }
  }

  return {getBook, setBook};
}

export default useBook;