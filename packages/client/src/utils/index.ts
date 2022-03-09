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
