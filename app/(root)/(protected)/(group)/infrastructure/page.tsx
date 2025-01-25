"use client";

import AgentCard from "@/components/Dashboard/AgentCard";
import Title from "@/components/Dashboard/Title";
import Tracker from "@/components/Dashboard/Tracker";
import Loading from "@/components/shared/Loading";
import { IKey } from "@/models/key.model";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [agents, setAgents] = useState<IKey["agents"]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

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
        console.log("data.agents", data.agents);
        setAgents(data.agents);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setError("Failed to fetch agents. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <Title title="Infrastructure" bx_icon="bx bx-server" />
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
        <div className="flex flex-1">
          {agents && agents.length > 0 ? (
            <div className="flex-1 flex-center">
              {agents.map((agent, index) => (
                <div
                  key={index}
                  className={`agent flex-center relative size-10`}
                >
                  <Link
                    href={`/infrastructure/${agent.agent_id}`}
                    // color change will be implimented based on oninitivity
                    className="text-5xl text-green-400 hover:text-green-500 rotate-45 transition-all"
                  >
                    <i className="bx bxs-square" />
                  </Link>
                  <AgentCard agent={agent} />
                </div>
              ))}
            </div>
          ) : (
            <p>No server/agents available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
