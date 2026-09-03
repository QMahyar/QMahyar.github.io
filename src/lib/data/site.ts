export const profile = {
	name: 'Mahyar',
	role: 'Developer & Security Enthusiast',
	location: 'Iran',
	github: 'https://github.com/QMahyar',
	telegram: 'https://t.me/QMahyar',
	twitter: 'https://x.com/Mahyartdb',
	email: 'mailto:mahyartdb@gmail.com',
	handle: '@Mahyartdb'
} as const;

export interface Project {
	name: string;
	url: string;
	description: string;
	lang: string;
	stars?: number;
	tags: string[];
	updated?: string;
	archived?: boolean;
}

/** Proof-column rows for the flagship diptychs. Every value comes from the project's own description. */
export interface Flagship extends Project {
	spec: Array<{ key: string; value: string }>;
	slug?: string;
}

/** The two main projects — everything else orbits these. Both pure Rust. */
export const flagships: Flagship[] = [
	{
		name: 'tele-cli',
		slug: 'tele-cli',
		url: 'https://github.com/QMahyar/tele-cli',
		description:
			'Drive real Telegram user accounts from the terminal — messages, chats, groups, contacts, live streaming. Name your accounts, fan commands out across all of them, get tables for humans or JSON for machines. Pure Rust on grammers, zero C dependencies.',
		lang: 'Rust',
		tags: ['MTProto', 'grammers', 'multi-account'],
		updated: 'Aug 2026',
		spec: [
			{ key: 'accounts', value: 'real users, named' },
			{ key: 'commands', value: 'fanned across all' },
			{ key: 'output', value: 'tables · json' },
			{ key: 'scope', value: 'chats groups contacts' },
			{ key: 'core', value: 'pure rust · grammers' }
		]
	},
	{
		name: 'cf-scanner',
		slug: 'cf-scanner',
		url: 'https://github.com/QMahyar/cf-scanner',
		description:
			'One cross-platform Rust binary that finds working Cloudflare endpoints on ISP-restricted networks — TLS scans across official ranges, WARP discovery through real WireGuard handshakes, driven by CLI, wizard, or browser UI.',
		lang: 'Rust',
		stars: 1,
		tags: ['WARP', 'WireGuard', 'boringtun'],
		updated: 'Aug 2026',
		spec: [
			{ key: 'binary', value: 'one · cross-platform' },
			{ key: 'tls scan', value: 'official ranges' },
			{ key: 'warp', value: 'wireguard handshake' },
			{ key: 'interface', value: 'cli · wizard · web ui' },
			{ key: 'core', value: 'pure rust · boringtun' }
		]
	}
];

export const projects: Project[] = [
	{
		name: 'warp-generator',
		url: 'https://github.com/QMahyar/warp-generator',
		description:
			'Open-source Cloudflare WARP configuration generator — WireGuard, AmneziaWG, Clash, Throne, Nekoray, Husi, Karing, WireSock.',
		lang: 'JavaScript',
		tags: ['WireGuard', 'AmneziaWG'],
		updated: 'Aug 2026'
	},
	{
		name: 'WolfDriver',
		url: 'https://github.com/QMahyar/WolfDriver',
		description:
			'Telegram Werewolf, automated — multi-account management, phase detection, and action automation for desktop and headless servers.',
		lang: 'TypeScript',
		stars: 1,
		tags: ['Electron', 'Automation'],
		updated: 'Aug 2026'
	},
	{
		name: 'pi-9router',
		url: 'https://github.com/QMahyar/pi-9router',
		description:
			'Connect the pi coding agent to 9Router — multi-provider chat models plus image, speech, search, and fetch tools in one extension.',
		lang: 'TypeScript',
		stars: 3,
		tags: ['pi extension', 'LLM gateway'],
		updated: 'Aug 2026'
	},
	{
		name: 'pi-exa-search',
		url: 'https://github.com/QMahyar/pi-exa-search',
		description:
			'Exa neural web search and page fetch for pi — multi-key rotation with highlights extracted from results.',
		lang: 'TypeScript',
		tags: ['pi extension', 'web search'],
		updated: 'Aug 2026'
	}
];

export const moreProjects: Project[] = [
	{
		name: 'pi-ask',
		url: 'https://github.com/QMahyar/pi-ask',
		description:
			'Structured choice and text forms for agent-user decisions. ask_user extension for the pi coding agent.',
		lang: 'TypeScript',
		tags: [],
		updated: 'Aug 2026'
	},
	{
		name: 'TeleManager',
		url: 'https://github.com/QMahyar/TeleManager',
		description:
			'Local-first Telegram session manager for your own accounts — guarded multi-account actions on local Telethon sessions.',
		lang: 'TypeScript',
		stars: 1,
		tags: [],
		archived: true,
		updated: 'Jul 2026'
	},
	{
		name: 'pi-termux',
		url: 'https://github.com/QMahyar/pi-termux',
		description: 'Pi agent skill for Termux extra keys — layout configs, reference, macros.',
		lang: 'Other',
		stars: 1,
		tags: [],
		updated: 'Jun 2026'
	},
	{
		name: 'wezterm-config',
		url: 'https://github.com/QMahyar/wezterm-config',
		description: 'Personal WezTerm configuration for Windows — the palette behind this site.',
		lang: 'Lua',
		stars: 2,
		tags: [],
		updated: 'Feb 2026'
	}
];

/** GitHub language dot colors (lightened where the official hex is invisible on dark). */
export const langColor: Record<string, string> = {
	Go: '#00add8',
	TypeScript: '#3178c6',
	Rust: '#dea584',
	JavaScript: '#f1e05a',
	Lua: '#7b7beb',
	Python: '#4b8bbe',
	Other: '#8a8a8a'
};

export const stack = [
	{
		icon: 'cpu',
		title: 'Languages',
		items: [
			{ name: 'Rust', note: 'backend & tooling' },
			{ name: 'TypeScript', note: 'interfaces' },
			{ name: 'Go', note: 'network services' },
			{ name: 'Python', note: 'automation & bots' },
			{ name: 'Lua', note: 'configs & scripts' }
		]
	},
	{
		icon: 'layout',
		title: 'Interface',
		items: [
			{ name: 'Svelte 5', note: 'runes-first UI' },
			{ name: 'Tailwind CSS v4', note: 'utility styling' },
			{ name: 'Skeleton UI', note: 'components' },
			{ name: 'Vite', note: 'build & dev server' }
		]
	},
	{
		icon: 'globe',
		title: 'Territory',
		items: [
			{ name: 'Telegram MTProto', note: 'clients & bots' },
			{ name: 'Cloudflare / WARP', note: 'scanners & generators' },
			{ name: 'xray-core', note: 'UDP noise' },
			{ name: 'WireGuard', note: 'tunnel configs' }
		]
	}
] as const;

export const stats = [
	{ value: '16', label: 'public repos' },
	{ value: '\u221e', label: 'ports pending' },
	{ value: '2026', label: 'still shipping' }
] as const;
