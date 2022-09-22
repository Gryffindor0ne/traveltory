import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export const koreanDateFormatter = (date: string | undefined) => {
  const now = dayjs();
  const writtenDate = dayjs(date);

  const intervalM = now.diff(writtenDate, "m");
  const intervalH = now.diff(writtenDate, "h");

  if (intervalM < 1) {
    return "방금 전";
  }
  if (intervalM < 60) {
    return `${intervalM}분 전`;
  }
  if (intervalH < 24) {
    return `${intervalH}시간 전`;
  }
  return writtenDate.format("YYYY년 MM월 DD일");
};

export const dateRangeCheck = (range: string[], targetDate: string) => {
  const [startDate, endDate] = range;

  return dayjs(targetDate).isBetween(startDate, endDate);
};
