import Navbar from "../../components/Navbar";
import { getServerSession } from "next-auth";
import { options } from "../../app/api/auth/[...nextauth]/options";

export default async function manage() {
  const session = await getServerSession(options);

  console.log(session);

  return (
    <>
      <div className="bg-white bg-opacity-5 overflow-hidden">
        <Navbar state={"manage"} session={session} />
      </div>
    </>
  );
}

// export async function generateMetadata({ params, searchParams }) {
//   return {
//     title: searchParams.prname,
//   };
// }
