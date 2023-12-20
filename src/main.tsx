import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import "@mantine/core/styles.css";
import "./style.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
	<MantineProvider defaultColorScheme="dark">
		<ModalsProvider>
			<App />
		</ModalsProvider>
	</MantineProvider>
)
