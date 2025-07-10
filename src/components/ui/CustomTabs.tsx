import { useState } from "react";

interface TabOption {
  label: string;
  value: string;
}

interface CustomTabsProps {
  tabs: TabOption[];
  defaultValue: string;
  children: React.ReactNode;
}

export function CustomTabs({ tabs, defaultValue, children }: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const tabContent = Array.isArray(children)
    ? children.find((child: any) => child.props.value === activeTab)
    : children;

  return (
    <div className="w-full">
      <div className="flex justify-around border-b border-zinc-700">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`relative cursor-pointer px-4 py-2 text-sm font-medium transition-colors w-full
              ${activeTab === tab.value ? "text-white" : "text-gray-400"}
              bg-transparent`}
          >
            {tab.label}
            {activeTab === tab.value && (
              <span className="absolute left-1/2 -bottom-[2px] w-full h-[3px] -translate-x-1/2 rounded-full bg-green-500 transition-all" />
            )}
          </button>
        ))}
      </div>

      <div className="pt-4">{tabContent}</div>
    </div>
  );
}

export function CustomTabContent({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
