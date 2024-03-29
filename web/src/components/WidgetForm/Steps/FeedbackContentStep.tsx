import { FormEvent, useState } from 'react';
import { ArrowLeft } from 'phosphor-react';
import { api } from '../../../lib/api';
import { FeedbackType, feedbackTypes } from '..';
import { Loading } from '../../Loading';
import { ButtonClose } from '../../ButtonClose';
import { ButtonScreenshot } from '../ButtonScreenshot';

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    setIsSendingFeedback(true);

    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot,
    });

    setIsSendingFeedback(false);

    onFeedbackSent();
  }

  return (
    <>
      <header className="flex">
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <ButtonClose />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border border-zinc-600 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none rounded-md bg-transparent scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhe o que está acontecendo"
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ButtonScreenshot
            screenshot={screenshot}
            onScreenshotTrigger={setScreenshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0 || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  );
}
