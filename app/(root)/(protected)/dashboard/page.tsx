"use client";

import { IMetric } from "@/models/metric.model";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [metrics, setMetrics] = useState<IMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/agent/metrics", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // If needed, include Authorization header
            // Authorization: `Bearer ${yourApiKey}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch metrics: ${response.statusText}`);
        }

        const data = await response.json();
        setMetrics(data.metrics); // Update the state with fetched metrics
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message || "Failed to fetch metrics");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div>Loading metrics...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Metrics Dashboard</h1>
      {metrics.length === 0 ? (
        <p>No metrics found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Agent ID</th>
                <th className="border border-gray-300 px-4 py-2">CPU Usage</th>
                <th className="border border-gray-300 px-4 py-2">
                  Memory Usage
                </th>
                <th className="border border-gray-300 px-4 py-2">Disk Usage</th>
                <th className="border border-gray-300 px-4 py-2">
                  Network (Download/Upload)
                </th>
                <th className="border border-gray-300 px-4 py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric: IMetric, index) =>
                metric.metrics.map((m, idx: number) => (
                  <tr key={`${index}-${idx}`}>
                    <td className="border border-gray-300 px-4 py-2">
                      {metric.agent_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {m.cpu_usage}%
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {m.memory_usage}%
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {m.disk_usage}%
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {m.network_usage.download.toFixed(2)} MB /{" "}
                      {m.network_usage.upload.toFixed(2)} MB
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {m.timestamp.toString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
