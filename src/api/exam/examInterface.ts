export interface INewExam {
  examSeriesId: number;
  name: string;
  pointReward: number;
  hashtag?: string[];
  isFullExplanation: boolean;
  duration: number;
  hashtagText: string;
}

export interface IUpdateExam extends INewExam {
  id?: number;
}

export interface IExam extends IUpdateExam {
  totalPart?: number;
  totalQuestion?: number;
  totalComment?: number;
  numsJoin?: number;
  createdAt?: string;
  updatedAt?: string;
  parts?: IPart[];
}

export interface IPart {
  id?: number;
  examId: number;
  name: string;
  totalQuestion?: number;
  numberOfExplanation?: number;
  numericOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISet {
  id?: number;
  partId: number;
  title: string;
  numericOrder?: number;
  audio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IQuestion {
  id?: number;
  setQuestionId: number;
  level: string;
  name: string;
  hashtagId?: number;
  explain?: string;
  orderQn?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IChoice {
  id?: number;
  questionId?: number;
  name: string;
  key: boolean;
  orderChoice?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const initialExam = {
  id: -1,
  examSeriesId: -1,
  name: '',
  pointReward: 0,
  hashtag: [],
  isFullExplanation: false,
  duration: 0,
  hashtagText: '',
};

export const initialPart = {
  examId: -1,
  name: '',
};

export const initialSet: ISet = {
  partId: -1,
  title: '',
  audio: '',
};

export const initialQuestion: IQuestion = {
  id: -1,
  setQuestionId: -1,
  level: 'easy',
  name: '',
  hashtagId: -1,
  explain: '',
  orderQn: -1,
};

export const initialChoice: IChoice = {
  name: '',
  key: false,
};
