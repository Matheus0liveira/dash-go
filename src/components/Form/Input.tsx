import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

export interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, ...rest },
  ref
) => {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        ref={ref}
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bg: 'gray.900',
        }}
        size="lg"
        {...rest}
      />
    </FormControl>
  );
};

export default forwardRef(Input);
