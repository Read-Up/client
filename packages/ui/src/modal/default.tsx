'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Button } from '@repo/ui/button';

const modalContentVariants = cva(
  'relative w-[337px] h-[178px] bg-white rounded-modal shadow-lg p-6 text-center',
  {
    variants: {
      variant: {
        text: 'border border-gray-200',
        contained: 'border border-gray-200',
      }
    },
    defaultVariants: {
      variant: 'text'
    },
  }
);

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof modalContentVariants> {
  open: boolean;
  title: string;
  subtext: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
  className,
  variant,
  open,
  title,
  subtext,
  onClose,
  onConfirm,
  confirmText = 'Positive',
  cancelText = 'Negative',
  ...props
}) => {
  return (
    open &&
    <div
      onClick={onClose}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/30'
      {...props}
    >
      <div className={cn(modalContentVariants({ className, variant }))}>
        {/* <div className="w-[337px] h-[178px] bg-white rounded-modal shadow-lg p-6 text-center"> */}
        <h2 className="text-modal_title font-bold">{title}</h2>
        <p className="text-modal_subtext text-black mt-2">{subtext}</p>
        <div className="absolute bottom-0 left-0 w-full h-15 flex flex-row items-center justify-center">
          {variant === 'text' ? (
            <>
              <button onClick={onClose} className="w-1/2 text-gray-30">{cancelText}</button>
              <button onClick={onConfirm} className="w-1/2 text-primary">{confirmText}</button>
            </>
          ) : (
            <div className="w-full px-5 flex flex-row items-center justify-center gap-5">
              <Button variant="outline" size="full" onClick={onClose}>{cancelText}</Button>
              <Button variant="default" size="full" onClick={onConfirm}>{confirmText}</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Modal };

{/* <div className="fixed inset-0 flex items-center justify-center bg-black/30">
        <div className="w-[320px] bg-white rounded-xl shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-black">Modal Title</h1>
          <p className="text-base text-black">Modal Subtitle</p>
          <div className="w-full flex flex-row justify-center items-center gap-5">
            <Button>확인</Button>
            <Button>취소</Button>
          </div>
        </div>
      </div> */}
