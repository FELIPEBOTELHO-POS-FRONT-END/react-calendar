import { Box, Button } from "@material-ui/core";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "../components/Calendar";
import { CalendarHeader } from "../components/CalendarHeader";
import { CalendarsView } from "../components/CalendarsView";
import EventFormDialog from "../components/EventFormDialog";
import { getToday } from "../helpers/dateFunctions";
import { useCalendarScreenState } from "../hooks/CalendarScreenHooks";

export default function CalendarScreen() {
  const { month } = useParams<{ month: string }>();

  const {
    weeks,
    calendars,
    dispach,
    refreshEvents,
    calendarsSelected,
    editingEvent,
  } = useCalendarScreenState(month);

  const closeDialog = useCallback(() => {
    dispach({ type: "closeDialog" });
  }, [dispach]);

  return (
    <Box display="flex" height="100%" alignItems="stretch">
      <Box
        borderRight="1px solid rgb(224,224,224)"
        width="14em"
        padding="8px 16px"
      >
        <h2>Agenda React</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispach({ type: "new", payload: getToday() })}
        >
          Novo evento
        </Button>

        <CalendarsView
          calendars={calendars}
          dispatch={dispach}
          calendarsSelected={calendarsSelected}
        />
      </Box>

      <Box flex="1" display="flex" flexDirection="column">
        <CalendarHeader month={month} />
        <Calendar weeks={weeks} dispatch={dispach} />
        <EventFormDialog
          event={editingEvent}
          calendars={calendars}
          onCancel={() => closeDialog()}
          onSave={() => {
            closeDialog();
            refreshEvents();
          }}
        />
      </Box>
    </Box>
  );
}
