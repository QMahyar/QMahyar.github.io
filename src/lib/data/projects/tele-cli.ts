import type { ProjectPage } from './types';

export const teleCliPage: ProjectPage = {
	slug: 'tele-cli',
	name: 'tele-cli',
	repo: 'https://github.com/QMahyar/tele-cli',
	tagline: 'Telegram automation from your terminal — multi-account, parallel, scriptable, no bot tokens.',
	lang: 'Rust',
	updated: 'Aug 2026',
	badges: ['pure rust', 'grammers', '16 command groups', 'json-first'],
	installHint: 'npm install -g @qmahyar/tele',
	install: [
		{
			id: 'npm',
			label: 'npm',
			title: 'Install with npm',
			code: 'npm install -g @qmahyar/tele'
		},
		{
			id: 'binary',
			label: 'binary',
			title: 'Download a binary',
			code: '# 13 targets at\n# https://github.com/QMahyar/tele-cli/releases\n# incl. static linux-arm64-musl for Termux',
			note: 'Pick your OS/arch asset from the latest release.'
		},
		{
			id: 'source',
			label: 'source',
			title: 'Build from source',
			code: 'git clone https://github.com/QMahyar/tele-cli.git\ncd tele-cli\ncargo build --release',
			note: 'Requires Rust 1.89+.'
		}
	],
	quickstart: [
		{
			title: '1 · Get API keys',
			code: '# create an app at https://my.telegram.org\n# Linux/macOS: write to ~/.config/tele/.env\n# Windows: write to %APPDATA%\\tele\\.env\nTELE_API_ID=123456\nTELE_API_HASH=0123456789abcdef0123456789abcdef',
			caption: 'One app, reused by every account.'
		},
		{
			title: '2 · Add an account',
			code: 'tele account add --name work'
		},
		{
			title: '3 · Log in',
			code: 'tele account login --name work --method code --phone +10000000000\n# or: tele account login --name work --method qr'
		},
		{
			title: '4 · First send (dry-run first)',
			code: 'tele msg send --chat me --text "hello from tele" --dry-run\ntele msg send --chat me --text "hello from tele"'
		}
	],
	features: [
		{
			title: 'Real user accounts',
			body: 'Drive real Telegram user accounts over MTProto via grammers — no bot tokens, full user privileges.',
			spec: [
				{ key: 'core', value: 'pure rust · grammers' },
				{ key: 'sessions', value: 'sqlite per named account' },
				{ key: 'deps', value: 'zero C dependencies' }
			]
		},
		{
			title: 'Multi-account fan-out',
			body: 'Name accounts, tag them, fan any command out across all of them with a parallel semaphore and per-account rate limits.',
			spec: [
				{ key: 'select', value: '--account · --tag' },
				{ key: 'parallel', value: '--parallel 1-32' },
				{ key: 'limits', value: 'floodwait-aware' }
			]
		},
		{
			title: 'Machine-first output',
			body: 'Every command speaks --json/--jsonl with a stable envelope and documented exit codes, built for scripts and agents.',
			spec: [
				{ key: 'envelope', value: '{ok, command, results[]}' },
				{ key: 'exits', value: '0/1/2/3/4/130' },
				{ key: 'stream', value: '--jsonl · jsonl events' }
			]
		},
		{
			title: 'Live + embeddable',
			body: 'tele listen streams live events as JSONL; tele serve is a duplex JSONL server for embedding tele inside other programs.',
			spec: [
				{ key: 'listen', value: 'jsonl event stream' },
				{ key: 'serve', value: 'stdin/stdout server' },
				{ key: 'filters', value: '--direction · --chat · --timeout' }
			]
		},
		{
			title: 'Agent-native',
			body: 'A 67-tool MCP server plus a built-in agent skill turn every agent into a Telegram operator.',
			spec: [
				{ key: 'mcp', value: '67 tools · stdio' },
				{ key: 'mode', value: '--read-only · --groups' },
				{ key: 'skill', value: 'tele skill print|install' }
			]
		},
		{
			title: 'Safe by default',
			body: '--dry-run validates with zero network calls; sessions are permission-locked with exclusive OS locks and secret scrubbing.',
			spec: [
				{ key: 'dry-run', value: 'zero network calls' },
				{ key: 'locks', value: 'per-account exclusive' },
				{ key: 'secrets', value: 'scrubbed from output' }
			]
		}
	],
	commands: [
		{
			group: 'accounts',
			summary: 'Login, sessions, 2FA and session files.',
			lines: [
				'tele account list | status | add --name --tags a,b | login --name --method code|qr --phone | logout --name | remove --name',
				'tele account sessions [--web] [--terminate HASH] [--terminate-all-web]',
				'tele account password [--set|--change|--remove] [--status]',
				'tele account export-session --name [--out PATH] | import-session --file PATH [--as NAME] [--force] [--from-telethon]',
				'tele account ttl --get | --set --days 1..365'
			]
		},
		{
			group: 'messaging',
			summary: 'Send, edit, read, react, download, polls.',
			lines: [
				'tele msg send --chat @user|ID|me|+phone --text TEXT | --file PATH [2-10 album] --caption --reply ID --schedule TS',
				'tele msg edit --chat --id ID --text TEXT | delete --chat --ids 1,2 --all',
				'tele msg forward --from --ids 1,2 --to',
				'tele msg pin --chat [--id] [--unpin] [--notify] | get --chat [--id] --limit --watch',
				'tele msg read --chat [--mark-unread] [--mentions] | react --chat --id --reaction EMOJI | search --chat --query [--global]',
				'tele msg download --chat --id --dir DIR [--chunk-size-kb 4-512] | vote --chat --id --option 1|1,3 | typing | click'
			]
		},
		{
			group: 'chats-and-groups',
			summary: 'Join, invites, join-requests, admins, stats.',
			lines: [
				'tele chat join --chat | leave --chat',
				'tele chat invite [--chat] [--user] [--expire 90s|30m|24h|7d|2w] [--usage-limit N] [--request-approval] [--list] [--revoked] [--check LINK]',
				'tele chat requests --chat [--user USER|--all] [--approve|--dismiss] | participants | kick | admin | admin-log | stats | settings | edit | link | create'
			]
		},
		{
			group: 'dialogs-and-topics',
			summary: 'Archive, pins, drafts, forum topics.',
			lines: [
				'tele dialog list --limit --folder 0|1 | drafts | draft --chat (--text TEXT|--clear) | archive --chat [--unarchive] | pin --chat [--unpin] | delete --chat',
				'tele topic create | list | close | reopen | edit | delete | pin'
			]
		},
		{
			group: 'social',
			summary: 'Contacts, profiles, privacy, stories, stickers.',
			lines: [
				'tele contact list | add --user | remove --user | block --user | unblock --user',
				'tele profile get | set [--first-name --last-name --bio] | photo | emoji-status',
				'tele privacy get [--key] | set --key 14-keys --allow/--deny',
				'tele story send | list | read --chat --max-id | delete | pin | unpin',
				'tele sticker list | search --query | show --set | install --set | remove --set',
				'tele takeout start | export | finish'
			]
		},
		{
			group: 'automation',
			summary: 'listen · serve · mcp · raw · skill.',
			lines: [
				'tele listen [--direction in|out] [--timeout SECS] [--chat ...]',
				'tele serve',
				'tele mcp [--account NAME] [--read-only] [--groups msg,dialog,...]',
				'tele raw <MethodName> --args \'{"k":v}\' (25-method allowlist incl. messages.GetHistory, messages.Search, users.GetUsers)',
				'tele skill [print] | install [--dir PATH]',
				'tele completions bash|zsh|fish|powershell'
			]
		},
		{
			group: 'global-flags',
			summary: 'Flags every command accepts.',
			lines: [
				'--account NAME (repeatable) --tag TAG (repeatable) --parallel 1-32',
				'--json / --jsonl for machine output',
				'--dry-run validates with zero network calls',
				'-q/--quiet -v/--verbose --config PATH'
			]
		}
	],
	architecture: {
		summary: [
			'Pure-Rust MTProto client on grammers-client; SQLite FileSession per named account, no C dependencies.',
			'Commands dispatch through clap into a fan-out executor resolving --account/--tag selection with a parallel semaphore plus per-account token-bucket rate limits and FloodWait handling.',
			'Every command emits a stable JSON/JSONL envelope, so the CLI, listen stream, serve duplex server and MCP server are all the same machine interface.'
		],
		diagram:
			'accounts/*.session ──▶ run_fanout ──▶ per-account workers ──▶ mtproto (grammers)\n  --account/--tag ──┘  parallel 1-32 · token bucket · floodwait   │\n                                                            ▼\n                                               {ok, command, results[]}'
	},
	faq: [
		{
			q: 'Do I need a bot token?',
			a: 'No. tele-cli drives real user accounts over MTProto — you log in with your phone number (code or QR) and it operates with full user privileges, not the limited Bot API.'
		},
		{
			q: 'How do I get api_id / api_hash?',
			a: 'Create an app at my.telegram.org, then write TELE_API_ID and TELE_API_HASH into ~/.config/tele/.env on Linux/macOS or %APPDATA%\\tele\\.env on Windows. One app is reused by every account.'
		},
		{
			q: 'How do multiple accounts work?',
			a: 'Each account is a named SQLite session (tele account add --name work). Select with --account (repeatable) or --tag, and fan any command out with --parallel 1-32. Per-account rate limits and FloodWait handling are automatic.'
		},
		{
			q: 'What does --dry-run do?',
			a: 'It validates arguments and prints the intended action with zero network calls. Use it before any broadcast or destructive command.'
		},
		{
			q: 'How do agents use tele?',
			a: 'Three ways: tele mcp exposes 67 tools over stdio (with --read-only and --groups filters), tele serve is a duplex JSONL server for embedding, and tele skill print|install emits an Agent Skills-spec skill. All output is --json/--jsonl with exit codes 0/1/2/3/4/130.'
		},
		{
			q: 'What if I hit FloodWait?',
			a: 'Slow down and let the built-in token-bucket limiter work — tele-cli waits out FloodWaits per account instead of hammering. Batch with --parallel conservatively and space broadcasts apart.'
		},
		{
			q: 'Does it run on Termux / Android?',
			a: 'Yes — releases include a static linux-arm64-musl binary specifically for Termux/Android, plus 12 other targets and an npm wrapper.'
		}
	],
	seo: {
		title: 'tele-cli — Telegram from the terminal',
		description:
			'tele-cli drives real Telegram user accounts from the terminal — multi-account MTProto CLI with JSON-first output, live streaming, and a 67-tool MCP server.'
	},
	prev: null,
	next: { href: '/projects/cf-scanner', label: 'cf-scanner' }
} satisfies ProjectPage;
