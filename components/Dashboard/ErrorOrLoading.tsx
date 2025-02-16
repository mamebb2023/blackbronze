import React from "react";
import Loading from "../shared/Loading";

const ErrorOrLoading = ({
  error,
  loading,
}: {
  error: string;
  loading: boolean;
}) => {
  return (
    <div className="flex-center flex-1">
      <h6 className="h6 font-normal">
        {error && (
          <p className="text-red-500">
            <span className="font-bold">Error</span>: {error}
          </p>
        )}
        {loading && <Loading />}
      </h6>
    </div>
  );
};

export default ErrorOrLoading;
