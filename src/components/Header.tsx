import { useTimersContext } from '../store/timers-conetext.tsx';
import Button from './UI/Button.tsx';

export default function Header() {
  const timersCtx= useTimersContext();
  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={timersCtx.isRunning? timersCtx.stopTimers: timersCtx.startTimers}>{ timersCtx.isRunning? "stop":"start"} Timers</Button>
    </header>
  );
}
