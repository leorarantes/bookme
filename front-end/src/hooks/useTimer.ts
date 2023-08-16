import { useState } from "react";

function useTimer() {
  const [timeOut, setTimeOut] = useState<NodeJS.Timeout | null>(null);

  function timer(task: any, time: number) {
    if(timeOut) {      
      clearTimeout(timeOut);
      setTimeOut(setTimeout(task, time));
    }
    else setTimeOut(setTimeout(task, time));
  }

  function stopTimer() {
    if(timeOut) clearTimeout(timeOut);
  }

  return { timer, stopTimer };
}

export default useTimer;