import { shuffleArray } from './utils';

export type Question = {
  category: string;
  difficulty: string;
  type: string;
  question: {
    text: string;
  };
  incorrectAnswers: string[];
  correctAnswer: string;
};

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestions = async (): //   amount: number,
//   difficulty: Difficulty
Promise<QuestionsState[]> => {
  const endpoint = `https://the-trivia-api.com/v2/questions`;

  const data = await (await fetch(endpoint)).json();

  return data?.map((question: Question) => ({
    question: question?.question,
    answers: shuffleArray([
      ...question?.incorrectAnswers,
      question?.correctAnswer,
    ]),
    correctAnswer: question?.correctAnswer,
  }));
};
