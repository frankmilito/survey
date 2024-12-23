import { SVFormControl } from "@/app/components/ui/forms/FormControl";
import { Stack, Textarea } from "@chakra-ui/react";
import { GoQuestion } from "react-icons/go";

import { useTranslation } from "react-i18next";
import Preview from "@/app/components/card/Preview";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  inputTextArea: z.string(),
});
type Schema = z.infer<typeof schema>;
const InputTextAreaOption = () => {
  const [t] = useTranslation();
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const formValue = watch();
  return (
    <Stack spacing={6}>
      <SVFormControl
        label={t("questions.inputTextAreaPlaceholder")}
        inputProps={{
          ...register("inputTextArea"),
        }}
        error={errors.inputTextArea}
        inputRight={GoQuestion}
      />
      <Preview>
        <SVFormControl>
          <Textarea
            value={formValue.inputTextArea}
            focusBorderColor="brand.500"
            rows={8}
            placeholder="Placeholder Text Appears here"
            _placeholder={{ color: "primary.200" }}
          />
        </SVFormControl>
      </Preview>
    </Stack>
  );
};

export default InputTextAreaOption;
