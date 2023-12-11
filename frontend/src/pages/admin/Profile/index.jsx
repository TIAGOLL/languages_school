import { useDispatch } from "react-redux";
import Header from "../../../components/Header";
import SideBarAdmin from "../../../components/SideBarAdmin";
import profileAdmPage from "../../../services/profileAdmPage";
import { useEffect, useState } from "react";
import { Oval } from 'svg-loaders-react';
import { ChangePage } from "../../../redux/features/activePage";

function Profile() {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  async function loadData() {
    profileAdmPage.loadData()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    dispatch(ChangePage('professionals'))
    loadData();
  });


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
        <div className="p-4 items-start justify-center flex w-full h-[calc(100vh-100px)] gap-4 flex-wrap overflow-x-auto ">

        </div>
      </section >
    </div >
  );
}

export default Profile;
