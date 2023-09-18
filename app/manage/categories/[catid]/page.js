import Navbar from "../../../../components/Navbar";
import Managecategories from "../../../../components/Managecategories";
import { getServerSession } from "next-auth";
import { options } from "../../../api/auth/[...nextauth]/options";

export default async function Page({ params, searchParams }) {
  const session = await getServerSession(options);
  // console.log(session);
  // console.log(params);
  console.log(searchParams);

  return (
    <div className="overflow-scroll w-[100vw]">
      <Navbar state={"manage"} session={session} />
      <Managecategories params={params} />
    </div>
  );
}

export async function generateMetadata({ params, searchParams }) {
  return {
    title: searchParams.catname,
  };
}
