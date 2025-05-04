import figlet from "figlet";

export interface opts {
	toYaml: boolean;
	toJson: boolean;
	toToml: boolean;
	init: boolean;
}

export interface nameAndDesc {
	name: string;
	description: string;
}

export interface entryData {
	description?: string;
	usage?: {
		example?: string;
		commands?: nameAndDesc[];
		options?: nameAndDesc[];
		variables?: nameAndDesc[];
	};
}

export interface styleData {
	titleFont?: figlet.Fonts;
	titleColor?: Color;
	titleBackground?: Color;
}

export interface Color {
	r: number
	g: number
	b: number
}

export interface HelpData { // used for the JSON schema
	$schema?: string,
	name?: string;
	author?: string;
	description?: string;
	styles?: styleData;
	targets?: Record<string, entryData>; 
}
	
