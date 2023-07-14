import React, { useState,useEffect} from "react";
import Card from "@/components/ui/Card";
import ImageBlock2 from "@/components/partials/widget/block/image-block-2";
import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
import SelectMonth from "@/components/partials/SelectMonth";
import RecentOrderTable from "../../components/partials/Table/recentOrder-table";
import HomeBredCurbs from "./HomeBredCurbs";
import RadialsChart from "@/components/partials/widget/chart/radials";
import whoAuth from "../../services/auth/ath.who";
import {useNavigate} from "react-router-dom";

const Ecommerce = () => {
  const [filterMap, setFilterMap] = useState("usa");
  const navigate=useNavigate();
  useEffect(()=>{
    if(whoAuth.isCurrentUserManager()){
      navigate("/403");
    }
  })
  return (
      <div>
        <HomeBredCurbs title="Dashboard" />
        <div className="grid grid-cols-12 gap-5 mb-5">
          <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
            <ImageBlock2 />
          </div>
          <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
              <GroupChart2 />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-8 col-span-12">
            <Card>
              <div className="legend-ring">
                <RevenueBarChart />
              </div>
            </Card>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <Card title="Overview" headerslot={<SelectMonth />}>
              <RadialsChart />
            </Card>
          </div>

          <div className="col-span-12">
            <Card title="Recent Orders" headerslot={<SelectMonth />} noborder>
              <RecentOrderTable />
            </Card>
          </div>



        </div>
      </div>
  );
};

export default Ecommerce;
