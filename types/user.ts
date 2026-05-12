export interface Role {
  name: string
}

export interface User {
  id: number
  username: string
  name: string
  isActive: boolean
  roles: Role[]
}