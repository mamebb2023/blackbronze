"use client";

import Title from "@/components/Dashboard/Title";
import Tracker from "@/components/Dashboard/Tracker";
import Loading from "@/components/shared/Loading";
import { IKey } from "@/models/key.model";
import Link from "next/link";
import { HoverCard } from "radix-ui";
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
            <div className="flex-1 flex-center gap-1">
              {agents.map((agent, index) => (
                <HoverCard.Root openDelay={0} closeDelay={0} key={index}>
                  <HoverCard.Trigger asChild>
                    <div
                      // <Link
                      //   href={`/infrastructure/${agent.agent_id}`}
                      // color change will be implimented based on onlinitivity
                      className="flex-center text-5xl text-green-400 hover:text-green-500 rotate-45 transition-all"
                    >
                      <i className="bx bxs-square" />
                      {/* </Link> */}
                    </div>
                  </HoverCard.Trigger>
                  <HoverCard.Content
                    sideOffset={5}
                    side="top"
                    className="HoverCardContent w-[350px] bg-white rounded-md p-2"
                  >
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500/40">
                        id: {agent.agent_id}
                      </span>

                      <Link
                        href={`/agent/${agent.agent_id}`}
                        className="flex-center p-1 rounded-full hover:bg-gray-500/10"
                      >
                        <i className="bx bx-link-external"></i>
                      </Link>
                    </div>

                    <div>
                      <h4>
                        name, os icon, notif/alert some details like cpu usage,
                        memory usage, status on/offline
                      </h4>
                    </div>

                    <div className="flex items-center justify-end text-gray-500/40 text-xs">
                      created at: {new Date(agent.created_at).toLocaleString()}
                    </div>
                    <HoverCard.Arrow className="fill-white" />
                  </HoverCard.Content>
                </HoverCard.Root>
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
