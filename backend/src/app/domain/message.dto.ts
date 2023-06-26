export interface MessageInputDTO {
  content: string
  categoryId: string
}

export interface MessageOutputDTO {
  user: {
    name: string
  }
  message: {
    date: string
    channels: Array<{
      code: string
      name: string
    }>
    content: string
  }
}
