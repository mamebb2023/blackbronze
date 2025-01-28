"use client";

import Loading from "@/components/shared/Loading";
import Tracker from "@/components/Dashboard/Tracker";
import { IMetric } from "@/models/metric.model";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Title from "@/components/Dashboard/Title";

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

  return (
    <div className="flex flex-1 flex-col">
      <Title title="Dashboard" bx_icon="bx bx-grid-alt" />

      <Tracker />

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
        <div className="flex-1 flex items-start justify-start gap-5">
          {metrics.length === 0 ? (
            <p>No metrics data available.</p>
          ) : (
            <div className="flex-1 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {/* number of agents/servers */}
              <div className="flex flex-col  shadow-lg rounded-lg py-3 px-7 border-b-4 border-black bg-white">
                <div>
                  <p className="text-xs uppercase text-gray-500/60">Servers</p>
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
              <div className="flex flex-col  shadow-lg rounded-lg py-3 px-7 border-b-4 border-color-primary bg-white">
                <div>
                  <p className="text-xs uppercase text-gray-500/60">
                    Total Metrics
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <h1 className="h1">
                    {metrics.reduce(
                      (acc, curr) => acc + curr.metrics.length,
                      0
                    )}
                  </h1>
                  <i className="bx bxs-bar-chart-alt-2 text-4xl text-color-primary"></i>
                </div>
              </div>

              {/* error */}
              <div className="flex flex-col  shadow-lg rounded-lg py-3 px-7 border-b-4 border-red-500 bg-white">
                <div>
                  <p className="text-xs uppercase text-gray-500/60">Errors</p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <h1 className="h1 text-red-500">1</h1>
                  <i className="bx bx-error text-4xl text-red-500"></i>
                </div>
              </div>

              {/* something */}
              <div className="flex flex-col  shadow-lg rounded-lg py-3 px-7 border-b-4 border-color-tertiary bg-white">
                <div>
                  <p className="text-xs uppercase text-gray-500/60">
                    something
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <h1 className="h1">3.4</h1>
                  <i className="bx bxs-error text-4xl text-color-tertiary"></i>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
