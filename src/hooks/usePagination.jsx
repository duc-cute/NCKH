/** @format */

import React, { useMemo } from "react";
import { generateRange } from "../ultils/helper";
import { BsThreeDots } from "react-icons/bs";
const usePagination = ({ total, currentPage, siblingCount = 1, limit }) => {
  const paginationArr = useMemo(() => {
    const pageSize = limit || +import.meta.env.VITE_PROD_LIMIT || 10;
    const paginationCount = Math.ceil(total / pageSize);
    const totalPaginationItem = siblingCount + 5;

    if (paginationCount <= totalPaginationItem)
      return generateRange(1, paginationCount);

    const isShowLeft = currentPage - siblingCount > 2;
    const isShowRight = currentPage + siblingCount < paginationCount - 1;

    if (isShowLeft && !isShowRight) {
      const rightStart = paginationCount - 3;
      const rightRange = generateRange(rightStart, paginationCount);
      return [1, <BsThreeDots />, ...rightRange];
    }

    if (!isShowLeft && isShowRight) {
      const leftRange = generateRange(1, 4);

      return [...leftRange, <BsThreeDots />, paginationCount];
    }

    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const siblingRight = Math.min(currentPage + siblingCount, paginationCount);

    if (isShowLeft && isShowRight) {
      const middleRange = generateRange(siblingLeft, siblingRight);

      return [
        1,
        <BsThreeDots />,
        ...middleRange,
        <BsThreeDots />,
        paginationCount,
      ];
    }
  }, [total, currentPage, siblingCount]);
  return paginationArr;
};

//[1,2,3,4,5,6]
//[1,...6,7,8,9]
//[1,2,3,4,...10]
//[1,...6,7,,...10]

export default usePagination;
