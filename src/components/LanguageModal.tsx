import { Box, Group, Stack, Title } from "@mantine/core";
import { useLanguage } from "../hooks/useLanguage";

export const LanguageModal = () => {
    const [lang, setLang, selected, setSelected] = useLanguage();

    return (
        <Stack w="100%" justify="center">
            <Stack>
                <Title>?</Title>
                <Group w="100%" grow>
                    {[["en", ], ["tr", ]].map(([code, Icon]) => (
                        <Box p="xl" key={code} onClick={() => {
                            setLang(code);
                            setSelected(true);
                        }}>
                            {Icon}
                        </Box>
                    ))}
                </Group>
            </Stack>
        </Stack>
    )
};
