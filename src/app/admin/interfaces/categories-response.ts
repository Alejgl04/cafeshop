export interface Category {
  id:     string;
  name:   string;
  status: boolean;
}

export interface CategoryCreate {
  ok: boolean;
  message: string;
}
