import { ActionIcon, AppShell, Button, Group, Paper, Title, Tooltip } from "@mantine/core"
import { IconExternalLink, IconQuestionMark, IconReload } from "@tabler/icons-react"
import { useLanguage } from "./hooks/useLanguage"
import { LanguageModal } from "./components/LanguageModal";
import { GameComponent } from "./game/Game";
import { SegmentedControl } from "@mantine/core";
import { TRFlag, GBFlag } from 'mantine-flagpack';
import { openModal } from "@mantine/modals";
import { Tutorial } from "./components/Tutorial";

const App = () => {
	const [lang, setLang] = useLanguage();

	return (
		<AppShell
			header={{ height: 60 }}
		>
			<AppShell.Header>
				<Group m="auto" px="sm" h="100%" grow wrap="nowrap" w="100%">
					<Group>
						<Button
							variant="light"
							color="violet"
							leftSection={<IconQuestionMark />}
							onClick={() => openModal({
								children: <Tutorial />,
								title: lang == "tr" ? "Nasıl Oynanır?" : "How to play",
							})}
						>
							{lang == "tr" ? "Nasıl Oynanır?" : "How to play"}
						</Button>
					</Group>
					<Group justify="center">
						<Title order={3}>Çarpanga</Title>
					</Group>
					<Group justify="end" ta="end">
						<SegmentedControl
							data={[{ label: <GBFlag w="1.5em" />, value: "en" }, { label: <TRFlag w="1.5em" />, value: "tr" }]}
							value={lang}
							onChange={(v: "en" | "tr") => setLang(v)}
						/>
						<Button
							color="violet"
							variant="light"
							component="a"
							href="https://deniz.blue/"
							target="_blank"
							leftSection={<IconExternalLink />}
						>
							deniz.blue
						</Button>
					</Group>
				</Group>
			</AppShell.Header>
			<AppShell.Main>
				<GameComponent />
			</AppShell.Main>
		</AppShell>
	)
}

export default App
