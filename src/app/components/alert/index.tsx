import { useToast } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectors, snackbarActions } from "@/app/data/snackbar/slice";
import { useEffect } from "react";

export const ToastComponent = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const message = useAppSelector(selectors.selectMessage);
  const open = useAppSelector(selectors.selectOpen);
  const typeColor = useAppSelector(selectors.selectTypeColor);

  useEffect(() => {
    if (message) {
      toast({
        title: message,
        status: typeColor,
        duration: 5000,
        isClosable: true,
        variant: "subtle",
        containerStyle: {
          fontSize: "14px",
        },
      });

      dispatch(snackbarActions.closeSnackBar());
    }
  }, [message, dispatch, toast]);
  return null;
};
