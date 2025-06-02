import { FC } from 'react';

type Props = {
  tabs: {
    id: string;
    label: string;
  }[];
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const EventsTabs: FC<Props> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div>
      <div className='border-t-2 border-[#CDCDCD] mb-6'>
        <div
          className='flex space-x-4 overflow-x-auto px-4 sm:flex-row flex-col items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0 text-2xl'
          role='tablist'
          aria-label='Evenemang kategorier'
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role='tab'
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              className={`
                                px-4 py-2 rounded-b-md font-semibold whitespace-nowrap transition cursor-pointer
                                ${
                                  activeTab === tab.id
                                    ? 'bg-[#CDCDCD] text-[#2b0404]'
                                    : 'text-[#CDCDCD] hover:bg-gray-600/20'
                                }
                            `.trim()}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsTabs;
