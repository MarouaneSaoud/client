import React, {useState,useEffect} from "react";
import Icon from "@/components/ui/Icon";
import ClientService from "../../../../services/client.services";
import getEmail from "@/services/auth/auth.email.js";

const GroupChart4 = () => {
  const [client, setclient] = useState( {});

  const statistics = [
    {
      title: "nom",
      count: client.name,
      bg: "bg-info-500",
      text: "text-info-500",
      percent: "25.67% ",
      icon: "heroicons-outline:menu-alt-1",
    },
    {
      title: "Appareils ",
      count:client.device,
      bg: "bg-warning-500",
      text: "text-warning-500",
      percent: "8.67%",
      icon: "heroicons-outline:chart-pie",
    },
  ];
  async function getClientCount() {
    try {
      let result = await ClientService.CountClientDevices(getEmail());
      console.log(result)
      setclient(result.data)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getClientCount();
  }, []);
  return (
    <>
      {statistics.map((item, i) => (
        <div
          key={i}
          className={`${item.bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-50 text-center`}
        >
          <div
            className={`${item.text} mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 `}
          >
            <Icon icon={item.icon} />
          </div>
          <span className="block text-sm text-slate-600 font-medium dark:text-white mb-1">
            {item.title}
          </span>
          <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium">
            {item.count}
          </span>
        </div>
      ))}
    </>
  );
};

export default GroupChart4;
