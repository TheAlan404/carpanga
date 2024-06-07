import { List, Stack } from "@mantine/core";
import { useLanguage } from "../hooks/useLanguage";

export const Tutorial = () => {
    const [lang] = useLanguage();

    const content = lang == "tr" ? [
        "İlk oyuncu bir rakam seçer",
        "Rakip oyuncu, ilk oyuncunun seçtiği sayıya göre bir sayı seçer",
        "İki sayı çarpılır ve eğer sonuç ortadaki tabloda var ise hamleyi yapan oyuncunun rengine boyanır",
        "Oyunu yan yana veya çapraz bir şekilde 3 tane sayıyı kendi renginize boyayarak kazanırsınız",
        "İyi eğlenceler!~",
    ] : [
        "First player picks a digit",
        "Second player picks a digit according to the one the opponent chose",
        "The two picked digits are multiplied and if the result exists on the table on the middle, the player who made the move wins the number.",
        "The game's goal is to get 3 in a row/column/diagonal!",
        "Have fun!~"
    ];

    return (
        <Stack>
            <List>
                {content.map((item, i) => (
                    <List.Item key={i}>
                        {item}
                    </List.Item>
                ))}
            </List>
        </Stack>
    )
};
