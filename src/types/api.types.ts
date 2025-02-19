export type Breed = string;

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface SearchResult {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export enum SearchQueryParam {
  SIZE = "size",
  FROM = "from",
  SORT = "sort",
}

export enum FilterType {
  BREEDS = "breeds",
  ZIP_CODES = "zipCodes",
  AGE_MIN = "ageMin",
  AGE_MAX = "ageMax",
}

export enum SortField {
  BREED = "breed",
  NAME = "name",
  AGE = "age",
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export interface MatchResult {
  match: string;
}