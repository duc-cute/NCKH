/** @format */

import React, { memo, useEffect, useState } from "react";
import Empty from "../../assets/images/no-data.jpg";
import { twMerge } from "tailwind-merge";
import Pagination from "../Paginate/Pagination";
import { useSearchParams } from "react-router-dom";

const Table = ({
  title,
  columns,
  data,
  groupButton,
  dataScoreOther,
  maxH,
  limit,
}) => {
  const [displayData, setDisplayData] = useState(null);
  const [params] = useSearchParams();
  const limits = limit || +import.meta.env.VITE_PROD_LIMIT;
  const page = +params.get("page") || 1;
  const offset = limits * (page - 1);

  const handleSort = (key) => {
    const sortData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setDisplayData(sortData.slice(offset, offset + limits));
  };

  useEffect(() => {
    if (data) {
      setDisplayData(data.slice(offset, offset + limits));

      // const queries = Object.fromEntries([...params]);
    }
  }, [params, data]);
  // console.log("displayData", displayData);

  return (
    <>
      <div className="relative  h-full  font-roboto text-[#000000E0] w-full">
        {groupButton && (
          <div className="flex items-center justify-between rounded-t-md bg-[#fafafa] py-2 px-4 ">
            <h3 className="capitalize text-[18px] font-semibold ">{title}</h3>
            <div className="flex items-center gap-2 font-normal">
              {groupButton?.map((btn) => (
                <div key={btn?.id}>{btn.button}</div>
              ))}
            </div>
          </div>
        )}
        {dataScoreOther}
        <div
          className={twMerge(
            `relative w-full   overflow-auto ${
              maxH ? `h-[${maxH}px]` : "h-table"
            }`
          )}
        >
          <table className="w-full h-full  text-left rtl:text-right">
            <thead className="text-[14px]  capitalize font-semibold bg-[#fafafa] py-2">
              <tr>
                {columns?.map((column, index) => (
                  <th key={index} scope="col" className="px-4 py-3 ">
                    <div className="flex items-center whitespace-nowrap">
                      {column?.title}
                      {column?.sort && (
                        <span onClick={() => handleSort(column?.key)}>
                          <svg
                            className="w-3 h-3 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data && data?.length > 0 ? (
                <>
                  {displayData?.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b border-[1px] border-gray-100 border-solid font-medium  hover:bg-gray-50 "
                    >
                      {columns?.map((column, ind) => (
                        <td key={ind} className="px-4 py-4">
                          {column.render
                            ? column.render(item[column.key], item)
                            : item[column.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="bg-white border-b border-[1px] border-gray-100 border-solid font-medium  hover:bg-gray-50">
                  <td colSpan={columns.length} className="mx-auto">
                    <div className="  w-full   h-full">
                      <img
                        className="w-[200px] py-3 h-[200px] mx-auto object-cover"
                        src={Empty}
                        alt="Empty"
                      />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div
          className="w-full bg-white px-4 py-1"
          aria-label="Table navigation"
        >
          {data && data?.length > 0 && (
            <Pagination totalCount={data.length} limit={limit} />
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Table);
