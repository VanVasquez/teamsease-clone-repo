import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import { useField, FieldHookConfig } from 'formik';

type Props = FieldHookConfig<string> & {
	label: string;
	placeholder?: string;
};

const InputField = ({ label, placeholder, ...props }: Props) => {
	const [field, meta] = useField(props);
	const hasError = Boolean(meta.touched && meta.error);
	return (
		<FormControl isInvalid={hasError}>
			<FormLabel
				htmlFor={field.name}
				fontWeight='bold'
				fontSize='xs'
				textTransform='uppercase'
			>
				{label}
			</FormLabel>
			<Input id={field.name} placeholder={placeholder} {...field} />
			<FormErrorMessage>{meta.error}</FormErrorMessage>
		</FormControl>
	);
};

export default InputField;
