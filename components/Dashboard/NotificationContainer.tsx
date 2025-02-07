import React, { useEffect, useState } from "react";

const NotificationContainer = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => (timer > 0 ? timer - 1 : 15));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-start p-1 px-5 shadow-md text-sm text-gray-700">
      <p>
        Next update in: <span className="font-bold">{timer} sec</span>
      </p>
    </div>
  );
};

export default NotificationContainer;
