import Navbar from "../../../../components/Navbar";
import ProductPage from "../../../../components/ProductPage";
import { getServerSession } from "next-auth";
import { options } from "../../../api/auth/[...nextauth]/options";
import Test2 from "../../../../components/Test2";

export default async function productpage({ params, searchParams }) {
  const session = await getServerSession(options);
  console.log(session);
  console.log(params);

  return (
    <>
      <div className="overflow-scroll w-[100vw]">
        <Navbar state={"manage"} session={session} />
        {/* <div className="bg-orange-400 h-[4vh] w-[5vw]">{params.prid}</div> */}
        <ProductPage prid={params.prid} />
        {/* <Test2 prid={params.prid}/> */}
      </div>
    </>
  );
}

export async function generateMetadata({ params, searchParams }) {
  return {
    title: searchParams.prname,
  };
}
