/**
 * 日期时间格式化
 */
export const format = {
  dateTime,
  relativeTime,
}

function isInvalidDate(time: Date) {
  return Number.isNaN(time.getTime())
}

const dateDtf = new Intl.DateTimeFormat('zh', { dateStyle: 'short' })
const timeDtf = new Intl.DateTimeFormat('zh', { timeStyle: 'short', hourCycle: 'h23' })

/**
 * 格式化为绝对时间
 */
function dateTime(value: string) {
  const time = new Date(value)
  if (isInvalidDate(time)) {
    return value
  }
  return `${dateDtf.format(time)} ${timeDtf.format(time)}`
}

const rtf = new Intl.RelativeTimeFormat('zh')
const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ['second', 1],
  ['minute', 60],
  ['hour', 3600],
  ['day', 86400],
  ['month', 2592000],
  ['year', 31104000],
  ['year', Infinity],
]

/**
 * 格式化为相对时间
 */
function relativeTime(value: string) {
  const time = new Date(value)
  if (isInvalidDate(time)) {
    return value
  }
  let isAfter = false
  let duration = (Date.now() - time.getTime()) / 1000
  if (duration < 0) {
    duration = -duration
    isAfter = true
  }
  // -1 < time < 1
  let key: Intl.RelativeTimeFormatUnit | null = null
  for (let i = 0; i < units.length - 1; i++) {
    const prev = units[i]
    const next = units[i + 1]
    if (prev[1] <= duration && duration < next[1]) {
      duration = Math.floor(duration / prev[1])
      key = prev[0]
      break
    }
  }
  if (!key) {
    return isAfter ? '即将' : '刚刚'
  }
  if (isAfter) {
    return rtf.format(duration, key)
  }
  return rtf.format(-duration, key)
}
