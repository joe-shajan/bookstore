"use client";

import { useCallback, useState } from "react";

export default function useModal(): {
  isOpen: boolean;
  toggle: () => void;
  openModal: () => void;
  closeModal: () => void;
} {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    toggle,
    openModal,
    closeModal,
  };
}
