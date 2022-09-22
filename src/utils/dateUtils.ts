import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export const koreanDateFormatter = (date: string | undefined) => {
  const now = dayjs();
  const writtenDate = dayjs(date);

  const intervalM = now.diff(writtenDate, "m");
  const intervalH = now.diff(writtenDate, "h");
  const intervalD = now.diff(writtenDate, "d");

  if (intervalM < 1) {
    return "방금 전";
  } else if (intervalM < 60) {
    return `${intervalM}분 전`;
  } else if (intervalH < 24) {
    return `${intervalH}시간 전`;
  } else if (intervalD < 30) {
    return `${intervalD}일 전`;
  } else {
    return writtenDate.format("YYYY년 MM월 DD일");
  }
};

export const dateRangeCheck = (range: string[], targetDate: string) => {
  const [startDate, endDate] = range;

  return dayjs(targetDate).isBetween(startDate, endDate);
};
