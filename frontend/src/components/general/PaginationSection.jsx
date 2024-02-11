import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaginationItem, PaginationLink, PaginationContent, PaginationPrevious, PaginationNext, Pagination, PaginationEllipsis } from '@/components/ui/pagination';


function PaginationSection({
  data,
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = searchParams.get('page')
  const perPage = searchParams.get('per_page')


  const totalPosts = data?.length;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / perPage); i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5
  const pageNumLimit = Math.floor(maxPageNum / 1.5);

  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setSearchParams(state => {
        state.set('page', parseInt(currentPage) + 1)
        return state
      })
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setSearchParams(state => {
        state.set('page', parseInt(currentPage) - 1)
        return state
      })
    }
  };

  useEffect(() => {
    if (!currentPage) {
      setSearchParams(state => {
        state.set('page', 1)
        return state
      })
    }
    if (!perPage) {
      setSearchParams(state => {
        state.set('per_page', 10)
        return state
      })
    }
  }, [currentPage, perPage, searchParams, setSearchParams])

  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      < PaginationItem
        key={idx}
        className={currentPage == page ? "bg-neutral-100 rounded-md" : ""}
      >
        <PaginationLink onClick={() => setSearchParams((state) => {
          state.set('page', page)
          return state
        })} className="hover:cursor-pointer">
          {page}
        </PaginationLink>
      </ PaginationItem>
    ));

    // Add ellipsis at the start if necessary
    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setSearchParams((state) => {
            state.set('page', activePages[0] - 1)
            return state
          })}
        />
      );
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() => setSearchParams((state) => {
            state.set('page', activePages[activePages.length - 1] + 1)
            return state
          })}
        />
      );
    }

    return renderedPages;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} className="hover:cursor-pointer" />
          </PaginationItem>
          {renderPages()}
          <PaginationItem>
            <PaginationNext onClick={handleNextPage} className="hover:cursor-pointer" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PaginationSection;