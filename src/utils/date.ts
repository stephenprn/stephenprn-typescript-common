export const TODAY = new Date();

export const floorDayDate = (date: Date): Date => {
  date = new Date(date.toISOString());

  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};

export const floorMonthDate = (date: Date): Date => {
  date = new Date(date.toISOString());

  date = floorDayDate(date);
  date.setDate(1);

  return date;
};

export const ceilMonthDate = (date: Date): Date => {
  date = new Date(date.toISOString());

  date = floorDayDate(date);
  date.setMonth(date.getMonth() + 1);

  return date;
};

export const floorWeekDate = (date: Date): Date => {
  date = new Date(date.toISOString());

  date = floorDayDate(date);
  const day = date.getDay() || 7;

  if (day !== 1) {
    date.setHours(-24 * (day - 1));
  }

  return date;
};

export const getNbrDaysMonth = (date: Date): number => {
  date = new Date(date.toISOString());

  date.setMonth(date.getMonth() + 1);
  date.setDate(0);

  return date.getDate();
};

export const addDays = (
  date: Date,
  { daysNbr, monthsNbr }: { daysNbr?: number; monthsNbr?: number }
): Date => {
  date = new Date(date.toISOString());

  if (daysNbr != null) {
    date.setDate(date.getDate() + daysNbr);
  }

  if (monthsNbr != null) {
    date.setMonth(date.getMonth() + monthsNbr);
  }

  return date;
};

export enum DateFormat {
  STORAGE = 'STORAGE',
  HUMAN_READABLE = 'HUMAN_READABLE',
  ISO = 'ISO',
}

const DATE_FORMATS_SEPARATORS = {
  [DateFormat.HUMAN_READABLE.toString()]: '/',
  [DateFormat.STORAGE.toString()]: '-',
};

export const dateToString = (
  date: Date,
  {
    format = DateFormat.STORAGE,
    includeDay = true,
    shortYear = false,
  }: {
    format?: DateFormat;
    includeDay?: boolean;
    shortYear?: boolean;
  }
) => {
  if (format === DateFormat.ISO) {
    return date.toISOString();
  }

  let yearStr = String(date.getFullYear());

  if (shortYear) {
    yearStr = yearStr.slice(-2);
  }

  const monthStr =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : String(date.getMonth() + 1);
  const dayStr =
    date.getDate() < 10 ? `0${date.getDate()}` : '' + String(date.getDate());

  const separator = DATE_FORMATS_SEPARATORS[format.toString()];

  if (format === DateFormat.STORAGE) {
    return `${yearStr}${separator}${monthStr}${
      includeDay ? separator + dayStr : ''
    }`;
  }

  if (format === DateFormat.HUMAN_READABLE) {
    return `${
      includeDay ? dayStr + separator : ''
    }${monthStr}${separator}${yearStr}`;
  }
};

export const stringToDate = (
  dateString: string,
  {
    format = DateFormat.ISO,
  }: {
    format?: DateFormat;
  }
) => {
  let date!: Date;

  if (format === DateFormat.ISO) {
    date = new Date(dateString);
  }

  if ([DateFormat.STORAGE, DateFormat.HUMAN_READABLE].includes(format)) {
    const separator = DATE_FORMATS_SEPARATORS[format.toString()];

    let year!: number;
    let month!: number;
    let day!: number;

    if (format === DateFormat.STORAGE) {
      [year, month, day] = dateString
        .split(separator)
        .map((value) => Number(value));
    }

    if (format === DateFormat.HUMAN_READABLE) {
      [day, month, year] = dateString
        .split(separator)
        .map((value) => Number(value));
    }

    date = new Date(year, month - 1, day);
  }

  return floorDayDate(date);
};

export const secondsToDuration = (value: number) => {
  const hours = Math.floor(value / (60 * 60));
  const minutes = Math.floor((value - hours * 60 * 60) / 60);
  const seconds = Math.floor(value - hours * 60 * 60 - minutes * 60);

  return [hours, minutes, seconds];
};

export const formatDuration = (value: number) => {
  const [hours, minutes, seconds] = secondsToDuration(value);

  return [
    hours < 10 ? '0' + hours : String(Math.round(hours)),
    minutes < 10 ? '0' + minutes : String(Math.round(minutes)),
    seconds < 10 ? '0' + seconds : String(Math.round(seconds)),
  ].join(':');
};

export const getWeekNumber = (date: Date) => {
  date = new Date(date.toISOString());

  const dayNbr = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - dayNbr + 3);

  const firstThursday = date.valueOf();
  date.setMonth(0, 1);

  if (date.getDay() !== 4) {
    date.setMonth(0, 1 + ((4 - date.getDay() + 7) % 7));
  }

  return 1 + Math.ceil((firstThursday - date.getTime()) / 604800000);
};
