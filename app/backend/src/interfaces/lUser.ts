export interface UserBody {
  email: string,
  password: string
}

export interface UserAnswer {
  code: number,
  message?:string,
  token?:string
}

export interface auth extends UserAnswer {
  role?: string
}
