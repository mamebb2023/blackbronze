"use client";

import Loading from "@/components/shared/Loading";
import { getToken } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const pathname = usePathname();
  const agent_id = pathname?.split("/").filter(Boolean).pop();
  const [updateTrigger, setUpdateTrigger] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [agent, setAgent] = useState<any>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  setInterval(() => {
    setUpdateTrigger((prev) => !prev);
  }, 15000);

  useEffect(() => {
    if (!agent_id) return;

    // Fetching from your API or backend
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
        setAgent(data);
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

  return (
    <div className="flex flex-col flex-1">
      {/* <Tracker /> */}

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
        <p>{agent?.device_info.hostname}</p>
      )}
    </div>
  );
};

export default Page;
