import { useState, useEffect } from "react";

export default function LazyLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => setVisible(false), 800); 
    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <div className="fixed inset-0 bg-white flex flex-col gap-2 items-center justify-center z-50 transition-opacity duration-500 ease-in-out opacity-100">
      <img
        src="/Logo.png"
        alt="TaskDuty Loading"
        className="w-8 animate-spin"
      /><span className="text-lg md:text-xl font-semibold text-gray-400">
            TaskDuty
          </span>
    </div>
  ) : null;
}