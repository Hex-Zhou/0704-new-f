export interface Auth {
  id: number;
  identity: number;
  token: {
    access_token: string;
    refresh_token: string;
  };
}
export interface FileServerInfo {
  id: number;
  host: string;
  localhost: string;
  pic_path: string;
}

export interface ApiResponse {
  code: number;
  status: string;
  data: any;
}
