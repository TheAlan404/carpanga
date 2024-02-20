import { Center, Flex, Paper } from "@mantine/core"
import { useMobile } from "../util";

const sizes = {
    board: "3em",
    boardMobile: "3em",
    player: "7vh",
    playerMobile: "3em",
};

export const Node = ({
    color,
    number,
    onClick,
    variant,
    disabled,
}: {
    disabled?: boolean,
    color?: string,
    number: number,
    onClick?: (() => void),
    variant: "player" | "board",
}) => {
    const isMobile = useMobile();

    let size = sizes[variant + (isMobile ? "Mobile" : "")];

    return (
        <Paper
            withBorder
            w={size}
            h={size}
            onClick={() => !disabled && onClick?.()}
            className="hoverable"
            style={{
                color: disabled ? "var(--mantine-color-dimmed)" : "var(--mantine-color-white)",
                pointerEvents: disabled ? "none" : undefined,
                cursor: "pointer",
                userSelect: "none",
            }}
            bg={color}
            fw="600"
        >
            <Center h="100%" fz="lg">
                {number}
            </Center>
        </Paper>
    )
}
