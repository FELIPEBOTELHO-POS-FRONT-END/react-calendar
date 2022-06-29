import {
  Box,
  Icon,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { Dispatch, memo } from "react";
import { getToday } from "../helpers/dateFunctions";
import { ICalendar, IEvent } from "../Interfaces/backend";
import { ICalendarScreenAction } from "../reducers/CalendarScreenReducer";

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

const useStyles = makeStyles({
  table: {
    borderTop: "1px solid rgb(224, 224, 224)",
    minHeight: "100%",
    tableLayout: "fixed",
    "& td ~ td, & th ~ th": {
      borderLeft: "1px solid rgb(224, 224, 224)",
    },
    "& td": {
      verticalAlign: "top",
      overflow: "hidden",
      padding: "8px 4px",
    },
  },
  dayOfMonth: {
    display: "inline-block",
    fontWeight: 500,
    width: "24px",
    lineHeight: "24px",
    marginBottom: "4px",
    borderRadius: "50%",
    "&.today": {
      backgroundColor: "#3f51b5",
      color: "white",
    },
  },
  eventDay: {
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    whiteSpace: "nowrap",
    margin: "4px 0",
  },
  eventBackground: {
    display: "inline-block",
    color: "white",
    padding: "2px 4px",
    borderRadius: "4px",
  },
});

interface ICalendarProps {
  weeks: ICalendarCell[][];
  dispatch: Dispatch<ICalendarScreenAction>;
  // onClickDay: (date: string) => void;
  // onClickEvent: (event: IEvent) => void;
}
export const Calendar = memo(function (props: ICalendarProps) {
  const classes = useStyles();
  const { weeks } = props;

  function handleClick(evt: React.MouseEvent, date: string) {
    //Somente na area vazia
    if (evt.target === evt.currentTarget) {
      props.dispatch({ type: "new", payload: date });
    }
  }

  return (
    <TableContainer style={{ flex: 1 }} component={"div"}>
      <Table className={classes.table} aria-label="Simple table">
        <TableHead>
          <TableRow>
            {DAYS_OF_WEEK.map((day, index) => (
              <TableCell key={`${index}_${day}`} align="center">
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {weeks.map((week, i) => (
            <TableRow key={i}>
              {week.map((cell) => (
                <TableCell
                  key={cell.date}
                  align="center"
                  onClick={(me) => handleClick(me, cell.date)}
                >
                  <div
                    className={
                      classes.dayOfMonth +
                      (cell.date === getToday() ? " today" : "")
                    }
                  >
                    {cell.dayOfMonth}
                  </div>
                  {cell.events.map((event) => {
                    const color = event.calendar?.color || "#000";
                    return (
                      <button
                        key={event.id}
                        className={classes.eventDay}
                        onClick={() =>
                          props.dispatch({ type: "edit", payload: event })
                        }
                      >
                        {event.time && (
                          <>
                            <Icon style={{ color }} fontSize="inherit">
                              watch_later
                            </Icon>
                            <Box margin="0 4px" component="span">
                              {event.time}
                            </Box>
                          </>
                        )}
                        {event.time ? (
                          <span>{event.desc}</span>
                        ) : (
                          <span
                            className={classes.eventBackground}
                            style={{ backgroundColor: color }}
                          >
                            {event.desc}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export type IEventWithCalendar = IEvent & { calendar: ICalendar };

export interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEventWithCalendar[];
}
