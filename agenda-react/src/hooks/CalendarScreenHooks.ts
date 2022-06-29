import { useEffect, useMemo, useReducer } from "react";
import { getCalendarsEndpoint, getEventsEndpoint } from "../api/apiRequests";
import { ICalendarCell, IEventWithCalendar } from "../components/Calendar";
import { ICalendar, IEvent } from "../Interfaces/backend";
import { reducer } from "../reducers/CalendarScreenReducer";

export function useCalendarScreenState(month: string) {
  const [state, dispach] = useReducer(reducer, {
    calendars: [],
    calendarsSelected: [],
    events: [],
    editingEvent: null,
  });

  const { events, calendars, calendarsSelected, editingEvent } = state;

  const weeks = useMemo(() => {
    return generateCalendar(
      month + "-01",
      events,
      calendars,
      calendarsSelected
    );
  }, [calendars, calendarsSelected, events, month]);
  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    Promise.all([
      getCalendarsEndpoint(),
      getEventsEndpoint(firstDate, lastDate),
    ]).then(([calendars, events]) => {
      dispach({
        type: "load",
        payload: {
          events,
          calendars,
        },
      });
    });
  }, [firstDate, lastDate]);

  function refreshEvents() {
    getEventsEndpoint(firstDate, lastDate).then((events) => {
      dispach({
        type: "load",
        payload: { events },
      });
    });
  }

  return {
    weeks,
    calendars,
    dispach,
    refreshEvents,
    calendarsSelected,
    editingEvent,
  };
}

function generateCalendar(
  date: string,
  allEvents: IEvent[],
  calendars: ICalendar[],
  calendarsSelected: boolean[]
): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(`${date}T12:00:00`);
  const currentMonth = jsDate.getMonth();

  const currentDay = new Date(jsDate.valueOf());
  currentDay.setDate(1);
  const dayOfWeek = currentDay.getDay();
  currentDay.setDate(1 - dayOfWeek);
  do {
    const week: ICalendarCell[] = [];
    for (let i = 0; i < 7; i++) {
      const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, "0");
      const dayStr = currentDay.getDate().toString().padStart(2, "0");

      const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`;
      const events: IEventWithCalendar[] = [];
      for (const event of allEvents) {
        if (event.date === isoDate) {
          const calIndex = calendars.findIndex(
            (c) => c.id === event.calendarId
          );
          if (calendarsSelected[calIndex]) {
            events.push({ ...event, calendar: calendars[calIndex] });
          }
        }
      }

      week.push({
        dayOfMonth: currentDay.getDate(),
        date: isoDate,
        events,
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
}
