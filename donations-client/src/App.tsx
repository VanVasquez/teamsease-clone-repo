import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/300.css';
import {
	ChakraProvider,
	Box,
	Text,
	VStack,
	Grid,
	Heading,
	extendTheme,
} from '@chakra-ui/react';
import { Logo } from './Logo';
import Counter from './donations/counter';
import { useQuery, useSubscription } from 'urql';
import Leaderboard from './leaderboard';
import DonationWizard from './donations/DonationWizard';

const TotalDonationQuery = `
	query Query {
		totalDonations
	}
`;

const TotalUpdatedQuery = `
	subscription Subscription {
		totalUpdated {
			total
		}
	}
`;

const handleSubscription = (prev: any, newTotal: any) => {
	return newTotal?.totalUpdated?.total;
};

const theme = extendTheme({
	fonts: {
		heading: 'Montserrat',
		body: 'Montserrat',
	},
});

export const App = () => {
	const [res] = useSubscription(
		{ query: TotalUpdatedQuery },
		handleSubscription
	);
	const [{ data, fetching, error }] = useQuery({
		query: TotalDonationQuery,
	});
	if (fetching) return <p>loading</p>;
	if (error) return <p>Oh no...{error.message}</p>;
	return (
		<ChakraProvider theme={theme}>
			<Box textAlign='center' fontSize='xl'>
				<Grid minH='100vh' p={3} bg='gray.50'>
					<VStack spacing={8}>
						<Logo h='32' pointerEvents='none' />
						<Heading as='h1' size='xl'>
							JOIN THE MOVEMENT!
						</Heading>
						<Text>
							The team is growing everyday and scoring wins for the planet.
							<br /> Remove trash with us and track our progress!
						</Text>
						<Heading as='h2' size='4xl'>
							<Counter from={0} to={res.data || data.totalDonations} />
						</Heading>
						<DonationWizard />
						<Leaderboard />
					</VStack>
				</Grid>
			</Box>
		</ChakraProvider>
	);
};
