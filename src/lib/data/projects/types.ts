export interface InstallTab {
	id: string;
	label: string;
	title: string;
	code: string;
	note?: string;
}

export interface Quickstep {
	title: string;
	code: string;
	caption?: string;
}

export interface Feature {
	title: string;
	body: string;
	spec: Array<{ key: string; value: string }>;
}

export interface CommandGroup {
	group: string;
	summary: string;
	lines: string[];
}

export interface Faq {
	q: string;
	a: string;
}

export interface PrevNextLink {
	href: string;
	label: string;
}

export interface ProjectPage {
	slug: string;
	name: string;
	repo: string;
	tagline: string;
	lang: string;
	updated: string;
	badges: string[];
	installHint: string;
	install: InstallTab[];
	quickstart: Quickstep[];
	features: Feature[];
	commands: CommandGroup[];
	architecture: { summary: string[]; diagram: string };
	faq: Faq[];
	seo: { title: string; description: string };
	prev: PrevNextLink | null;
	next: PrevNextLink | null;
}
