import React, { useEffect, useRef, useState } from 'react';
import { ActionIcon, Box, Button, Group, Paper, SimpleGrid, Stack, Text, Title, Tooltip } from "@mantine/core";
import { PlayerColumn } from "./game/PlayerColumn";
import { Board } from "./game/Board";
import { useMobile, randomBoard, digits, findWinner } from "./util";
import { useHotkeys } from "@mantine/hooks";
import { IconExternalLink, IconReload, IconCrown } from "@tabler/icons-react";

import winSfx from "./assets/win.mp3";
import moveSfx from "./assets/play_move.wav";
import capturedSfx from "./assets/captured.wav";

export interface Player {
	color: string,
	selectedNumber: number | null,
	wins: number[],
}

export interface GameInterface {
	board: number[][],
	players: Player[],
}

const Game = React.createContext<GameInterface>({
	board: [],
	players: [],
});

const createPlayers = () => [
	{ color: "indigo.9", selectedNumber: null, wins: [] },
	{ color: "teal.9", selectedNumber: null, wins: [] },
];

const swap = (n: number) => n === 0 ? 1 : 0;

const App = () => {
	const [allowRetake] = useState<boolean>(false);
	const [turn, setTurn] = useState<0 | 1>(Math.round(Math.random()) as (0 | 1));
	const [players, setPlayers] = useState<Player[]>(createPlayers());
	const [board, setBoard] = useState<number[][]>(randomBoard());
	const [gameState, setGameState] = useState<"game" | "ended">("game");
	const [winningPlayer, setWinningPlayer] = useState<0 | 1 | null>(null);

	const winSfxRef = useRef(new Audio(winSfx));

	useHotkeys(digits().map(d => (
		[d.toString(), () => {
			playMove(d);
		}]
	)))

	useEffect(() => {
		if(gameState == "ended") {
			winSfxRef.current.play();
		}
	}, [gameState]);

	const restart = () => {
		setPlayers(createPlayers());
		setBoard(randomBoard());
		setWinningPlayer(null);
		setGameState("game");
	}

	const playMove = (n: number) => {
		if(gameState == "ended") return;
		let otherSel = players[swap(turn)].selectedNumber;
		if(otherSel === null) {
			// first move
			setTurn(t => {
				setPlayers(ps => ps.map((p, i) => (
					i === t ? (
						{
							...p,
							selectedNumber: n,
						}
					) : (
						p
					)
				)))
				return swap(t);
			});
			new Audio(moveSfx).play();
			return;
		}

		let win = otherSel * n;
		setTurn(t => {
			setPlayers(ps => {
				let players = ps.map((p, i) => (
					i === t ? (
						{
							...p,
							selectedNumber: n,
							wins: [
								...p.wins,
								...(ps.some(b => b.wins.includes(win)) ? (allowRetake ? [win] : []) : [win]),
							],
						}
					) : (
						{
							...p,
							wins: p.wins.filter(w => allowRetake ? (
								win !== w
							) : true),
						}
					)
				));

				if(
					!ps.some(p => p.wins.includes(win))
					&& players.some(p => p.wins.includes(win))
				) {
					new Audio(capturedSfx).play();
				} else {
					new Audio(moveSfx).play();
				}

				let winner = findWinner(board, players);

				if(winner !== null) {
					setWinningPlayer(winner);
					setGameState("ended");
				}

				return players;
			})
			return swap(t);
		});
	};

	let label = <Text
		ta="center"
		fw="bold"
		c={players[turn].color}
	>{`${turn ? "Yeşil" : "Mavi"} oyuncunun turu`}</Text>;

	if(winningPlayer !== null) {
		label = (
			<Stack ta="center" align="center" gap="sm">
				<IconCrown color="gold" />
				<Title order={3}>Oyun Bitti!</Title>
				<Text
					fw="bold"
					c={players[winningPlayer].color}
				>{`${winningPlayer ? "Yeşil" : "Mavi"} oyuncu kazandı!`}</Text>
				<Button
					color="dark"
					onClick={restart}
					variant="light"
					size="compact-sm"
				>
					Yeniden Oyna
				</Button>
			</Stack>
		)
	}

	const isMobile = useMobile();

	return (
		<Stack h="100%" w="100%" align="center" px={isMobile ? "xs" : "xl"} py="sm">
			<Paper
				withBorder
				w="100%"
				p="xs"
			>
				<Group justify="space-between" wrap="nowrap">
					<Button
						color="dark"
						variant="subtle"
						component="a"
						href="https://deniz.blue/"
						target="_blank"
						leftSection={<IconExternalLink />}
					>
						Deniz tarafından
					</Button>
					<Title order={3}>Çarpanga</Title>
					<Group>
						<Tooltip label="Yeniden Başla">
							<ActionIcon
								variant="light"
								color="dark"
								onClick={restart}
							>
								<IconReload />
							</ActionIcon>
						</Tooltip>
					</Group>
				</Group>
			</Paper>
			{isMobile ? (
				<>
					<Board
						board={board}
						players={players}
					/>
					{label}
					<Text c={players[swap(turn)].color} fw="bold">
						{players[swap(turn)].selectedNumber}
					</Text>
					<PlayerColumn
						isTurn={true}
						player={players[turn]}
						onClick={playMove}
					/>
				</>
			) : (
				<Group justify="space-between" w="100%">
					<PlayerColumn
						player={players[0]}
						onClick={(n) =>  turn === 0 && playMove(n)}
						isTurn={turn === 0}
					/>
					<Board
						board={board}
						players={players}
						label={label}
					/>
					<PlayerColumn
						player={players[1]}
						onClick={(n) => turn === 1 && playMove(n)}
						isTurn={turn === 1}
					/>
				</Group>
			)}
		</Stack>
	)
}

export default App
