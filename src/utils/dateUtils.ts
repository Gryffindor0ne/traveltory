import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export const koreanDateFormatter = (date: string | undefined) => {
  const now = dayjs();
  const writtenDate = dayjs(date);

  const intervalM = now.diff(writtenDate, "m");
  const intervalH = now.diff(writtenDate, "h");
  const intervalD = now.diff(writtenDate, "d");
  const intervalW = now.diff(writtenDate, "w");
  const intervalMonth = now.diff(writtenDate, "M");

  if (intervalM < 1) {
    return "방금 전";
  } else if (intervalM < 60) {
    return `${intervalM}분 전`;
  } else if (intervalH < 24) {
    return `${intervalH}시간 전`;
  } else if (intervalD < 7) {
    return `${intervalD}일 전`;
  } else if (intervalW <= 4) {
    return `${intervalW}주 전`;
  } else if (intervalMonth < 4) {
    return `${intervalMonth}달 전`;
  } else {
    return writtenDate.format("YYYY년 MM월 DD일");
  }
};
