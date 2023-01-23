export interface INewFlashcard {
  type: string;
  description: string;
}

export interface IFlashcard extends INewFlashcard {
  fc_type_id: number;
  sets_count: number;
  created_at: string;
  updated_at: string;
}

export interface IUpdateFlashcard extends INewFlashcard {
  id: number;
}
