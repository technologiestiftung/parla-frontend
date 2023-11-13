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
			processed_document_chunks: {
				Row: {
					chunk_index: number;
					content: string;
					embedding: string;
					id: number;
					page: number;
					processed_document_id: number | null;
				};
				Insert: {
					chunk_index: number;
					content: string;
					embedding: string;
					id?: number;
					page: number;
					processed_document_id?: number | null;
				};
				Update: {
					chunk_index?: number;
					content?: string;
					embedding?: string;
					id?: number;
					page?: number;
					processed_document_id?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "processed_document_chunks_processed_document_id_fkey";
						columns: ["processed_document_id"];
						referencedRelation: "processed_documents";
						referencedColumns: ["id"];
					},
				];
			};
			processed_document_summaries: {
				Row: {
					id: number;
					processed_document_id: number | null;
					summary: string;
					summary_embedding: string;
					tags: string[];
				};
				Insert: {
					id?: number;
					processed_document_id?: number | null;
					summary: string;
					summary_embedding: string;
					tags: string[];
				};
				Update: {
					id?: number;
					processed_document_id?: number | null;
					summary?: string;
					summary_embedding?: string;
					tags?: string[];
				};
				Relationships: [
					{
						foreignKeyName: "processed_document_summaries_processed_document_id_fkey";
						columns: ["processed_document_id"];
						referencedRelation: "processed_documents";
						referencedColumns: ["id"];
					},
				];
			};
			processed_documents: {
				Row: {
					file_checksum: string;
					file_size: number;
					id: number;
					num_pages: number;
					processing_error: string | null;
					processing_finished_at: string | null;
					processing_started_at: string | null;
					registered_document_id: number | null;
				};
				Insert: {
					file_checksum: string;
					file_size: number;
					id?: number;
					num_pages: number;
					processing_error?: string | null;
					processing_finished_at?: string | null;
					processing_started_at?: string | null;
					registered_document_id?: number | null;
				};
				Update: {
					file_checksum?: string;
					file_size?: number;
					id?: number;
					num_pages?: number;
					processing_error?: string | null;
					processing_finished_at?: string | null;
					processing_started_at?: string | null;
					registered_document_id?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "processed_documents_registered_document_id_fkey";
						columns: ["registered_document_id"];
						referencedRelation: "registered_documents";
						referencedColumns: ["id"];
					},
				];
			};
			registered_documents: {
				Row: {
					id: number;
					metadata: Json | null;
					registered_at: string;
					source_type: string;
					source_url: string;
				};
				Insert: {
					id?: number;
					metadata?: Json | null;
					registered_at: string;
					source_type: string;
					source_url: string;
				};
				Update: {
					id?: number;
					metadata?: Json | null;
					registered_at?: string;
					source_type?: string;
					source_url?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			match_document_chunks: {
				Args: {
					embedding: string;
					match_threshold: number;
					match_count: number;
					min_content_length: number;
					num_probes: number;
				};
				Returns: {
					id: number;
					processed_document_id: number;
					content: string;
					similarity: number;
				}[];
			};
			match_summaries: {
				Args: {
					embedding: string;
					match_threshold: number;
					match_count: number;
					min_content_length: number;
					num_probes: number;
				};
				Returns: {
					id: number;
					processed_document_id: number;
					content: string;
					similarity: number;
				}[];
			};
			regenerate_embedding_indices_for_chunks: {
				Args: Record<PropertyKey, never>;
				Returns: undefined;
			};
			regenerate_embedding_indices_for_summaries: {
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
