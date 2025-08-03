import { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./default";
import React from "react";
import { Button } from "../../atoms";
import { QuizCheckModal } from "./quiz-check";

const meta: Meta<typeof Modal> = {
  title: "Molecules/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "닫기" },
    onConfirm: { action: "확인" },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const TextModalWithTrigger: Story = {
  render: (args) => {
    const TextModalWithState = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <div className="min-h-80 flex items-center justify-center bg-background">
          <Button variant="outline" onClick={() => setOpen(true)}>
            텍스트 모달 열기
          </Button>
          <Modal
            {...args}
            open={open}
            onClose={() => setOpen(false)}
            onConfirm={() => {
              args.onConfirm?.();
              setOpen(false);
            }}
          />
        </div>
      );
    };

    return <TextModalWithState />;
  },
  args: {
    variant: "text",
    title: "Text Modal",
    subtext: "Explain the modal content here.",
    confirmText: "Confirm",
    cancelText: "Cancel",
  },
};

export const ContainedModalWithTrigger: Story = {
  render: (args) => {
    const ContainedModalWithState = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <div className="min-h-80 flex items-center justify-center bg-background">
          <Button onClick={() => setOpen(true)}>Contained 모달 열기</Button>
          <Modal
            {...args}
            open={open}
            onClose={() => setOpen(false)}
            onConfirm={() => {
              args.onConfirm?.();
              setOpen(false);
            }}
          />
        </div>
      );
    };

    return <ContainedModalWithState />;
  },
  args: {
    variant: "contained",
    title: "Contained Button Modal",
    subtext: "Explain the modal content here.",
    confirmText: "Confirm",
    cancelText: "Cancel",
  },
};

export const QuizCheckModalWithTrigger: Story = {
  render: (args) => {
    const QuizCheckModalWithState = () => {
      const [open, setOpen] = React.useState(true);

      return (
        <div className="min-h-80 flex items-center justify-center bg-background">
          <Button onClick={() => setOpen(true)}>Quiz Check 모달 열기</Button>
          <QuizCheckModal {...args} open={open} onClose={() => setOpen(false)} />
        </div>
      );
    };

    return <QuizCheckModalWithState />;
  },
  args: {
    variant: "contained",
    title: "Quiz Check Modal",
    subtext: "Explain the modal content here.",
  },
};
