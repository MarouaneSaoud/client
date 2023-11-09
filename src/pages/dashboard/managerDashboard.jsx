import React, {useEffect, useState} from "react";
import Card from "@/components/ui/Card";
import GroupChart3 from "../../components/partials/widget/chart/group-chart-3";
import Calculation from "../../components/partials/widget/chart/Calculation";
import HomeBredCurbs from "./HomeBredCurbs";
import CompanyService from "../../services/company.services";
import getEmail from "../../services/auth/auth.email";
import TopClient from "@/components/partials/Table/TopClient.jsx";

const CrmPage = () => {
  const [company, setCompany] = useState([]);
  async function getCompany() {
    try {
      let result = await CompanyService.infosCompany(getEmail());
      setCompany(result.data);

    } catch (error) {
    }
  }
  useEffect(()=> {
    getCompany()
  },[])
  const campaigns = [
    {
      name: "Nom",
      value: company.name,
    },
    {
      name: "Nom alternatif",
      value: company.altName,
    },
    {
      name: "Email",
      value: company.email,
    },
    {
      name: "Adresse",
      value: company.address,
    },

  ];
  return (
    <div>
      <HomeBredCurbs  title="Dashboard" />
      <div className="space-y-5">
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-8 col-span-12 space-y-5">
            <Card>
              <div className="grid xl:grid-cols-3 lg:grid-cols-2 col-span-1 gap-3">
                <GroupChart3 />
              </div>
            </Card>
            <Card title="Les meilleurs clients" noborder>
                <div className="col-span-12">
                  <TopClient />
                </div>
            </Card>
          </div>
          <div className="lg:col-span-4 col-span-12 space-y-5">
            <div className="lg:col-span-4 col-span-12 space-y-5">
              <Card title="Entreprise" >
                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                  {campaigns.map((item, i) => (
                    <li
                      key={i}
                      className="first:text-xs text-sm first:text-slate-600 text-slate-600 dark:text-slate-300 py-2 first:uppercase"
                    >
                      <div className="flex justify-between">
                        <span>{item.name}</span>
                        <span>{item.value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card title="Statistiques des appareils" >
                <div className="legend-ring3">
                  <Calculation />
                </div>
              </Card>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CrmPage;
