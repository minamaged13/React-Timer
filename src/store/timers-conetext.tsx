import { ReactNode, createContext, useContext, useReducer } from "react";
export type Timer = {
  name: string;
  duration: number;
};
type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};
const initialState: TimersState = {
  isRunning: true,
  timers: [],
};
type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};
const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
  const timersCtx = useContext(TimersContext);
  if (timersCtx === null) {
    throw new Error("error");
  }
  return timersCtx;
}
type TimersContextProviderProps = {
  children: ReactNode;
};
type StartAction = {
  type: "start_timers";
};
type StopAction = {
  type: "stop_timers";
};
type AddTimerAction = {
  type: "add_timer";
  payload: Timer;
};
type Action = StartAction | StopAction | AddTimerAction;
function timersReducer(state: TimersState, action: Action): TimersState {
  if (action.type === "start_timers") {
    return {
      ...state,
      isRunning: true,
    };
  }
  if (action.type === "stop_timers") {
    return {
      ...state,
      isRunning: false,
    };
  }
  if (action.type === "add_timer") {
    return {
      ...state,
      timers: [
        ...state.timers,
        { name: action.payload.name, duration: action.payload.duration },
      ],
    };
  }
  return state;
}

export default function TimerContextProvider({
  children,
}: TimersContextProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      dispatch({ type: "add_timer",payload:timerData });
    },
    startTimers() {
      dispatch({ type: "start_timers" });
    },
    stopTimers() {
      dispatch({ type: "stop_timers" });
    },
  };
  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}
