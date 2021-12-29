import {
  IUtilState,
  IGetThemeSelector,
  IGetAgentSelector,
  IGetLanguageSelector,
  ISendEventParentSelector,
  IPopupDataSelector,
  IMessageAppSelector,
  IHistorySelector,
} from "./interface";
import { initialUtilState } from "./reducer";

const configurationSelector = (state: IUtilState = initialUtilState) => {
  const ong = state["configuration"] || undefined;
  return ong;
};

export const getConfigurationSelector: IGetLanguageSelector = (
  state: IUtilState,
) => configurationSelector(state);

const languageSelector = (state: IUtilState = initialUtilState) => {
  const ong = state["language"] || undefined;
  return ong;
};

export const getLanguageSelector: IGetLanguageSelector = (state: IUtilState) =>
  languageSelector(state);

const themeSelector = (state: IUtilState = initialUtilState) => {
  const ong = state["theme"] || undefined;
  return ong;
};

export const getThemeSelector: IGetThemeSelector = (state: IUtilState) =>
  themeSelector(state);

const messageAppSelector = (state: IUtilState = initialUtilState) => {
  const ong = state["messageApp"] || undefined;
  return ong;
};

export const getMessageAppSelector: IMessageAppSelector = (state: IUtilState) =>
  messageAppSelector(state);

const loadingSelector = (state: IUtilState = initialUtilState) => {
  const ong = state["loading"] || undefined;
  return ong;
};

export const getLoadingSelector: IMessageAppSelector = (state: IUtilState) =>
  loadingSelector(state);
