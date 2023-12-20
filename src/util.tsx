import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";
import { Player } from "./App";

export const digits = () => new Array(10).fill(1).map((_,i)=>i).slice(1);

export const shuffle = <T extends any>(arr: T[]) => arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const chunks = <T extends any>(a: T[], size: number) =>
    Array.from(
        new Array(Math.ceil(a.length / size)),
        (_, i) => a.slice(i * size, i * size + size)
    );

export function useMobile() {
    let theme = useMantineTheme();
    return useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
}

export const randomBoard = () => {
    let all = digits().flatMap(a => digits().map(b => a*b));
    let uniques = [...(new Set(all))];
    let shuffled = shuffle(uniques);
    return chunks(shuffled, 5)
        .map(x => x.filter((_, i) => i < 5))
        .filter((_, i) => i < 5);
};

export const findWinner = (board: number[][], players: Player[]) => {
    let getOwner = (x: number, y: number): number | null => (
        players
        .map((p, i): [Player, number][] => [p, i])
        .find(([p]) => (p as Player).wins.includes(board[x][y]))
        || []
    )[1];
    
    // iterate over 3x3 square in middle
    for(let ax = 0; ax < 3; ax++) {
        for(let ay = 0; ay < 3; ay++) {
            let t = (x, y) => [x+ax+1, y+ay+1];
            let all = (a, b, c) => {
                return (
                    // base check for unclaimed squares
                    getOwner(...a) !== undefined
                    // check all eq
                    && getOwner(...a) == getOwner(...b)
                    && getOwner(...b) == getOwner(...c)
                );
            };

            // -
            if(all(t(-1, 0), t(0, 0), t(1, 0)))
                return getOwner(...t(0, 0));
            
            // |
            if(all(t(0, -1), t(0, 0), t(0, 1)))
                return getOwner(...t(0, 0));
            
            // /
            if(all(t(-1, -1), t(0, 0), t(1, 1)))
                return getOwner(...t(0, 0));
            
            // \
            if(all(t(1, 1), t(0, 0), t(-1, -1)))
                return getOwner(...t(0, 0));
        }
    }

    return null;
}
