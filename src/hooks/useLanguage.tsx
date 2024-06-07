import { useLocalStorage } from "@mantine/hooks";

export type Lang = "en" | "tr";

export const useLanguage = () => {
    const [lang, setLang] = useLocalStorage<Lang>({
        key: "carpanga:lang",
        defaultValue: "en",
    });

    return [lang, setLang] as const;
};
