import type { ProjectPage } from './types';

export const cfScannerPage: ProjectPage = {
	slug: 'cf-scanner',
	name: 'cf-scanner',
	repo: 'https://github.com/QMahyar/cf-scanner',
	tagline:
		'Find working Cloudflare endpoints on ISP-restricted networks — one binary, TLS scans plus WARP handshakes.',
	lang: 'Rust',
	updated: 'Aug 2026',
	badges: ['pure rust', 'boringtun', 'cli · wizard · web ui', 'cross-platform'],
	installHint: 'npm i -g @qmahyar/cf-scanner',
	install: [
		{
			id: 'npm',
			label: 'npm',
			title: 'Install with npm',
			code: 'npm i -g @qmahyar/cf-scanner',
			note: 'Requires Node 14.14+; the wrapper verifies the binary SHA-256.'
		},
		{
			id: 'binary',
			label: 'binary',
			title: 'Windows & Linux binaries',
			code: '# Windows: MSI installer or portable zip (unsigned — SmartScreen: Run anyway)\n# Linux x86_64/aarch64:\ncurl -LsSf https://github.com/QMahyar/cf-scanner/releases/latest/download/cf-scanner-installer.sh | sh'
		},
		{
			id: 'source',
			label: 'source',
			title: 'Build from source',
			code: 'cargo build --release\ncargo run -- scan --mode cdn --preset quick',
			note: 'Rust 2024 toolchain; first build needs network for GeoIP, or CFSCANNER_OFFLINE_BUILD=1.'
		}
	],
	quickstart: [
		{
			title: '1 · Quick CDN scan',
			code: 'cf-scanner scan --mode cdn --preset quick --target 20',
			caption: 'One-shot scan; NDJSON results on stdout, progress on stderr.'
		},
		{
			title: '2 · Discover WARP endpoints',
			code: 'cf-scanner scan --mode warp --count 512 --ports 2408,500'
		},
		{
			title: '3 · Export what works',
			code: 'cf-scanner scan --mode cdn --preset quick --export results.csv --export-format clash'
		},
		{
			title: '4 · Prefer a guide?',
			code: 'cf-scanner wizard'
		}
	],
	features: [
		{
			title: 'CDN TLS scan',
			body: 'Phase-1 TCP+TLS handshakes sweep official Cloudflare IPv4 ranges, with optional phase-2 verification against your real proxy config.',
			spec: [
				{ key: 'scan', value: 'official cf ranges' },
				{ key: 'presets', value: 'quick · full' },
				{ key: 'verify', value: 'vless/trojan + dpi fragment' }
			]
		},
		{
			title: 'WARP handshake probes',
			body: 'Real WireGuard Init packets via boringtun — a 92-byte response or 64-byte cookie means the endpoint is alive.',
			spec: [
				{ key: 'probe', value: 'wireguard init · mac1' },
				{ key: 'open', value: '92B response · 64B cookie' },
				{ key: 'verify', value: 'wgconf · warpgen' }
			]
		},
		{
			title: 'One engine, three faces',
			body: 'CLI, interactive wizard and browser UI all drive the same in-process scan controller. No history, no telemetry.',
			spec: [
				{ key: 'cli', value: 'scan · ranges · export' },
				{ key: 'wizard', value: 'guided same engine' },
				{ key: 'privacy', value: 'memory-only · no telemetry' }
			]
		},
		{
			title: 'Cross-platform binary',
			body: 'Windows MSI plus portable zip, Linux x86_64/aarch64 installer plus archive, npm wrapper, source build.',
			spec: [
				{ key: 'windows', value: 'msi · portable zip' },
				{ key: 'linux', value: 'x86_64 · aarch64' },
				{ key: 'npm', value: 'sha-256 verified' }
			]
		},
		{
			title: 'Export anywhere',
			body: 'Results land in six formats ready to paste into clients and subscriptions.',
			spec: [
				{ key: 'formats', value: 'csv · json · base64 · raw' },
				{ key: 'clients', value: 'singbox · clash' }
			]
		}
	],
	commands: [
		{
			group: 'scan',
			summary: 'One-shot scans over CDN or WARP.',
			lines: [
				'cf-scanner scan --mode cdn --preset quick --target 20',
				'cf-scanner scan --mode warp --count 512 --ports 2408,500',
				'cf-scanner scan … --export results.csv --export-format csv|json|base64|raw|singbox|clash',
				'cf-scanner scan … --json-errors',
				'cf-scanner wizard'
			]
		},
		{
			group: 'config',
			summary: 'WARP registration and config export.',
			lines: [
				'cf-scanner warp-config generate',
				'cf-scanner warp-config export [--out FILE]',
				'cf-scanner export-config --config vless://… --ip 1.2.3.4 --port 443'
			]
		},
		{
			group: 'ranges',
			summary: 'Keep the bundled ranges fresh.',
			lines: ['cf-scanner ranges refresh [--ipv6]']
		}
	],
	architecture: {
		summary: [
			'ScanController owns all scan state behind one contract (ScanConfig, Verdict, StopCondition, events) consumed by thin CLI and wizard clients.',
			'CDN path: async TCP+TLS handshakes over official ranges via tokio-rustls, then optional verification through an inline VLESS/Trojan verifier or embedded xray with fragment DPI-bypass.',
			'WARP path: boringtun-crafted WireGuard Init over UDP; an exact-shape 92B Response or 64B Cookie counts as open, with offline country lookup from embedded GeoIP.'
		],
		diagram:
			'official ranges ──▶ tcp+tls handshake ──▶ candidates ──▶ vless/trojan verify ──▶ verdict\n   warp pools ──▶ wireguard init (boringtun) ──▶ 92B/64B match ──▶ verdict\n                              ScanController · NDJSON stdout · progress stderr'
	},
	faq: [
		{
			q: 'CDN or WARP mode — which first?',
			a: 'Start with CDN mode (scan --mode cdn --preset quick): TLS handshakes tell you which Cloudflare IPs actually complete HTTPS through your ISP. If TLS is broadly blocked or throttled, switch to WARP mode — WireGuard over UDP often takes a different path through the same restrictions.'
		},
		{
			q: 'What does a 92-byte response mean?',
			a: 'In WARP mode the scanner sends a valid WireGuard Init packet and listens. An exact-shape 92-byte response (or 64-byte cookie reply) is a real WireGuard handshake answer — the endpoint is alive and reachable. Anything else is noise.'
		},
		{
			q: 'Why does Windows warn about the binary?',
			a: 'The binaries are unsigned, so SmartScreen flags them. Choose Run anyway on the portable zip, or use the MSI installer which upgrades in place on later releases.'
		},
		{
			q: 'How do I use results with sing-box / clash?',
			a: 'Export directly: --export results.json --export-format singbox or clash. Each verdict carries IP, port, latency and mode so you can paste it into subscriptions or configs without reformatting.'
		},
		{
			q: 'How fresh are the bundled ranges?',
			a: 'Cloudflare publishes its official IP ranges; cf-scanner ships a snapshot and refreshes it with cf-scanner ranges refresh (add --ipv6 for v6). Re-run it whenever scans start coming back empty.'
		},
		{
			q: 'Does it phone home?',
			a: 'No. Scans run in-process, results live only in memory for the last scan, output goes to your stdout/files. The only network traffic is the scan itself plus the optional WARP registration call in warp-config generate.'
		}
	],
	seo: {
		title: 'cf-scanner — working Cloudflare endpoints, fast',
		description:
			'cf-scanner finds working Cloudflare endpoints on restricted networks — TLS CDN scans plus WARP WireGuard probes in one cross-platform Rust binary.'
	},
	prev: { href: '/projects/tele-cli', label: 'tele-cli' },
	next: null
} satisfies ProjectPage;
