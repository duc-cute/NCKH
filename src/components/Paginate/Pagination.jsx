/** @format */

import React, { memo } from "react";
import usePagination from "../../hooks/usePagination";
import PaginaItem from "./PaginaItem";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount, limit }) => {
  const [params] = useSearchParams();
  const page = +params.get("page");
  const limits = limit || +import.meta.env.VITE_PROD_LIMIT;
  const paginateArr = usePagination({
    total: totalCount,
    currentPage: page,
    limit: limits,
  });
  return (
    <>
      <nav className="flex justify-between items-center">
        {!page ? (
          <span className="text-sm text-gray-700 ">
            Showing <span className="font-semibold text-gray-900 ">1</span> to
            <span className="font-semibold text-gray-900 ">
              {" "}
              {Math.min(limits, totalCount)}
            </span>{" "}
            of
            <span className="font-semibold text-gray-900 ">
              {" "}
              {totalCount}
            </span>{" "}
            Student
          </span>
        ) : (
          <span className="text-sm text-gray-700 ">
            Showing{" "}
            <span className="font-semibold text-gray-900 ">
              {(page - 1) * limits + 1}
            </span>{" "}
            to
            <span className="font-semibold text-gray-900 ">
              {" "}
              {Math.min(page * limits, totalCount)}
            </span>{" "}
            of
            <span className="font-semibold text-gray-900 ">
              {" "}
              {totalCount}
            </span>{" "}
            Student
          </span>
        )}
        <ul className="inline-flex -space-x-px text-base h-10">
          {paginateArr?.map((el, index) => (
            <li key={index}>
              <PaginaItem>{el}</PaginaItem>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default memo(Pagination);
