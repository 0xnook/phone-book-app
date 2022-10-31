import { forwardRef } from "react";

import type { ChangeEvent, RefCallback } from "react";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";

import { IMaskInput } from "react-imask";

interface CustomInputProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskPhone = forwardRef<HTMLElement, CustomInputProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="#00-000-0000"
        definitions={{
          "#": /[1-9]/,
        }}
        unmask={true}
        inputRef={ref as RefCallback<HTMLInputElement>}
        onAccept={(value: any) => {
          onChange({ target: { name: props.name, value } });
        }}
        overwrite
      />
    );
  }
);

type MaskedPhoneInputProps = {
  value: string;
  errorMsg: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function MaskedPhoneInput({
  value,
  errorMsg,
  onChange,
}: MaskedPhoneInputProps) {
  return (
    <FormControl variant="outlined">
      <InputLabel
        htmlFor="formatted-text-mask-input"
        variant="outlined"
        error={errorMsg !== ""}
      >
        Phone number
      </InputLabel>
      <OutlinedInput
        label="Phone number"
        value={value}
        onChange={onChange}
        name="phone"
        type="phone"
        id="formatted-text-mask-input"
        inputComponent={TextMaskPhone as any}
        error={errorMsg !== ""}
      />
      {errorMsg && (
        <FormHelperText error id="phone-error">
          {errorMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default MaskedPhoneInput;
