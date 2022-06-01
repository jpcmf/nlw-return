import { useState } from 'react';

import bugImageUrl from '../../assets/icon-bug.svg';
import ideiaImageUrl from '../../assets/icon-idea.svg';
import thoughtImageUrl from '../../assets/icon-thought.svg';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto',
    },
  },
  IDEA: {
    title: 'Idea',
    image: {
      source: ideiaImageUrl,
      alt: 'Image de uma lâmpada',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Image de nuvem pensamento',
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes; // TODO:

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-80">
      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : !feedbackType ? (
        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
      ) : (
        <FeedbackContentStep
          feedbackType={feedbackType}
          onFeedbackRestartRequested={handleRestartFeedback}
          onFeedbackSent={() => setFeedbackSent(true)}
        />
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela{' '}
        <a
          className="underline underline-offset-2"
          href="https://taginfraestrutura.com.br/"
        >
          TAG IMF
        </a>
      </footer>
    </div>
  );
}
