import { SVFormControl } from "@/app/components/ui/forms/FormControl";
import { Stack } from "@chakra-ui/react";
import { GoQuestion } from "react-icons/go";

import { useTranslation } from "react-i18next";
import Preview from "@/app/components/card/Preview";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Question } from "..";

const InputOption = () => {
  const [t] = useTranslation();
  const { register, watch } = useFormContext();
  const formValue = watch();

  return (
    <Stack spacing={6}>
      <SVFormControl
        label={t("questions.inputPlaceholder")}
        inputProps={{
          ...register("question"),
        }}
        inputRight={GoQuestion}
      />
      <Preview>
        <SVFormControl
          inputProps={{
            value: formValue.question,
          }}
          placeholder="Placeholder Text appears here"
        />
      </Preview>
    </Stack>
  );
};

export default InputOption;
