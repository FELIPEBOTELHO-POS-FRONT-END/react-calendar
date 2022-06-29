import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import { Dispatch, memo } from "react";
import { ICalendar } from "../Interfaces/backend";
import { ICalendarScreenAction } from "../reducers/CalendarScreenReducer";

interface ICalendarViewProps {
  calendars: ICalendar[];
  dispatch: Dispatch<ICalendarScreenAction>;
  calendarsSelected: boolean[];
}

export const CalendarsView = memo(function (props: ICalendarViewProps) {
  const { calendars, calendarsSelected } = props;

  return (
    <Box marginTop="64px">
      <h3>Agendas</h3>
      {calendars.map((c, i) => (
        <div key={c.id}>
          <FormControlLabel
            control={
              <Checkbox
                style={{ color: c.color }}
                checked={calendarsSelected[i]}
                onChange={() =>
                  props.dispatch({ type: "toggleCalendar", payload: i })
                }
              />
            }
            label={c.name}
          />
        </div>
      ))}
    </Box>
  );
});
