import figlet from "figlet";

export interface opts {
	toYaml: boolean;
	toJson: boolean;
	toToml: boolean;
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
	r: number & { _brand: 'RGB' }
	g: number & { _brand: 'RGB' }
	b: number & { _brand: 'RGB' }
}

export interface HelpData { // used for the JSON schema
	name?: string;
	author?: string;
	description?: string;
	styles?: styleData;
	targets?: Record<string, entryData>; 
}
	
