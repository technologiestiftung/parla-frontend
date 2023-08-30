export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			dokument: {
				Row: {
					abstract: string | null;
					desk: string | null;
					dherk: string | null;
					dherkl: string | null;
					dokart: string | null;
					dokartl: string | null;
					dokdat: string | null;
					doknr: string | null;
					doktyp: string | null;
					doktypl: string | null;
					hnr: string | null;
					id: number;
					jg: string | null;
					lokurl: string | null;
					nrintyp: string | null;
					reihnr: string | null;
					sb: string | null;
					titel: string | null;
					urheber: string | null;
					vkdat: string | null;
					vorgang_id: number | null;
					wp: string | null;
				};
				Insert: {
					abstract?: string | null;
					desk?: string | null;
					dherk?: string | null;
					dherkl?: string | null;
					dokart?: string | null;
					dokartl?: string | null;
					dokdat?: string | null;
					doknr?: string | null;
					doktyp?: string | null;
					doktypl?: string | null;
					hnr?: string | null;
					id?: number;
					jg?: string | null;
					lokurl?: string | null;
					nrintyp?: string | null;
					reihnr?: string | null;
					sb?: string | null;
					titel?: string | null;
					urheber?: string | null;
					vkdat?: string | null;
					vorgang_id?: number | null;
					wp?: string | null;
				};
				Update: {
					abstract?: string | null;
					desk?: string | null;
					dherk?: string | null;
					dherkl?: string | null;
					dokart?: string | null;
					dokartl?: string | null;
					dokdat?: string | null;
					doknr?: string | null;
					doktyp?: string | null;
					doktypl?: string | null;
					hnr?: string | null;
					id?: number;
					jg?: string | null;
					lokurl?: string | null;
					nrintyp?: string | null;
					reihnr?: string | null;
					sb?: string | null;
					titel?: string | null;
					urheber?: string | null;
					vkdat?: string | null;
					vorgang_id?: number | null;
					wp?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "dokument_vorgang_id_fkey";
						columns: ["vorgang_id"];
						referencedRelation: "vorgang";
						referencedColumns: ["id"];
					},
				];
			};
			export: {
				Row: {
					aktualisiert: string | null;
					filename: string | null;
					id: number;
				};
				Insert: {
					aktualisiert?: string | null;
					filename?: string | null;
					id?: number;
				};
				Update: {
					aktualisiert?: string | null;
					filename?: string | null;
					id?: number;
				};
				Relationships: [];
			};
			nebeneintrag: {
				Row: {
					desk: string | null;
					id: number;
					reihnr: string | null;
					vorgang_id: number | null;
				};
				Insert: {
					desk?: string | null;
					id?: number;
					reihnr?: string | null;
					vorgang_id?: number | null;
				};
				Update: {
					desk?: string | null;
					id?: number;
					reihnr?: string | null;
					vorgang_id?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "nebeneintrag_vorgang_id_fkey";
						columns: ["vorgang_id"];
						referencedRelation: "vorgang";
						referencedColumns: ["id"];
					},
				];
			};
			parsed_document_metadata: {
				Row: {
					embedding: string | null;
					id: number;
					parsed_document_id: number | null;
					raw_metadata: Json | null;
					token_count: number | null;
				};
				Insert: {
					embedding?: string | null;
					id?: number;
					parsed_document_id?: number | null;
					raw_metadata?: Json | null;
					token_count?: number | null;
				};
				Update: {
					embedding?: string | null;
					id?: number;
					parsed_document_id?: number | null;
					raw_metadata?: Json | null;
					token_count?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "parsed_document_metadata_parsed_document_id_fkey";
						columns: ["parsed_document_id"];
						referencedRelation: "parsed_documents";
						referencedColumns: ["id"];
					},
				];
			};
			parsed_document_sections: {
				Row: {
					content: string | null;
					embedding: string | null;
					heading: string | null;
					id: number;
					page: number | null;
					parsed_document_id: number | null;
					token_count: number | null;
				};
				Insert: {
					content?: string | null;
					embedding?: string | null;
					heading?: string | null;
					id?: number;
					page?: number | null;
					parsed_document_id?: number | null;
					token_count?: number | null;
				};
				Update: {
					content?: string | null;
					embedding?: string | null;
					heading?: string | null;
					id?: number;
					page?: number | null;
					parsed_document_id?: number | null;
					token_count?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "parsed_document_sections_parsed_document_id_fkey";
						columns: ["parsed_document_id"];
						referencedRelation: "parsed_documents";
						referencedColumns: ["id"];
					},
				];
			};
			parsed_document_tables: {
				Row: {
					accuracy: number | null;
					id: number;
					name: string | null;
					order: number | null;
					page: number | null;
					parsed_document_id: number | null;
					whitespace: number | null;
				};
				Insert: {
					accuracy?: number | null;
					id?: number;
					name?: string | null;
					order?: number | null;
					page?: number | null;
					parsed_document_id?: number | null;
					whitespace?: number | null;
				};
				Update: {
					accuracy?: number | null;
					id?: number;
					name?: string | null;
					order?: number | null;
					page?: number | null;
					parsed_document_id?: number | null;
					whitespace?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "parsed_document_tables_parsed_document_id_fkey";
						columns: ["parsed_document_id"];
						referencedRelation: "parsed_documents";
						referencedColumns: ["id"];
					},
				];
			};
			parsed_documents: {
				Row: {
					checksum: string | null;
					dokument_id: number | null;
					filename: string | null;
					id: number;
					meta: Json | null;
				};
				Insert: {
					checksum?: string | null;
					dokument_id?: number | null;
					filename?: string | null;
					id?: number;
					meta?: Json | null;
				};
				Update: {
					checksum?: string | null;
					dokument_id?: number | null;
					filename?: string | null;
					id?: number;
					meta?: Json | null;
				};
				Relationships: [
					{
						foreignKeyName: "parsed_documents_dokument_id_fkey";
						columns: ["dokument_id"];
						referencedRelation: "dokument";
						referencedColumns: ["id"];
					},
				];
			};
			vorgang: {
				Row: {
					export_id: number | null;
					id: number;
					reihnr: string | null;
					vfunktion: string | null;
					vir: string | null;
					vnr: string | null;
					vsys: string | null;
					vsysl: string | null;
					vtyp: string | null;
					vtypl: string | null;
				};
				Insert: {
					export_id?: number | null;
					id?: number;
					reihnr?: string | null;
					vfunktion?: string | null;
					vir?: string | null;
					vnr?: string | null;
					vsys?: string | null;
					vsysl?: string | null;
					vtyp?: string | null;
					vtypl?: string | null;
				};
				Update: {
					export_id?: number | null;
					id?: number;
					reihnr?: string | null;
					vfunktion?: string | null;
					vir?: string | null;
					vnr?: string | null;
					vsys?: string | null;
					vsysl?: string | null;
					vtyp?: string | null;
					vtypl?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "vorgang_export_id_fkey";
						columns: ["export_id"];
						referencedRelation: "export";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			match_parsed_dokument_sections: {
				Args: {
					embedding: string;
					match_threshold: number;
					match_count: number;
					min_content_length: number;
					num_probes: number;
				};
				Returns: {
					id: number;
					parsed_document_id: number;
					heading: string;
					content: string;
					similarity: number;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	storage: {
		Tables: {
			buckets: {
				Row: {
					allowed_mime_types: string[] | null;
					avif_autodetection: boolean | null;
					created_at: string | null;
					file_size_limit: number | null;
					id: string;
					name: string;
					owner: string | null;
					public: boolean | null;
					updated_at: string | null;
				};
				Insert: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id: string;
					name: string;
					owner?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Update: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id?: string;
					name?: string;
					owner?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "buckets_owner_fkey";
						columns: ["owner"];
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			migrations: {
				Row: {
					executed_at: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Insert: {
					executed_at?: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Update: {
					executed_at?: string | null;
					hash?: string;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			objects: {
				Row: {
					bucket_id: string | null;
					created_at: string | null;
					id: string;
					last_accessed_at: string | null;
					metadata: Json | null;
					name: string | null;
					owner: string | null;
					path_tokens: string[] | null;
					updated_at: string | null;
					version: string | null;
				};
				Insert: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Update: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "objects_bucketId_fkey";
						columns: ["bucket_id"];
						referencedRelation: "buckets";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			can_insert_object: {
				Args: {
					bucketid: string;
					name: string;
					owner: string;
					metadata: Json;
				};
				Returns: undefined;
			};
			extension: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			filename: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			foldername: {
				Args: {
					name: string;
				};
				Returns: unknown;
			};
			get_size_by_bucket: {
				Args: Record<PropertyKey, never>;
				Returns: {
					size: number;
					bucket_id: string;
				}[];
			};
			search: {
				Args: {
					prefix: string;
					bucketname: string;
					limits?: number;
					levels?: number;
					offsets?: number;
					search?: string;
					sortcolumn?: string;
					sortorder?: string;
				};
				Returns: {
					name: string;
					id: string;
					updated_at: string;
					created_at: string;
					last_accessed_at: string;
					metadata: Json;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
