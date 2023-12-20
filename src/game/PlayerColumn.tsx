import { SimpleGrid, Stack } from "@mantine/core"
import { Node } from "./Node"
import { digits } from "../util"
import { Player } from "../App"

export const PlayerColumn = ({
    player,
    onClick,
    isTurn,
}: {
    isTurn: boolean
    player: Player,
    onClick: null | ((n: number) => void),
}) => {
    return (
        <SimpleGrid cols={{ base: 3, sm: 2, md: 1 }}>
            {digits().map(v => (
                <Node
                    disabled={!isTurn}
                    variant="player"
                    number={v}
                    onClick={() => onClick?.(v)}
                    color={(!isTurn && player.selectedNumber === v) ? player.color : ""}
                    key={v}
                />
            ))}
        </SimpleGrid>
    )
}
