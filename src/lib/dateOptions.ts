import dayjs from 'dayjs'

export const dateOptions = [
  {
    label: '今天',
    value: 1,
    conditions: {
      gte: dayjs().startOf('day'),
      lte: dayjs().endOf('day'),
    },
  },
  {
    label: '昨天',
    value: 2,
    conditions: {
      gte: dayjs().subtract(1, 'day').startOf('day'),
      lte: dayjs().subtract(1, 'day').endOf('day'),
    },
  },
  {
    label: '本周',
    value: 3,
    conditions: {
      gte: dayjs().startOf('week'),
      lte: dayjs().endOf('week'),
    },
  },
  {
    label: '上周',
    value: 4,
    conditions: {
      gte: dayjs().subtract(1, 'week').startOf('week'),
      lte: dayjs().subtract(1, 'week').endOf('week'),
    },
  },
  {
    label: '本月',
    value: 5,
    conditions: {
      gte: dayjs().startOf('month'),
      lte: dayjs().endOf('month'),
    },
  },
  {
    label: '上月',
    value: 6,
    conditions: {
      gte: dayjs().subtract(1, 'month').startOf('month'),
      lte: dayjs().subtract(1, 'month').endOf('month'),
    },
  },
]
