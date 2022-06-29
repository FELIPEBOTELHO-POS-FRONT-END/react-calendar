import { ICalendar, IEditingEvent, IEvent, IUser } from "../Interfaces/backend";

const BASE_URL = "http://localhost:8080";

export function getCalendarsEndpoint(): Promise<ICalendar[]> {
  return fetch(`${BASE_URL}/calendars`, { credentials: "include" }).then(
    handleResponse
  );
}

export function getEventsEndpoint(from: string, to: string): Promise<IEvent[]> {
  return fetch(
    `${BASE_URL}/events?date_gte=${from}&date_lte=${to}&_sort=date,time`,
    { credentials: "include" }
  ).then(handleResponse);
}

export function createEventEndpoint(event: IEditingEvent): Promise<IEvent[]> {
  return fetch(`${BASE_URL}/events`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then(handleResponse);
}
export function updateEventEndpoint(event: IEditingEvent): Promise<IEvent[]> {
  return fetch(`${BASE_URL}/events/${event.id}`, {
    credentials: "include",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then(handleResponse);
}

export function deleteEventEndpoint(eventId: number): Promise<void> {
  return fetch(`${BASE_URL}/events/${eventId}`, {
    credentials: "include",
    method: "DELETE",
  }).then(handleResponse);
}

export function getUserEndpoint(): Promise<IUser> {
  return fetch(`${BASE_URL}/auth/user`, { credentials: "include" }).then(
    handleResponse
  );
}

export function signInEndpoint(
  email: string,
  password: string
): Promise<IUser> {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}
export function signOutEndpoint(): Promise<IUser> {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  }).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
