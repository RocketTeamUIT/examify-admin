import { INewFlashcard, IUpdateFlashcard } from './flashcardInterface';
import axiosBase from 'api/axios';

export function getFlashcardTypeService() {
  return axiosBase.get(`/flashcard-types`);
}

export function createFlashcardTypeService({ type, description }: INewFlashcard) {
  return axiosBase.post('/flashcard-types/create', {
    type,
    description,
  });
}

export function updateFlashcardTypeService({ id, type, description }: IUpdateFlashcard) {
  return axiosBase.put(`/flashcard-types/update/${id}`, {
    type,
    description,
  });
}

export function deleteFlashcardTypeService(id: number) {
  return axiosBase.delete(`/flashcard-types/delete/${id}`);
}
