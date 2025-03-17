import React from "react";
import Skeleton from "./SkeltonLoader";
import SkeltonCards from "./SkeltonCard";

const HomeSkeleton = () => {
  return (
    <>
      <div className="w-full h-[80vh] sm:h-[90vh] relative bg-gray-900">
        <Skeleton className="absolute inset-0 w-full h-full" />
        <div className="absolute top-1/2 left-1/2 sm:left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-center sm:text-left text-white w-4/5 sm:w-1/3">
          <Skeleton className="h-8 sm:h-12 w-2/3 mb-4" />
          <Skeleton className="h-4 sm:h-6 w-full mb-5" />
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-5 items-center sm:items-start">
            <Skeleton className="h-10 w-24 sm:w-32 rounded-full" />
            <Skeleton className="h-10 w-24 sm:w-32 rounded-full" />
          </div>
        </div>
      </div>
      <SkeltonCards/>
 
    </>
  );
};

export default HomeSkeleton;
