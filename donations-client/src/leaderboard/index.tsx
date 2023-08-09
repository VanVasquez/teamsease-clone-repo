import {
	Box,
	Heading,
	Radio,
	RadioGroup,
	Stack,
	VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import LeaderboardItem from './LeaderboardItem';
import { Donation } from '../types';
import { useQuery } from 'urql';

const DonationQuery = `
  query Donations($orderBy: OrderByParams) {
    donations(orderBy: $orderBy) {
      count
      id
      displayName
      createdAt
      message
      team
    }
  }
`;

type DonationsQueryRes = {
	donations: Donation[];
};

type Props = {};

const Leaderboard = (props: Props) => {
	const [field, setField] = useState('createdAt');
	const [{ data, fetching, error }] = useQuery<DonationsQueryRes>({
		query: DonationQuery,
		variables: {
			orderBy: {
				direction: 'desc',
				field,
			},
		},
	});

	if (error) return <p>Oh no...{error.message}</p>;
	if (fetching || !data) return <p>loading</p>;
	return (
		<Box w='100%'>
			<VStack spacing={4}>
				<Heading textTransform='uppercase' as='h1' size='2xl'>
					Leaderboard
				</Heading>
				<RadioGroup onChange={setField} value={field}>
					<Stack direction='row'>
						<Radio value='createdAt'>Most Recent</Radio>
						<Radio value='count'>Most Count</Radio>
					</Stack>
				</RadioGroup>
				{data.donations.map((donation) => (
					<LeaderboardItem key={donation.id} donation={donation} />
				))}
			</VStack>
		</Box>
	);
};

export default Leaderboard;
