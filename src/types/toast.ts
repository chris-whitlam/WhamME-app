export enum ToastType {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export interface Toast {
  message: string;
  type: ToastType;
  duration: number;
  time: number; // used to retrigger message
}
