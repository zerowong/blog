class MyWebSocket {
  private nativeWebSocket: WebSocket
  private url: string
  // TODO: 监听器类型
  private listeners: ((ev: any) => void)[]

  constructor(url: string) {
    this.nativeWebSocket = new WebSocket(url)
    this.url = url
    this.listeners = []
  }

  addEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ) {
    this.nativeWebSocket.addEventListener(type, listener, options)
    this.listeners.push(listener)
  }

  send(data: string) {
    this.nativeWebSocket.send(data)
  }

  reconnect() {
    this.nativeWebSocket = new WebSocket(this.url)
  }
}

export default MyWebSocket
