export type FormError = {
  property: string;
  i18nMessage: I18nMessage | null;
  message: string;
};

type I18nMessage = {
  key: string;
  variables: string[] | null;
};
