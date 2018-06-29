import * as React from 'react';

// import './Pagination.scss';
import { Link } from 'react-router-dom';
import { Pagination as BasePagination, PaginationItem, PaginationLink as BasePaginationLink } from 'reactstrap';

export const PaginationLink = (props: any) => <BasePaginationLink {...props} />;

export interface PaginationProps {
  url?: string;
  limit: number;
  label?: string;
  skip?: number;
  length?: number;
}

export const PaginationNav: React.StatelessComponent<PaginationProps> = (props: PaginationProps) => {
  const { label = 'Page', url = '', limit, length, skip = 0 } = props;
  const currentPage = Math.floor(skip / limit);
  const pages = length ? Math.floor(length / limit) : undefined;

  // Generate left pages range
  const leftRange = pages ? Array.apply(null, { length: currentPage }).map(Function.call, Number) : [];

  // Generate right pages range
  let rightRange = pages ? Array.apply(null, {
    length: Math.min(5, pages - currentPage - 1),
  }).map(Function.call, Number) : [];

  rightRange = rightRange.splice(1, rightRange.length).map((i: number) => i + currentPage);

  return (
    <BasePagination size="sm" style={{ justifyContent: 'center' }}>
      {skip ? <PaginationItem>
        <PaginationLink previous tag={Link}
          to={`${url}?skip=${Math.max(0, ((skip || 0) - limit))}`} />
      </PaginationItem> : ' '}
      {leftRange.map((i: number) => (
        <PaginationItem>
          <PaginationLink tag={Link} to={`${url}?skip=${i * limit}`}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled>
        <PaginationLink>{label} {currentPage + 1}</PaginationLink>
      </PaginationItem>
      {rightRange.map((i: number) => (
        <PaginationItem>
          <PaginationLink tag={Link} to={`${url}?skip=${i * limit}`}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      {(pages && rightRange.length < pages) ? (
        <PaginationItem disabled>
          <PaginationLink>...</PaginationLink>
        </PaginationItem>
      ) : ' '}
      {pages && skip < pages ? <PaginationItem>
        <PaginationLink next tag={Link} to={`${url}?skip=${skip + limit}`} />
      </PaginationItem> : ' '}
    </BasePagination>
  );
};
