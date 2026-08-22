/**
 * Generates public/og.png (1200x630) from the Midnight design tokens.
 * Rerun after palette changes: npm run og
 */
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';

const W = 1200;
const H = 630;

// Midnight token equivalents (oklch -> srgb, matched against the live canvas colors)
const VOID = '#0b0c0e';
const FOG = '#eaeaec';
const MIST = '#c3c6ca';
const DIM = '#9aa0a8';
const LINE = '#26282d';
const GLOW = '#79eaea';
const BEAM = '#2fa8ee';

function mulberry32(a) {
	return () => {
		a |= 0;
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/** Deterministic network motif for the right half — same language as NetworkCanvas. */
function network() {
	const rand = mulberry32(20260822);
	const nodes = [];
	for (let i = 0; i < 18; i++) {
		const x = 660 + rand() * 480;
		const y = 50 + rand() * 530;
		if (nodes.every((n) => Math.hypot(n.x - x, n.y - y) >= 78)) {
			nodes.push({ x, y, r: 2 + rand() * 2.5 });
		}
	}
	let edges = '';
	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			const a = nodes[i];
			const b = nodes[j];
			const d = Math.hypot(a.x - b.x, a.y - b.y);
			if (d < 165) {
				const alpha = ((1 - d / 165) * 0.55).toFixed(2);
				edges += `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${LINE}" stroke-opacity="${alpha}" stroke-width="1"/>`;
			}
		}
	}
	let dots = '';
	nodes.forEach((n, i) => {
		const accent = i === 4 || i === 11;
		dots += `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${accent ? n.r + 1.5 : n.r}" fill="${accent ? GLOW : DIM}" opacity="${accent ? 0.95 : 0.7}"/>`;
	});
	return edges + dots;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
	<defs>
		<radialGradient id="bloom-beam" cx="50%" cy="50%" r="50%">
			<stop offset="0%" stop-color="${BEAM}" stop-opacity="0.16"/>
			<stop offset="100%" stop-color="${BEAM}" stop-opacity="0"/>
		</radialGradient>
		<radialGradient id="bloom-glow" cx="50%" cy="50%" r="50%">
			<stop offset="0%" stop-color="${GLOW}" stop-opacity="0.10"/>
			<stop offset="100%" stop-color="${GLOW}" stop-opacity="0"/>
		</radialGradient>
	</defs>

	<rect width="${W}" height="${H}" fill="${VOID}"/>
	<circle cx="150" cy="40" r="430" fill="url(#bloom-beam)"/>
	<circle cx="1080" cy="620" r="480" fill="url(#bloom-glow)"/>

	${network()}

	<!-- typed status line -->
	<text x="80" y="118" font-family="JetBrains Mono" font-size="21" fill="${DIM}">$ mahyar --rust --telegram --network-tooling</text>
	<rect x="666" y="100" width="10" height="24" fill="${GLOW}"/>

	<!-- display -->
	<text x="72" y="308" font-family="Space Grotesk" font-weight="700" font-size="176" letter-spacing="-4" fill="${FOG}">Mahyar.</text>

	<text x="80" y="382" font-family="Space Grotesk" font-size="31" fill="${MIST}">Sharp tools for Telegram and the networks they run on —</text>
	<text x="80" y="426" font-family="Space Grotesk" font-size="31" fill="${MIST}">MTProto CLIs, endpoint scanners, developer automation.</text>

	<!-- hairline + channels -->
	<rect x="80" y="512" width="1040" height="1" fill="${LINE}"/>
	<text x="80" y="562" font-family="JetBrains Mono" font-size="19" fill="${DIM}">github.com/QMahyar &#183; t.me/QMahyar</text>
	<text x="1120" y="562" text-anchor="end" font-family="JetBrains Mono" font-size="22" font-weight="600"><tspan fill="${FOG}">Q</tspan><tspan fill="${GLOW}">_</tspan></text>
</svg>`;

const resvg = new Resvg(svg, {
	fitTo: { mode: 'width', value: W },
	font: {
		loadSystemFonts: false,
		defaultFontFamily: 'Space Grotesk',
		fontFiles: [
			'scripts/fonts/SpaceGrotesk-400.ttf',
			'scripts/fonts/SpaceGrotesk-700.ttf',
			'scripts/fonts/JetBrainsMono-Regular.ttf',
			'scripts/fonts/JetBrainsMono-Medium.ttf'
		]
	}
});

writeFileSync('public/og.png', resvg.render().asPng());
console.log('public/og.png written');
