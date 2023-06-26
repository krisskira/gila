export type ApiHook<T> = [
  T | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (args?: any) => Promise<any>,
  { loading?: boolean; error?: string; reset?: () => void }
];

export interface Notification {
  content: string;
  categoryCode: string;
}
export interface Category {
  code: string;
  name: string;
}

export interface Chanel {
  code: string;
  name: string;
}


export interface Message {
  channelCode: string;
  content: string;
  createdAt: string;
  category: Category;
}

export interface MessageLog {
  id?: number
  channel: string
  category: string
  message: string
  user: string
  createdAt?: string
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  channels: Chanel[];
  subscribed: Category[];
  messages: Message[];
}
