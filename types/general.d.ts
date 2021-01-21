interface SearchResult {
  hitsPerPage: number;
  totalPages: number;
  totalHits: number;
  currentPage: number;
  results: Guide[];
  searchStr: string;
}

interface Guide {
  content: string;
  id: number;
  lastModifiedDate: string;
  name: string;
  fullURL: string;
  summary: string;
  thumbnailURL: string;
}

interface SearchOptions {
  from?: string;
  to?: string;
  types?: string[];
  page?: number;
}
