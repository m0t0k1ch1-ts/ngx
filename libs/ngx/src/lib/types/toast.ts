export type ToastType = 'SUCCESS' | 'ERROR';

export type Toast = {
  id: number;
  type: ToastType;
  title: string;
  message: string;
  lifetime: number; // in milliseconds
};
