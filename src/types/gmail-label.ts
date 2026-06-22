
export type GmailLabel = {
  id: string,
  labelListVisibility: 'labelShow' | 'labelHide' | 'labelShowIfUnread',
  messageListVisibility: 'show' | 'hide',
  messagesTotal: number,
  messagesUnread: number,
  name: string,
  threadsTotal: number,
  threadsUnread: number,
  type: 'user' | 'system',
  color?: LabelColor
}

export type LabelColor = {
  textColor: string,
  backgroundColor: string
}
