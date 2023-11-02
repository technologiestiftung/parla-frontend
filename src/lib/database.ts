export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
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
						isOneToOne: false;
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
						isOneToOne: false;
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
						isOneToOne: false;
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
						isOneToOne: false;
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
						isOneToOne: false;
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
						isOneToOne: false;
						referencedRelation: "dokument";
						referencedColumns: ["id"];
					},
				];
			};
			parsed_red_number_report_sections: {
				Row: {
					content: string | null;
					embedding: string | null;
					heading: string | null;
					id: number;
					page: number | null;
					parsed_red_number_report_id: number | null;
					token_count: number | null;
				};
				Insert: {
					content?: string | null;
					embedding?: string | null;
					heading?: string | null;
					id?: number;
					page?: number | null;
					parsed_red_number_report_id?: number | null;
					token_count?: number | null;
				};
				Update: {
					content?: string | null;
					embedding?: string | null;
					heading?: string | null;
					id?: number;
					page?: number | null;
					parsed_red_number_report_id?: number | null;
					token_count?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "parsed_red_number_report_secti_parsed_red_number_report_id_fkey";
						columns: ["parsed_red_number_report_id"];
						isOneToOne: false;
						referencedRelation: "parsed_red_number_reports";
						referencedColumns: ["id"];
					},
				];
			};
			parsed_red_number_reports: {
				Row: {
					checksum: string | null;
					id: number;
					meta: Json | null;
					red_number_report_id: number | null;
				};
				Insert: {
					checksum?: string | null;
					id?: number;
					meta?: Json | null;
					red_number_report_id?: number | null;
				};
				Update: {
					checksum?: string | null;
					id?: number;
					meta?: Json | null;
					red_number_report_id?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "parsed_red_number_reports_red_number_report_id_fkey";
						columns: ["red_number_report_id"];
						isOneToOne: false;
						referencedRelation: "red_number_reports";
						referencedColumns: ["id"];
					},
				];
			};
			red_number_processes: {
				Row: {
					category: string | null;
					description_text: string | null;
					description_title: string | null;
					id: number;
					process_id: string;
					status: string | null;
				};
				Insert: {
					category?: string | null;
					description_text?: string | null;
					description_title?: string | null;
					id?: number;
					process_id: string;
					status?: string | null;
				};
				Update: {
					category?: string | null;
					description_text?: string | null;
					description_title?: string | null;
					id?: number;
					process_id?: string;
					status?: string | null;
				};
				Relationships: [];
			};
			red_number_reports: {
				Row: {
					doc_name: string;
					doc_ref: string | null;
					doc_size: number | null;
					id: number;
					red_number_process_id: number | null;
				};
				Insert: {
					doc_name: string;
					doc_ref?: string | null;
					doc_size?: number | null;
					id?: number;
					red_number_process_id?: number | null;
				};
				Update: {
					doc_name?: string;
					doc_ref?: string | null;
					doc_size?: number | null;
					id?: number;
					red_number_process_id?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "red_number_reports_red_number_process_id_fkey";
						columns: ["red_number_process_id"];
						isOneToOne: false;
						referencedRelation: "red_number_processes";
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
						isOneToOne: false;
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
			find_dokuments_with_missing_parsed_documents: {
				Args: {
					requested_doktyp: string;
				};
				Returns: {
					id: number;
					reihnr: string;
					dherk: string;
					dherkl: string;
					wp: string;
					dokart: string;
					dokartl: string;
					doktyp: string;
					doktypl: string;
					nrintyp: string;
					desk: string;
					titel: string;
					doknr: string;
					dokdat: string;
					lokurl: string;
					sb: string;
					vkdat: string;
					hnr: string;
					jg: string;
					abstract: string;
					urheber: string;
					vorgang_id: number;
				}[];
			};
			find_parsed_documents_with_incomplete_embeddings: {
				Args: {
					requested_doktyp: string;
				};
				Returns: {
					id: number;
					filename: string;
					checksum: string;
					meta: Json;
					dokument_id: number;
				}[];
			};
			find_parsed_reports_with_incomplete_embeddings: {
				Args: Record<PropertyKey, never>;
				Returns: {
					id: number;
					checksum: string;
					meta: Json;
					red_number_report_id: number;
				}[];
			};
			find_red_number_reports_with_missing_parsed_reports: {
				Args: Record<PropertyKey, never>;
				Returns: {
					id: number;
					doc_name: string;
					doc_ref: string;
					doc_size: number;
					red_number_report_id: number;
				}[];
			};
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
			match_parsed_red_number_report_sections: {
				Args: {
					embedding: string;
					match_threshold: number;
					match_count: number;
					min_content_length: number;
					num_probes: number;
				};
				Returns: {
					id: number;
					parsed_red_number_report_id: number;
					heading: string;
					content: string;
					similarity: number;
				}[];
			};
			regenerate_embedding_indices: {
				Args: Record<PropertyKey, never>;
				Returns: undefined;
			};
			regenerate_embedding_indices_for_red_reports: {
				Args: Record<PropertyKey, never>;
				Returns: undefined;
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
