import React from 'react';

interface PaginationButtonProps {
  page: number;
  currentPage: number;
  onClick: () => void;
  isDouble?: boolean;
  isArrow?: boolean;
  disabled?: boolean;
}

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  page,
  currentPage,
  onClick,
  isDouble = false,
  isArrow = false,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-[32px] w-[32px] border box-border text-sm font-normal leading-5 ${
        disabled
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : page === currentPage
            ? 'bg-background-button text-text-main'
            : 'bg-background-light hover:bg-gray-300'
      } rounded`}
    >
      {isDouble ? '◀' : isArrow ? (page > currentPage ? '→' : '←') : page}
    </button>
  );
};
