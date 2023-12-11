import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ChangePage } from "../../../redux/features/activePage";
import SideBarAdmin from "../../../components/SideBarAdmin";
import Header from "../../../components/Header";
import { Oval } from 'svg-loaders-react';

function Dashboard() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(ChangePage('dashboard'));
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="flex w-full h-full bg-zinc-300 items-start justify-start">
        <SideBarAdmin />
        <section className="w-full items-center justify-center flex flex-col">
          <Header />
          <div className="w-full h-full flex items-center justify-center p-24">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold text-gray-500">
                <Oval />
              </h1>
            </div>
          </div>
        </section>
      </div>
    );

  return (
    <div className="flex w-full h-full bg-zinc-300 items-start justify-start">
      <SideBarAdmin />
      <section className="w-full items-center justify-center flex flex-col">
        <Header />
        <div className="w-full h-full flex items-center justify-center p-24">

        </div>
      </section >
    </div >
  );
}

export default Dashboard;
