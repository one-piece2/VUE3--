import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
export function formattime(time: string) {
  return dayjs.utc(time).utcOffset(8).format('YYYY 年 MM-DD HH:MM:ss');
}
