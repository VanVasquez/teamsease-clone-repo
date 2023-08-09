import { ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';
import { createClient as createWSClient } from 'graphql-ws';
import {
	Client,
	Provider,
	cacheExchange,
	fetchExchange,
	subscriptionExchange,
} from 'urql';

const wsClient = createWSClient({ url: 'ws://localhost:8080/graphql' });

const client = new Client({
	url: 'http://localhost:8080/graphql',
	exchanges: [
		cacheExchange,
		fetchExchange,
		subscriptionExchange({
			forwardSubscription(request) {
				const input = { ...request, query: request.query || '' };
				return {
					subscribe(sink) {
						const unsubscribe = wsClient.subscribe(input, sink);
						return { unsubscribe };
					},
				};
			},
		}),
	],
});

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
	<React.StrictMode>
		<ColorModeScript />
		<Provider value={client}>
			<App />
		</Provider>
	</React.StrictMode>
);
