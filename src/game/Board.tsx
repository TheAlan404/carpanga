import { Group, SimpleGrid, Stack, Text } from "@mantine/core"
import { Node } from "./Node"
import { Player } from "../App"
import React from "react"

export const Board = ({
    board,
    players,
    label,
}: {
    board: number[][],
    players: Player[],
    label?: React.ReactNode,
}) => {
    return (
        <Stack>
            <SimpleGrid cols={5}>
                {board.map((row, y) => (
                    row.map((n, x) => (
                        <Node
                            variant="board"
                            number={n}
                            color={players.find(p => p.wins.includes(n))?.color}
                            key={`${x}-${y}`}
                        />
                    ))
                ))}
            </SimpleGrid>
            {label}
        </Stack>
    )
}
