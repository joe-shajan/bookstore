import type { ReactNode } from "react";
import React from "react";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
}

export function Modal({ isOpen, children }: ModalType): JSX.Element {
  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-70 z-50 p-6 md:p-0">
          <div className="block bg-white w-full md:w-1/3 h-auto rounded-lg">
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
