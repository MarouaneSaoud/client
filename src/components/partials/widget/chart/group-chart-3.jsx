import Icon from "@/components/ui/Icon";
import shade2 from "@/assets/images/all-img/shade-2.png";
import shade3 from "@/assets/images/all-img/shade-3.png";
import shade4 from "@/assets/images/all-img/shade-4.png";
import DeviceService from "../../../../services/device.services";
import React,{useState,useEffect} from "react";
import shade1 from "@/assets/images/all-img/shade-1.png";
import CompanyServices from "@/services/company.services.js";
import getEmail from "@/services/auth/auth.email.js";


const GroupChart3 = () => {
  const [statistic, setStatistic] = useState( {});

  const statistics = [

    {
      title: "Devices",
      bg: "bg-warning-500",
      text: "text-primary-500",
      count: statistic.device,
      img: shade1,
    },
    {
      title: "Groups ",
      count: statistic.group,
      bg: "bg-info-500",
      text: "text-primary-500",
      img: shade2,
      percentClass: "text-primary-500",
    },
    {
      title: "Clients",
      count: statistic.client,
      bg: "bg-primary-500",
      text: "text-danger-500",
      img: shade3,
      percentClass: "text-danger-500",
    },

  ];
  async function getDevicesCount() {
    try {
      let result = await CompanyServices.companyStatistic(getEmail());
      setStatistic(result.data)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDevicesCount();
  }, []);
  return (
    <>
      {statistics.map((item, i) => (
        <div
          key={i}
          className={`${item.bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}
        >
          <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
            <img
              src={item.img}
              alt=""
              draggable="false"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">
            {item.title}
          </span>
          <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-6">
            {item.count}
          </span>
        </div>
      ))}
    </>
  );
};

export default GroupChart3;
