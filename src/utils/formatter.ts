import dayjs from 'dayjs'

export const ymd = (date: any): string => {
  return date ? dayjs(date).format('YYYY-MM-DD') : ''
}
