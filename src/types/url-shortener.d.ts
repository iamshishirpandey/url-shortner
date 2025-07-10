export interface ShortenUrlRequest {
  url: string;
}

export interface ShortenUrlResponse {
  original: string;
  shortened: string;
  shortUrl: string;
}

export interface ShortenUrlError {
  error: string;
}

export interface FormValues {
  url: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}