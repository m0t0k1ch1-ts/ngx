export type ToastType = 'SUCCESS' | 'ERROR';

export type Toast = {
  id: number;
  containerID?: number | string;
  type: ToastType;
  title: string;
  message: string;
  lifetime: number; // in milliseconds
};
