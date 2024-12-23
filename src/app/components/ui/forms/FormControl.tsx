import {
  Box,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Icon,
  Input,
  InputElementProps,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FieldError, Merge } from "react-hook-form";

import { FormError } from "@/types/i18n";
import { IconType } from "react-icons";

export type SVFormControlProps = InputProps & {
  label?: string;
  formControlProps?: FormControlProps;
  inputProps?: InputProps | InputElementProps;
  children?: ReactNode;
  error?:
    | FieldError
    | Merge<FieldError, (FieldError | undefined)[]>
    | FormError
    | null;
  isRequired?: boolean;
  placeholder?: string;
  "data-cy"?: string;
  fontFamily?: string;
  formLabelProps?: FormLabelProps;
  inputRight?: IconType;
  rightToggle?: VoidFunction;
};

export function SVFormControl({
  label,
  formControlProps,
  inputProps,
  children,
  error,
  isRequired = false,
  fontFamily,
  formLabelProps,
  inputRight,
  rightToggle,
  ...rest
}: SVFormControlProps) {
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={!(error === undefined || error === null)}
      data-cy={!inputProps ? rest["data-cy"] : null}
      {...formControlProps}
    >
      {label && (
        <FormLabel
          mb={1}
          color="primary.500"
          fontSize={{ sm: "sm", md: "md" }}
          {...formLabelProps}
        >
          {label}
        </FormLabel>
      )}
      {inputProps ? (
        <InputGroup>
          <Input
            {...rest}
            data-cy={rest["data-cy"]}
            aria-label={`input-${label}`}
            autoComplete={rest.type === "password" ? "new-password" : "off"}
            focusBorderColor="brand.500"
            _placeholder={{ color: "primary.200" }}
            {...inputProps}
          />
          {inputRight && (
            <InputRightElement onClick={rightToggle}>
              <Icon as={inputRight} />
            </InputRightElement>
          )}
        </InputGroup>
      ) : (
        <Box fontFamily={fontFamily || ""}>{children}</Box>
      )}
      {error && <FormErrorMessage>{error && error.message}</FormErrorMessage>}
    </FormControl>
  );
}
