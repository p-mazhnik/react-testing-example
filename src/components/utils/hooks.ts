import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";

interface IBind<S> {
  value: S,
  onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
}

type IUseInputResult<S> = [S, Dispatch<SetStateAction<S>>, IBind<S>, () => void, ];

export const useInput = (initialState: string | (() => string)): IUseInputResult<string> => {
  const [value, setValue] = useState(initialState);
  const reset = () => setValue(initialState);
  const bind = {
    value,
    onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setValue(event.target.value);
    }
  }

  return [
    value,
    setValue,
    bind,
    reset,
  ];
};
