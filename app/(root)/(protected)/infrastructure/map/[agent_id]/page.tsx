"use client";

import Tracker from "@/components/Dashboard/Tracker";
import Divider from "@/components/shared/Divider";
import Loading from "@/components/shared/Loading";
import { getToken } from "@/lib/utils";
import { IAgent } from "@/models/agent.model";
import { IMetric } from "@/models/metric.model";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LineChart from "@/components/Charts/LineChart";

const Page = () => {
  const pathname = usePathname();
  const agent_id = pathname?.split("/").filter(Boolean).pop();
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const [agent, setAgent] = useState<IAgent>();
  const [metric, setMetric] = useState<IMetric>();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setUpdateTrigger((prev) => !prev);
  //   }, 15000);

  //   return () => clearInterval(interval);
  // }, []);

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

  const chartLabels = metric?.metrics.map((m) =>
    new Date(m.timestamp).toLocaleTimeString()
  );
  const cpuData = metric?.metrics.map((m) => m.cpu_usage);
  const memoryData = metric?.metrics.map((m) => m.memory_usage);
  const diskData = metric?.metrics.map((m) => m.disk_usage);
  const networkData = metric?.metrics.map((m) => m.network_usage);
  const download = metric?.metrics.map((m) => m.network_usage.download);
  const upload = metric?.metrics.map((m) => m.network_usage.upload);
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
                public ip: <b>{agent?.device_info.public_ip}</b>
              </p>
              <p className="text-gray-500/60">
                id: <b>{agent?.agent_id}</b>
              </p>
            </div>

            <h3 className="h3 font-bold">{agent?.device_info.hostname}</h3>
            <p className="text-gray-500/60">
              Alises: <b>{agent?.device_info.node_name}</b>
            </p>

            <Divider width="95" opacity="0.2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
            {metric && (
              <>
                {/* <div className="bg-white p-2 rounded-md">
                  <LineChart
                    labels={chartLabels || []}
                    dataPoints={cpuData || []}
                    title="CPU Usage (%)"
                    borderColor="rgba(75, 192, 192, 1)"
                    backgroundColor="rgba(75, 192, 192, 0.2)"
                  />
                </div>
                <div className="bg-white p-2 rounded-md">
                  <LineChart
                    labels={chartLabels || []}
                    dataPoints={memoryData || []}
                    title="Memory Usage (%)"
                    borderColor="rgba(153, 102, 255, 1)"
                    backgroundColor="rgba(153, 102, 255, 0.2)"
                  />
                </div>
                <div className="bg-white p-2 rounded-md"> */}
                {/* <LineChart
                  labels={chartLabels || []}
                  dataPoints={[diskData!]}
                  title="Disk Usage (%)"
                  borderColor={["rgba(255, 159, 64, 1)"]}
                  backgroundColor={["rgba(255, 159, 64, 0.2)"]}
                /> */}
                {/* </div> */}

                <LineChart
                  labels={chartLabels || []}
                  dataPoints={[download!, upload!]}
                  title="Network Usage (%)"
                  borderColor={[
                    "rgba(255, 99, 132, 1)",
                    "rgba(0, 255, 100, 1)",
                  ]}
                  backgroundColor={[
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(0, 255, 100, 0.2)",
                  ]}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
