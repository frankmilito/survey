import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { router } from "./app/routes";
import { appActions } from "./app/data/app/slices/slice";
import { surveyActions } from "./app/data/app/slices/surveySlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appActions.hydrate());
    dispatch(surveyActions.hydrate());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
