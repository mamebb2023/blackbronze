"use client";

import AgentsList from "@/components/Agent/AgentList";
import Title from "@/components/Dashboard/Title";
import Tracker from "@/components/Dashboard/Tracker";
import Loading from "@/components/shared/Loading";
import { getToken } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [agents, setAgents] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateTrigger((prev) => !prev);
    }, 15000);

    return () => clearInterval(interval); // Correct cleanup function
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
            <AgentsList agents={agents} />
          ) : (
            <div className="flex-1 flex-center">
              <div className="flex-center flex-col">
                <Image
                  src="/icons/server.png"
                  width={100}
                  height={100}
                  alt="Server image"
                />
                <h3 className="h3">No Data</h3>
                <p className="body-2 text-gray-500/50">
                  Deploy your first host with just simple steps
                </p>
                <Link
                  href="/docs/get-started"
                  className="text-color-tertiary underline"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
