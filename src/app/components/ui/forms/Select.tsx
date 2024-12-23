import { OptionProps, Props, Select, components } from "chakra-react-select";

import { CustomerList, CustomerListProps as Customer } from "./OptionDetails";

function CustomerDetailsOption(props: OptionProps) {
  const { data } = props;
  const { value, label, description, icon } = data as Customer;
  return (
    <components.Option {...props}>
      <CustomerList
        description={description}
        label={label}
        value={value}
        icon={icon}
      />
    </components.Option>
  );
}

export type SelectProps = {
  customers: Customer[];
  selectProps?: Props;
  onSelect?: (users: Customer) => void;
};

export function SVSelect({ customers, selectProps, onSelect }: SelectProps) {
  return (
    <Select
      options={customers}
      getOptionLabel={(option) => (option as Customer).label}
      getOptionValue={(option) => (option as Customer).value}
      isClearable={false}
      menuPortalTarget={document.body}
      onChange={(newValue) => {
        onSelect?.(newValue as Customer);
      }}
      components={{
        Option: CustomerDetailsOption,
      }}
      styles={{
        option: (base, state) => ({
          ...base,
          width: "calc(100% - 2px)",
          margin: "auto",
          backgroundColor: state.isFocused ? "gray.50" : "transparent",
          ":active": { backgroundColor: "gray.100" },
          ":hover": { cursor: "pointer", backgroundColor: "#f9f9f9" },
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 1600,
        }),
      }}
      chakraStyles={{
        dropdownIndicator: (provided) => ({
          ...provided,
          bg: "transparent",
          color: "gray.500",
        }),
      }}
      {...selectProps}
    />
  );
}
