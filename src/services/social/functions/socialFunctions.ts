import moment from "moment";

export function formatToRelativeTime(date: string) {
  return moment(date).fromNow();
}
