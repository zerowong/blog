export * from './filters'

export function getImageDataURL(img: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
      const target = event.target
      if (target?.readyState === 2 && typeof target.result === 'string') {
        resolve(target.result)
      } else {
        reject(new Error('read img file failed or type of result is not string'))
      }
    })
    reader.readAsDataURL(img)
  })
}

/**
 * 去除文件扩展名
 */
export function removeExt(fileName: string) {
  const dotIndex = fileName.lastIndexOf('.')
  return fileName.slice(0, dotIndex)
}

/**
 * 截取文件扩展名(含`.`)
 */
export function getExt(fileName: string) {
  const dotIndex = fileName.lastIndexOf('.')
  if (dotIndex === -1) {
    return null
  }
  return fileName.slice(dotIndex)
}

export function hasProp(obj: unknown, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export const formHelper = {
  async getValues(target: EventTarget | HTMLFormElement, names: string[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {}
    if (!(target instanceof HTMLFormElement)) {
      return obj
    }
    const formData = new FormData(target)
    for (const name of names) {
      const value = formData.get(name)
      if (!value) {
        continue
      }
      if (value instanceof File) {
        obj[name] = await value.text()
      } else {
        obj[name] = value
      }
    }
    return obj
  },
  reset(target: EventTarget | HTMLFormElement) {
    if (target instanceof HTMLFormElement) {
      const inputs = target.querySelectorAll('input')
      inputs.forEach((item) => {
        if (item.type === 'file') {
          return
        }
        item.value = ''
      })
    }
  },
}
