import dayjs from "@/utils/dayJs"

export function formatTime(createdAt: string) {
  return dayjs().diff(dayjs(createdAt), "day") > 7
    ? dayjs(createdAt).format("dddd, D MMMM YYYY")
    : dayjs(createdAt).fromNow();
}
