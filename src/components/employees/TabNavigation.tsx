interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode; // Assuming icons are React components
  onClick?: () => void; // Optional click handler for each tab
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  className = "",
}) => {
  return (
    <div className="flex border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`inline-flex items-center py-2 px-4 ${className} ${
            activeTabId === tab.id
              ? `text-brand border-brand border-b-2 font-medium`
              : "text-gray-700 dark:text-white"
          }`}
          onClick={() => {
            if (tab.onClick) tab.onClick();
            onTabChange(tab.id);
          }}
        >
          <span className="mr-2">{tab.icon}</span> {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
