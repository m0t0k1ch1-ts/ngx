const VALID_TOAST_TYPES = ['ERROR'] as const;

export type ToastType = (typeof VALID_TOAST_TYPES)[number];

export type Toast = {
  id: number;
  type: ToastType;
  title: string;
  message: string;
  lifetime: number; // in milliseconds
};
