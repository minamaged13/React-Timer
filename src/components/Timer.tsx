import Container from "./UI/Container.tsx";
import {
  useTimersContext,
  type Timer as TimerProps,
} from "../store/timers-conetext.tsx";
import { useEffect, useRef, useState } from "react";
export default function Timer(props: TimerProps) {
  const interval = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(props.duration * 1000);
  const { isRunning } = useTimersContext();
  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }
  useEffect(() => {
    let timer: number;
    if (isRunning) {
      timer = setInterval(() => {
        setRemainingTime((prevtime) => {
          if (prevtime <= 0) {
            return prevtime;
          }
          return prevtime - 50;
        });
      }, 50);
      interval.current = timer;
    } else if (interval.current) {
      clearInterval(interval.current);
    }
    return () => clearInterval(timer);
  }, [isRunning]);
  const formattedRemTime = (remainingTime / 1000).toFixed(2);
  return (
    <Container as="article">
      <h2>{props.name}</h2>
      <p>
        <progress max={props.duration * 1000} value={remainingTime} />
      </p>
      <p>{formattedRemTime}</p>
    </Container>
  );
}
