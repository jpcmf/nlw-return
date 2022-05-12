import { ButtonClose } from '../../ButtonClose';
import { FeedbackType, feedbackTypes } from '..';

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function FeedbackTypeStep(props: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <ButtonClose />
      </header>

      <div className="flex py-8 gap-2 w-full">
        {/* TODO: */}
        {/* 
        // Object.entries(feedbackTypes) =>
        // [
        // ['BUG', { ...}], ['IDEIA', { ...}], ['THOUGHT', { ...}]
        // ] 
        */}
        {Object.entries(feedbackTypes).map(([key, value], item) => {
          //   console.log(item);
          //   console.log(key);
          return (
            <button
              key={key}
              className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
              onClick={() => props.onFeedbackTypeChanged(key as FeedbackType)}
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
