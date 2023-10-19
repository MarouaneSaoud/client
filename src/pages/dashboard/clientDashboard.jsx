import React from "react";
import Card from "@/components/ui/Card";
import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";
import ClientDevice from "./../client/clientDevice"
import HomeBredCurbs from "./HomeBredCurbs";
const ProjectPage = () => {
    return (
        <div className="space-y-5">
            <HomeBredCurbs title="Project" />
            <div className="grid grid-cols-12 gap-5">
                <div className="lg:col-span-12 col-span-12 space-y-5">
                    <Card>
                        <div className="grid grid-cols-12 gap-5">
                            <div className="xl:col-span-12 col-span-12">
                                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
                                    <GroupChart4 />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="lg:col-span-12 col-span-12 space-y-5">

                        <div className="grid grid-cols-12 gap-5">
                            <div className="xl:col-span-12 col-span-12">
                                <div className="grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-1">
                                    <ClientDevice/>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
        </div>


    );
};

export default ProjectPage;
