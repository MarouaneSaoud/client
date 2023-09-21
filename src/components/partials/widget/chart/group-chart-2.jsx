import React,{useState,useEffect} from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import DeviceService from "../../../../services/device.services";
import CompanyService from "@/services/company.services.js";
import GroupService from "../../../../services/groupDevice.services";
import ClientService from "../../../../services/client.services";
import AuthService from "../../../../services/auth.services";
const shapeLine1 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#00EBFF"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
    },
  },
};
const shapeLine2 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#FB8F65"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
    },
  },
};
const shapeLine3 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#5743BE"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
    },
  },
};


const GroupChart2 = () => {
  const [deviceCount, setDeviceCount] = useState( 0);
  const [companyCount, setCompanyCount] = useState( 0);
  const [userCount, setUserCount] = useState( 0);
  const [groupCount, setGroupCount] = useState( 0);

  const statistics = [
    {
      name: shapeLine1,
      title: "Appareils",
      count: deviceCount,
      bg: "bg-[#E5F9FF] dark:bg-slate-900	",
      text: "text-info-500",
      icon: "heroicons:arrow-trending-up-solid",
    },

    {
      name: shapeLine3,
      title: "Groupe d'appareils",
      count: groupCount,
      bg: "bg-[#EAE6FF] dark:bg-slate-900	",
      text: "text-[#5743BE]",
      icon: "heroicons:arrow-trending-up-solid",
    },

    {
      name: shapeLine3,
      title: "Utilisateurs",
      count: userCount,
      bg: "bg-[#e6ffe7] dark:bg-slate-900	",
      text: "text-[#70be43]",
      icon: "heroicons:arrow-trending-up-solid",
    },
    {
      name: shapeLine2,
      title: "Entreprise",
      count: companyCount,
      bg: "bg-[#FFEDE6] dark:bg-slate-900	",
      text: "text-warning-500",
      icon: "heroicons:arrow-trending-up-solid",
    },
  ];
  async function getGroupCount() {
    try {
      let result = await GroupService.countGroup();
      setGroupCount(result.data);
    } catch (error) {
      console.log(error)
    }
  }
  async function getDevicesCount() {
    try {
      let result = await DeviceService.countDevices();
      setDeviceCount(result.data);
    } catch (error) {
      console.log(error)
    }
  }
  async function getUsersCount() {
    try {
      let result = await AuthService.countUsers();
      setUserCount(result.data);
    } catch (error) {
      console.log(error)
    }
  }
  async function getCompaniesCount() {
    try {
      let result = await CompanyService.countCompany();
      setCompanyCount(result.data);
    } catch (error) {
      console.log(error)
    }
  }
    useEffect(() => {
      getDevicesCount();
      getCompaniesCount();
      getUsersCount();
      getGroupCount();
    }, []);
  return (
    <>
      {" "}
      {statistics.map((item, i) => (
        <div key={i}>
          <Card bodyClass="pt-4 pb-3 px-4 ">
            <div className="flex space-x-3 rtl:space-x-reverse ">
              <div className="flex-none ">
                <div
                  className={`${item.bg} ${item.text} h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl`}
                >
                  <Icon icon={item.icon} />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-slate-600 dark:text-slate-300 text-sm mb-1 font-medium">
                  {item.title}
                </div>
                <div className="text-slate-900 dark:text-white text-lg font-medium ">
                  {item.count}
                </div>
              </div>
            </div>

          </Card>
        </div>
      ))}
    </>
  );
};

export default GroupChart2;
