import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import type { RootState, store } from "store/store";
import { Provider } from "react-redux";
import { reducers } from "store/reducers";
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: typeof store;
  basename?: string;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: reducers, preloadedState }),
    basename = undefined,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <BrowserRouter basename={basename}>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
