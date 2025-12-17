export function getFormattedTime(datetime: string) {
    const date = new Date(datetime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

export function getFormattedDate(datetime: string) {
    const date = new Date(datetime);
    return date.toLocaleDateString();
}

export function getFormattedDateTime(datetime: string) {
  return new Date(datetime).toLocaleString();
}
