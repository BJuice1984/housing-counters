import { observer } from 'mobx-react';
import { useStore } from '../models/RootStore';
import { PaginationButton } from './PaginationButton';

const Pagination = observer(() => {
  const store = useStore();

  const handlePageChange = (page: number) => {
    store.setPage(page);
  };

  const renderFirstPages = () => {
    const pages = [];
    const startPage = store.currentPage > 2 ? store.currentPage - 2 : 1;
    const endPage = startPage + 4;

    for (let i = startPage; i <= endPage && i <= store.totalPages - 3; i++) {
      pages.push(
        <PaginationButton
          key={i}
          page={i}
          currentPage={store.currentPage}
          onClick={() => handlePageChange(i)}
        />
      );
    }
    return pages;
  };

  const renderLastPages = () => {
    const lastPages = store.totalPages - 2;
    const pages = [];

    for (let i = lastPages; i <= store.totalPages; i++) {
      pages.push(
        <PaginationButton
          key={i}
          page={i}
          currentPage={store.currentPage}
          onClick={() => handlePageChange(i)}
        />
      );
    }

    return pages;
  };

  const renderEllipsis = () => {
    if (store.currentPage < store.totalPages - 5) {
      return (
        <span className="h-[32px] w-[32px] flex justify-center leading-8 border box-border text-sm font-normal leading-5 cursor-default">
          ...
        </span>
      );
    }
    return null;
  };

  return (
    <>
      {store.totalPages > 1 && (
        <nav className="self-end justify-self-end flex items-center space-x-2 py-2 pr-4 h-[48px]">
          <PaginationButton
            page={1}
            currentPage={store.currentPage}
            onClick={() => handlePageChange(1)}
            isDouble
            disabled={!store.previous}
          />

          <PaginationButton
            page={store.currentPage - 1}
            currentPage={store.currentPage}
            onClick={() =>
              store.previous && handlePageChange(store.currentPage - 1)
            }
            isArrow
            disabled={!store.previous}
          />

          {renderFirstPages()}

          {renderEllipsis()}

          {renderLastPages()}

          <PaginationButton
            page={store.currentPage + 1}
            currentPage={store.currentPage}
            onClick={() =>
              store.next && handlePageChange(store.currentPage + 1)
            }
            isArrow
            disabled={!store.next}
          />
        </nav>
      )}
    </>
  );
});

export default Pagination;
