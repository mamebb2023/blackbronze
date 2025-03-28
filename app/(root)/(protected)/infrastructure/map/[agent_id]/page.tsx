/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Tracker from "@/components/Dashboard/Tracker";
import Divider from "@/components/shared/Divider";
import { convertSize, getTimeAgo } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LineChart from "@/components/Charts/LineChart";
import Image from "next/image";
import ErrorOrLoading from "@/components/Dashboard/ErrorOrLoading";
import { useAuth } from "@/context/AuthContext";

const Page = () => {
  const pathname = usePathname();
  const agent_id = pathname?.split("/").filter(Boolean).pop();
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const { token } = useAuth();

  const [agent, setAgent] = useState<any>();
  const [metric, setMetric] = useState<any>();

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
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [updateTrigger, agent_id, token]);

  // Prepare chart labels
  const chartLabels =
    metric?.metrics?.map((m: { timestamp: string }) =>
      new Date(m.timestamp).toLocaleTimeString()
    ) || [];

  // CPU Usage Chart
  const cpuData = [
    {
      label: "Overall Usage",
      data: metric?.metrics?.map((m: any) => m.cpu.cpu_percent) || [],
      borderColor: "rgba(0, 200, 0, 1)",
      backgroundColor: "rgba(0, 200, 0, 0.2)",
    },
  ];

  const cpuTimePercentData = [
    {
      label: "User",
      data:
        metric?.metrics?.map((m: any) => m.cpu.cpu_times_percent.user) || [],
      borderColor: "rgba(50, 10, 100, 1)",
      backgroundColor: "rgba(50, 10, 100, 0.2)",
    },
    {
      label: "System",
      data:
        metric?.metrics?.map((m: any) => m.cpu.cpu_times_percent.system) || [],
      borderColor: "rgba(200, 50, 0, 1)",
      backgroundColor: "rgba(200, 50, 0, 0.2)",
    },
    {
      label: "Idle",
      data:
        metric?.metrics?.map((m: any) => m.cpu.cpu_times_percent.idle) || [],
      borderColor: "rgba(100, 100, 0, 1)",
      backgroundColor: "rgba(100, 100, 0, 0.2)",
    },
  ];

  // Memory Usage Chart
  const memoryData = [
    {
      label: "Used Memory",
      data: metric?.metrics?.map((m: any) => m.memory.used) || [],
      borderColor: "rgba(255, 0, 0, 1)",
      backgroundColor: "rgba(255, 0, 0, 0.2)",
    },
    {
      label: "Free Memory",
      data: metric?.metrics?.map((m: any) => m.memory.free) || [],
      borderColor: "rgba(0, 0, 255, 1)",
      backgroundColor: "rgba(0, 0, 255, 0.2)",
    },
  ];

  // Disk Usage Chart
  const diskData = [
    {
      label: "Used Disk Space",
      data: metric?.metrics?.map((m: any) => m.disk.disk_space_used) || [],
      borderColor: "rgba(255, 165, 0, 1)",
      backgroundColor: "rgba(255, 165, 0, 0.2)",
    },
    {
      label: "Free Disk Space",
      data: metric?.metrics?.map((m: any) => m.disk.disk_space_free) || [],
      borderColor: "rgba(0, 128, 0, 1)",
      backgroundColor: "rgba(0, 128, 0, 0.2)",
    },
  ];

  // Network Usage Chart
  const networkData = [
    {
      label: "Bytes Sent",
      data:
        metric?.metrics?.map(
          (m: any) => m.network.active_interfaces[0]?.bytes_sent || 0
        ) || [],
      borderColor: "rgba(255, 69, 0, 1)",
      backgroundColor: "rgba(255, 69, 0, 0.2)",
    },
    {
      label: "Bytes Received",
      data:
        metric?.metrics?.map(
          (m: any) => m.network.active_interfaces[0]?.bytes_recv || 0
        ) || [],
      borderColor: "rgba(70, 130, 180, 1)",
      backgroundColor: "rgba(70, 130, 180, 0.2)",
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      <Tracker />

      {error || loading ? (
        <ErrorOrLoading error={error} loading={loading} />
      ) : (
        <>
          <div className="flex flex-col gap-1 bg-white rounded-md p-3">
            {/* ip address and host-id */}
            <div className="text-gray-500/60 flex items-center justify-between text-sm">
              <p>
                Public ip:{" "}
                <span className="font-bold">
                  {
                    metric?.metrics[metric?.metrics.length - 1].network
                      .public_ip
                  }
                </span>
              </p>

              <p>
                host-id: <span className="font-bold">{agent?.agent_id}</span>
              </p>
            </div>

            {/* name and logo */}
            <div className="flex gap-2 items-center justify-between px-2">
              <div>
                <div className="flex gap-2 items-center">
                  <h5 className="h5 leading-tight font-bold">
                    {agent?.device_info.hostname}
                  </h5>

                  <div
                    className={`px-3 rounded-full ${
                      metric?.metrics[metric?.metrics.length - 1].status ===
                      "online"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    <p className="text-white text-sm">
                      {metric?.metrics[metric?.metrics.length - 1].status}
                    </p>
                  </div>
                </div>
                <p className="text-sm body-2 text-gray-500/70">
                  Aliases:{" "}
                  <span className="font-bold">
                    {agent?.device_info.node_name}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2">
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
                    {agent?.device_info.version} - {agent?.device_info.machine}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 flex gap-2">
            {/* cpu */}
            <div className="flex-grow bg-white rounded-md p-2">
              <p className="font-bold text-green-500">CPU</p>
              <div className="px-3 text-gray-500/70 text-xs flex flex-col gap-1">
                <p className="">{agent?.device_info.cpu.cpu_name}</p>
                <p className="">
                  {agent?.device_info.cpu.cpu_architecture} -{" "}
                  <span className="font-bold">
                    {agent?.device_info.cpu.cpu_freq.max / 1000}GHz
                  </span>
                </p>
                <p>
                  <span className="font-bold">
                    {agent?.device_info.cpu.cpu_physical_cores}
                  </span>{" "}
                  Pyhsical Cores
                </p>
                <p>
                  <span className="font-bold">
                    {agent?.device_info.cpu.cpu_logical_cores}
                  </span>{" "}
                  Logical Cores
                </p>
                <p>
                  Frequency (min, max):{" "}
                  <span className="font-bold">
                    {agent?.device_info.cpu.cpu_freq.min},{" "}
                    {agent?.device_info.cpu.cpu_freq.max}
                  </span>
                </p>
              </div>
            </div>
            {/* memory */}
            <div className="flex-grow bg-white rounded-md p-2">
              <p className="font-bold text-red-500">Memory</p>
              <div className="px-3 text-gray-500/70 text-xs flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p>Total Space</p>
                  <span className="font-bold">
                    {convertSize(agent?.device_info.memory.total, "B").value}{" "}
                    {convertSize(agent?.device_info.memory.total, "B").in}
                  </span>{" "}
                </div>
                <div className="flex items-center justify-between">
                  <p>Slots</p>
                  <span className="font-bold">
                    {agent?.device_info.memory.slots}
                  </span>{" "}
                </div>
              </div>
            </div>
            {/* disk */}
            <div className="flex-grow bg-white rounded-md p-2">
              <p className="font-bold text-blue-500">Disk</p>
              <div className="px-3 text-gray-500/70 text-xs flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p>Total Space</p>
                  <span className="font-bold">
                    {
                      convertSize(agent?.device_info.disk.disk_total_space, "B")
                        .value
                    }{" "}
                    {
                      convertSize(agent?.device_info.disk.disk_total_space, "B")
                        .in
                    }
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p>Partitions</p>
                    <span className="font-bold">
                      {agent?.device_info.disk.disk_partitions.length}
                    </span>
                  </div>
                  <ul className="list-disc list-inside">
                    {agent?.device_info.disk.disk_partitions?.map(
                      (disk: any, index: number) => (
                        <li key={index} className="">
                          <span className="font-bold">{disk.device}</span>{" "}
                          {disk.fstype}{" "}
                          {convertSize(disk.total_space, "B").value}{" "}
                          {convertSize(disk.total_space, "B").in}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
            {/* network */}
            <div className="flex-grow bg-white rounded-md p-2">
              <p className="font-bold text-purple-500">Network</p>
              <div className="px-3 text-gray-500/70 text-xs flex flex-col gap-1">
                <div className="font-bold">
                  <ul className="flex flex-col gap-1">
                    {agent?.device_info.network.network_interfaces.map(
                      (network: any, index: number) => (
                        <li
                          key={index}
                          className="flex items-center justify-between"
                        >
                          {network.interface}
                          <span className="font-normal">
                            {network.mac_address || "Unknown"}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Divider width="90" opacity="0.2" />

          <h6 className="h6 font-normal text-sm text-gray-700">
            Latest Metrics:{" "}
            <span className="font-bold">
              {getTimeAgo(
                metric?.metrics[metric?.metrics.length - 1].timestamp
              )}
            </span>
          </h6>

          <div className="flex flex-wrap mt-3 gap-4">
            <div>
              <LineChart
                title="CPU Usage"
                labels={chartLabels}
                datasets={cpuData}
              />
            </div>
            <div>
              <LineChart
                title="CPU Time Percent"
                labels={chartLabels}
                datasets={cpuTimePercentData}
              />
            </div>
            <div>
              <LineChart
                title="Memory Usage"
                labels={chartLabels}
                datasets={memoryData}
              />
            </div>
            <div>
              <LineChart
                title="Disk Usage"
                labels={chartLabels}
                datasets={diskData}
              />
            </div>
            <div>
              <LineChart
                title="Network Usage"
                labels={chartLabels}
                datasets={networkData}
              />
            </div>
          </div>

          {/* Services Table */}
          <div className="mt-5 bg-white rounded-md p-4">
            <h4 className="text-lg font-bold">Running Services</h4>
            <table className="w-full border-collapse border border-gray-200 mt-2">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">PID</th>
                  <th className="border p-2">Service</th>
                  <th className="border p-2">Local Address</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {metric?.metrics[0]?.services.map(
                  (service: any, index: number) => (
                    <tr key={index} className="border">
                      <td className="p-2">{service.pid}</td>
                      <td className="p-2">{service.service}</td>
                      <td className="p-2">{service.local_address || "N/A"}</td>
                      <td className="p-2">{service.status}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
