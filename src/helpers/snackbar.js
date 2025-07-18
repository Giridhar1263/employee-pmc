import {
  createNotification, clearNotification,
} from "../store/slicers/Notification";

export function showSnackBar(dispatch, status, message) {
  return dispatch(createNotification({ status, message }));
}

export function hideSnackBar(dispatch) {
  return dispatch(clearNotification());
}
