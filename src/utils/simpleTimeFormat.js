const leadingZero = int => `${(int < 10 ? '0' : '')}${int}`;

export default date =>
`${date.getFullYear()}-${leadingZero(date.getMonth() + 1)}-${leadingZero(date.getDate())}T${leadingZero(date.getHours())}:${leadingZero(date.getMinutes())}+02:00`;
