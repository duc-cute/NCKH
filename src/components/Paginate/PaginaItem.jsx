/** @format */

import React, { memo } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const PaginaItem = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  const handlePagination = () => {
    const queries = Object.fromEntries(params);
    if (Number(children)) queries.page = children;
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  };
  return (
    <button
      className={`${
        Number(children)
          ? "items-center hover:bg-gray-100 hover:text-main"
          : "items-end pb-2 cursor-default"
      } ${
        +params.get("page") === children ||
        (!Number(params.get("page")) && +children === 1)
          ? " bg-gray-100 text-main"
          : "bg-white"
      }  border-none flex  justify-center px-4 h-10 leading-tight text-[#333]    `}
      type="button"
      disabled={!Number(children)}
      onClick={handlePagination}
    >
      {children}
    </button>
  );
};

export default memo(PaginaItem);
