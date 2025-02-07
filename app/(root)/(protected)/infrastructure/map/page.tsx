"use client";

import AgentsList from "@/components/Agent/AgentList";
import Title from "@/components/Dashboard/Title";
import Tracker from "@/components/Dashboard/Tracker";
import Loading from "@/components/shared/Loading";
import { getToken } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const Page = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [agents, setAgents] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const simpleMetrics = [
    {
      title: "CPU (%)",
      icon: "memory_alt",
      color: "text-blue-500 bg-blue-100",
      alt: "cpu_usage",
    },
    {
      title: "Memory (%)",
      icon: "memory",
      color: "text-red-500 bg-red-100",
      alt: "memory_usage",
    },
    {
      title: "Disk (%)",
      icon: "storage",
      color: "text-green-500 bg-green-100",
      alt: "disk_usage",
    },
    {
      title: "Network",
      icon: "swap_vert",
      color: "text-purple-500 bg-purple-100",
      alt: "network_usage",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateTrigger((prev) => !prev);
    }, 15000);
    return clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("No authentication token found.");
        }

        const response = await fetch("/api/agent", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch agents: ${response.statusText}`);
        }

        const data = await response.json();
        setAgents(data.agents);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setError("Failed to fetch agents. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [updateTrigger]);

  return (
    <div className="flex flex-col flex-1">
      <Title title="Map" bx_icon="bx bx-server" />
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
        <div className="flex-center flex-1">
          {agents && agents.length > 0 ? (
            <AgentsList agents={agents} simpleMetrics={simpleMetrics} />
          ) : (
            <p>No server/agents available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
