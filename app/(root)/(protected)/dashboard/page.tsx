"use client";

import Loading from "@/components/shared/Loading";
import { IMetric } from "@/models/metric.model";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [metrics, setMetrics] = useState<IMetric[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        const start_date = ""; // Optional: Set start date if required
        const end_date = ""; // Optional: Set end date if required

        const queryParams = new URLSearchParams();

        if (start_date) queryParams.append("start_date", start_date);
        if (end_date) queryParams.append("end_date", end_date);

        const response = await fetch(
          `/api/agent/metrics?${queryParams.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch metrics: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("data.metrics", data.metrics);

        setMetrics(data.metrics);
      } catch (error) {
        console.error("Error fetching metrics:", error);
        setError("Failed to fetch metrics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  console.log("metrics", metrics);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-start p-1 px-5 shadow-md">
        <h5 className="flex-center gap-2 h5 font-bold">
          <i className="bx bxs-dashboard"></i>
          Dashboard
        </h5>
      </div>

      <div className="flex-1 flex flex-col p-3 bg-gray-500/10">
        {/* route tracker */}

        <div className="my-1 py-2 px-5 text-gray-500/50 text-sm">
          route tracker here
        </div>

        {error || loading ? (
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
        ) : (
          <div className="flex flex-wrap gap-5">
            {metrics.length === 0 ? (
              <p>No metrics data available.</p>
            ) : (
              <>
                {/* number of agents */}
                <div className="flex flex-col w-full max-w-[300px] shadow-lg rounded-lg py-3 px-7 border-b-4 border-black bg-white">
                  <div>
                    <p className="text-sm uppercase text-gray-500/50">
                      Servers
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <h1 className="h1">{metrics.length}</h1>
                    <Image
                      src="/icons/server.png"
                      alt="Servers"
                      width={45}
                      height={45}
                      draggable={false}
                    />
                  </div>
                </div>

                {/* total number of metrics */}
                <div className="flex flex-col w-full max-w-[300px] shadow-lg rounded-lg py-3 px-7 border-b-4 border-color-primary bg-white">
                  <div>
                    <p className="text-sm uppercase text-gray-500/50">
                      Total Metrics
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <h1 className="h1">
                      {metrics.reduce(
                        (acc, curr) => acc + curr.metrics.length,
                        0
                      )}{" "}
                      <span className="body-2 text-sm text-gray-500/50">
                        from {metrics.length} server(s)
                      </span>
                    </h1>
                    <i className="bx bxs-bar-chart-alt-2 text-4xl text-color-primary"></i>
                  </div>
                </div>

                {/* error */}
                <div className="flex flex-col w-full max-w-[300px] shadow-lg rounded-lg py-3 px-7 border-b-4 border-red-500 bg-white">
                  <div>
                    <p className="text-sm uppercase text-gray-500/50">Errors</p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <h1 className="h1 text-red-500">1</h1>
                    <i className="bx bxs-danger text-4xl text-red-500"></i>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
