import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';

const svg = readFileSync('public/favicon.svg', 'utf8');

for (const size of [180, 192, 512]) {
	const resvg = new Resvg(svg, {
		fitTo: { mode: 'width', value: size },
		font: {
			loadSystemFonts: false,
			fontFiles: [
				'scripts/fonts/JetBrainsMono-Regular.ttf',
				'scripts/fonts/JetBrainsMono-Medium.ttf',
				'scripts/fonts/SpaceGrotesk-400.ttf',
				'scripts/fonts/SpaceGrotesk-700.ttf'
			]
		}
	});
	const png = resvg.render().asPng();
	const name = size === 180 ? 'apple-touch-icon.png' : `icon-${size}.png`;
	writeFileSync(`public/${name}`, png);
	console.log(`public/${name} ${png.length} bytes`);
}
