import { Popover } from '@headlessui/react';
import { X } from 'phosphor-react';

interface ButtonCloseProps {
  text?: string;
}

export function ButtonClose(props: ButtonCloseProps) {
  return (
    <>
      <Popover.Button
        className="top-5 right-5 absolute text-zinc-400 hover:text-zinc-100 transition-colors"
        title="Fechar formulário de feedback"
      >
        {/* {props.text ?? 'Default'} */}
        <X className="w-4 h-4" weight="bold" />
      </Popover.Button>
    </>
  );
}
