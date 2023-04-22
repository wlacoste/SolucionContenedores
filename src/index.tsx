import { createRoot } from "react-dom/client";
import { StyleSystemProvider } from "@architecture-it/stylesystem";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "store/store";

import rum from "./monitor";
import App from "./App";
import { msalInstance } from "./msalInstance";

rum.setInitialPageLoadName("Home");

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <StyleSystemProvider>
        <CssBaseline />
        <App msalInstance={msalInstance} />
      </StyleSystemProvider>
    </Provider>
  </BrowserRouter>
);
