"use client";

import Tracker from "@/components/Dashboard/Tracker";
import Divider from "@/components/shared/Divider";
import Loading from "@/components/shared/Loading";
import { getToken } from "@/lib/utils";
import { IAgent } from "@/models/agent.model";
import { IMetric } from "@/models/metric.model";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LineChart from "@/components/Charts/LineChart"; // Import the updated LineChart component
import Image from "next/image";

const Page = () => {
  const pathname = usePathname();
  const agent_id = pathname?.split("/").filter(Boolean).pop();
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const [agent, setAgent] = useState<IAgent>();
  const [metric, setMetric] = useState<IMetric>();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateTrigger((prev) => !prev);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!agent_id) return;

    const fetchData = async () => {
      try {
        const token = getToken();
        const response = await fetch(`/api/agent/${agent_id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch agent data.");
        }
        const data = await response.json();
        setAgent(data.agent);
        setMetric(data.metric);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [updateTrigger, agent_id]);

  // Prepare data for the chart
  const chartLabels = metric?.metrics.map((m) =>
    new Date(m.timestamp).toLocaleTimeString()
  );

  // Individual datasets
  const cpuUsage = {
    label: "CPU Usage (%)",
    data: metric?.metrics.map((m) => m.cpu_usage) || [],
    borderColor: "rgba(75, 192, 192, 1)",
    backgroundColor: "rgba(75, 192, 192, 0.2)",
  };

  const memoryUsage = {
    label: "Memory Usage (%)",
    data: metric?.metrics.map((m) => m.memory_usage) || [],
    borderColor: "rgba(153, 102, 255, 1)",
    backgroundColor: "rgba(153, 102, 255, 0.2)",
  };

  const diskUsage = {
    label: "Disk Usage (%)",
    data: metric?.metrics.map((m) => m.disk_usage) || [],
    borderColor: "rgba(255, 159, 64, 1)",
    backgroundColor: "rgba(255, 159, 64, 0.2)",
  };

  const networkUsage = {
    label: "Network Usage",
    datasets: [
      {
        label: "Upload (%)",
        data: metric?.metrics.map((m) => m.network_usage.upload) || [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Download (%)",
        data: metric?.metrics.map((m) => m.network_usage.download) || [],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  // Array of individual datasets
  const datasets = [cpuUsage, memoryUsage, diskUsage];

  return (
    <div className="flex flex-col flex-1">
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
        <div className="flex-1 flex flex-col">
          <div className="bg-white rounded-md p-3">
            <div className="flex items-center justify-between">
              <p className="text-gray-500/60">
                public ip:{" "}
                <span className="font-bold">
                  {agent?.device_info.public_ip}
                </span>
              </p>
              <p className="text-gray-500/60">
                id: <span className="font-bold">{agent?.agent_id}</span>
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h3 className="h3 font-bold">{agent?.device_info.hostname}</h3>
                <div
                  className={`px-3 rounded-full ${
                    metric?.metrics[metric?.metrics.length - 1].status ===
                    "Online"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                >
                  <p className="text-white text-sm">
                    {metric?.metrics[metric?.metrics.length - 1].status}
                  </p>
                </div>
              </div>

              <div className="px-3 flex items-center gap-2">
                <Image
                  src={`/os/${agent?.device_info.system}${
                    agent?.device_info.system === "Windows" &&
                    `-${agent?.device_info.release}`
                  }.png`}
                  width={40}
                  height={40}
                  alt={`${agent?.device_info.system}-${agent?.device_info.release}`}
                />
                <div>
                  <p className="text-gray-500/60">
                    {agent?.device_info.system} {agent?.device_info.release}
                  </p>
                  <p className="text-gray-500/60">
                    {agent?.device_info.version}
                  </p>
                </div>
              </div>
            </div>

            <Divider width="90" opacity="0.2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
            {datasets.map((dataset, index) => (
              <div key={index} className="bg-white rounded-md p-3">
                <LineChart
                  labels={chartLabels || []}
                  datasets={[dataset]} // Pass all network datasets
                  title={dataset.label}
                />
              </div>
            ))}

            {/* Network Usage Chart */}
            <div className="bg-white rounded-md p-3">
              <LineChart
                labels={chartLabels || []}
                datasets={networkUsage.datasets} // Pass both upload and download datasets
                title="Network Usage"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
