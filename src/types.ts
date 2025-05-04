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

export interface HelpData { // used for the JSON schema
	name?: string;
	author?: string;
	targets?: Record<string, entryData>; 
}
	
