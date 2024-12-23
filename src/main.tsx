import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import "./app/locales/i18n";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./app/config/theme";
import { ToastComponent } from "@/app/components/alert";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider
    theme={theme}
    toastOptions={{ defaultOptions: { position: "top" } }}
  >
    <Provider store={store}>
      <HelmetProvider>
        <App />
        <ToastComponent />
      </HelmetProvider>
    </Provider>
  </ChakraProvider>
);
