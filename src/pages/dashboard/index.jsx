import React, { useState,useEffect} from "react";
import Card from "@/components/ui/Card";
import ImageBlock2 from "@/components/partials/widget/block/image-block-2";
import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
import TopCompany from "@/components/partials/Table/TopCompany.jsx";
import HomeBredCurbs from "./HomeBredCurbs";
import RadialsChart from "@/components/partials/widget/chart/radials";
import whoAuth from "../../services/auth/auth.who.js";
import {useNavigate} from "react-router-dom";
import authTokenExpired from "@/services/auth/auth.token.expired.js";

const Ecommerce = () => {
  const navigate=useNavigate();

  useEffect(() => {
    // Fonction qui contient le code de l'effet
    const checkUserAndToken = () => {

      if (whoAuth.isCurrentUserManager()) {
        navigate('/403'); // Redirigez vers une page d'erreur 403 si l'utilisateur est un gestionnaire
      }

      const storedToken = localStorage.getItem('accessToken');

      if (storedToken) {

        const isExpired = authTokenExpired;

        if (isExpired) {
          localStorage.removeItem('accessToken');
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    checkUserAndToken();
    const intervalId = setInterval(checkUserAndToken, 2 * 60 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
      <div>
        <HomeBredCurbs title="Dashboard" />
        <div className="grid grid-cols-12 gap-5 mb-5">
          <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
            <ImageBlock2 />
          </div>
          <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
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
            <Card title="Aperçu de la situation">
              <RadialsChart />
            </Card>
          </div>

          <div className="col-span-12">
            <Card title="Les meilleurs entreprises" noborder>
              <TopCompany />
            </Card>
          </div>



        </div>
      </div>
  );
};

export default Ecommerce;
