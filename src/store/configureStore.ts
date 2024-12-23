import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ReduxModule, ReduxModuleStore } from "types/ReduxModule";
import { createReducer as createRootReducer } from "./reducers";
import * as sagas from "./sagas";

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  const middlewares = [sagaMiddleware];

  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["app", "survey"],
  };

  const rootReducer = (asyncReducers = {}) => createRootReducer(asyncReducers);
  const persistedReducer = persistReducer(persistConfig, rootReducer());

  const store = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore redux-persist actions
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }).prepend(...middlewares),
    reducer: persistedReducer,
  }) as ReduxModuleStore;

  store.asyncReducers = {};
  store.asyncSagas = new Set();
  store.loadedModules = {};

  store.injectReducer = (key, asyncReducer) => {
    if (!store.asyncReducers[key]) {
      store.asyncReducers[key] = asyncReducer;
      store.replaceReducer(
        persistReducer(persistConfig, rootReducer(store.asyncReducers))
      );
    }
  };

  store.injectSaga = (saga) => {
    if (store.asyncSagas.has(saga)) {
      return;
    }
    store.asyncSagas.add(saga);
    runSaga(saga);
  };

  const loadModule = (module: ReduxModule) => {
    if (!module.id) {
      return;
    }

    if (!store.loadedModules[module.id]) {
      store.loadedModules[module.id] = module;

      if (module.reducerMap) {
        Object.entries(module.reducerMap).forEach(([reducerName, reducer]) => {
          store.injectReducer(reducerName, reducer);
        });
      }
      (module.sagas ?? []).forEach(store.injectSaga);
    }

    (module.initialActions ?? []).forEach(store.dispatch);
  };

  store.loadModule = (module) => {
    if (Array.isArray(module)) {
      module.forEach(store.loadModule);
      return;
    }
    loadModule(module);
  };

  Object.values(sagas).forEach(runSaga);

  // Create persistor for persisting the store
  const persistor = persistStore(store);

  return { store, persistor };
}

const { store, persistor } = configureAppStore();

export { store, persistor };

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
