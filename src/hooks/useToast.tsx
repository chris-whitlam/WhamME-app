import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ToastType } from '../types';
import { setToast as setToastRedux } from '../store/slices/toastSlice';

export const useToast = () => {
  const dispatch = useAppDispatch();
  const { toast } = useAppSelector((state) => state.toast);

  const showError = (message: string) =>
    dispatch(
      setToastRedux({
        message,
        type: ToastType.ERROR,
        duration: 3000,
        time: new Date().valueOf()
      })
    );

  return {
    toast,
    showError
  };
};
