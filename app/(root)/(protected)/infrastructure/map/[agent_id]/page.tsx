/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Tracker from "@/components/Dashboard/Tracker";
import Divider from "@/components/shared/Divider";
import { convertSize, getToken } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LineChart from "@/components/Charts/LineChart";
import Image from "next/image";
import ErrorOrLoading from "@/components/Dashboard/ErrorOrLoading";

const Page = () => {
  const pathname = usePathname();
  const agent_id = pathname?.split("/").filter(Boolean).pop();
  const [updateTrigger, setUpdateTrigger] = useState(false);

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

        console.log(data.agent, data.metric);
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
  const chartLabels =
    metric?.metrics?.map((m: { timestamp: string | number | Date }) =>
      m.timestamp ? new Date(m.timestamp).toLocaleTimeString() : ""
    ) || [];

  return (
    <div className="flex flex-col flex-1">
      <Tracker />

      {error || loading ? (
        <ErrorOrLoading error={error} loading={loading} />
      ) : (
        <>
          <div className="flex flex-col gap-1 bg-white rounded-md p-3">
            {/* ip address and host-id */}
            <div className="text-gray-500/60 flex items-center justify-between">
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
                          {disk.fstype} {convertSize(disk.space, "B").value}{" "}
                          {convertSize(disk.space, "B").in}
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

          <div className="">
            <div className="p-2 bg-white">
              <h6 className="h6 font-normal">Cpu Usage</h6>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
