import {
	Button,
	Heading,
	NumberInput,
	NumberInputField,
	SimpleGrid,
	Text,
	VStack,
	useRadioGroup,
} from '@chakra-ui/react';
import RadioCard from './RadioCard';
import { useState } from 'react';

interface Props {
	initialCount: number;
	next: (value: { count: number }) => void;
}

const CountSelection = ({ initialCount, next }: Props) => {
	const options = ['1', '20', '50', '100'];
	const [pounds, setPounds] = useState(initialCount.toString());
	const [customAmount, setCustomAmount] = useState(
		'' + (options.includes(pounds) ? '' : pounds)
	);

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'pounds',
		value: pounds,
		onChange: (nextValue) => {
			setCustomAmount('');
			setPounds(nextValue);
		},
	});

	const group = getRootProps();

	const nextStep = () => {
		next({ count: parseInt(pounds) });
	};

	return (
		<VStack spacing={4} align='stretch'>
			<Heading as='h3' size='md' textTransform='uppercase'>
				join #teamseas
			</Heading>
			<Text fontSize='md' fontWeight='bold'>
				$1 removes a pound of trash
			</Text>
			<SimpleGrid columns={2} spacing={2} mt={5} {...group}>
				{options.map((value) => {
					const radio = getRadioProps({ value });
					return (
						<RadioCard key={value} {...radio}>
							{value} pounds
						</RadioCard>
					);
				})}
			</SimpleGrid>
			<NumberInput
				onFocus={() => setPounds('')}
				onChange={(value) => {
					setPounds(value);
					setCustomAmount(value);
				}}
				value={customAmount}
			>
				<NumberInputField placeholder='Other amount' />
			</NumberInput>
			<hr />
			<Button
				width='100%'
				colorScheme='orange'
				size='lg'
				borderRadius='full'
				onClick={nextStep}
			>
				Next
			</Button>
		</VStack>
	);
};

export default CountSelection;
