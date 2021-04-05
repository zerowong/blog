export interface User {
  readonly _id: string
  readonly name: string
  readonly avatar: string
  readonly mail: string
  readonly createdAt: string
  readonly lastActiveAt: string
  readonly role: 'admin' | 'normal'
}
