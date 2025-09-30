export interface CreatePost {
  project_uuid: string;
  content: string;
  medias: string[];
  is_published: boolean;
}

export interface Post {
  id: string;
  project_uuid: string;
  content: string;
  medias: string[];
  is_published: boolean;
  created_at?: string;
  // add other fields returned by the API as needed
}