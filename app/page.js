import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Navbar from "../components/Navbar";
import HomeBanners from "../components/HomeBanners";

export default async function Home() {
  // const session = await getServerSession(options);

  // console.log(session);
  return (
    <div className="flex flex-col w-[100vw] h-[100vh] bg-white bg-opacity-0 overflow-hidden">
      <div className="bg-yellow-500 bg-opacity-0 w-[100%] min-h-[150vh] overflow-scroll z-[1]">
        <Navbar state="home" />

        {/* firstLoad */}
        <div className="bg-white bg-opacity-0 overflow-visible h-[0vh]">
          <div className="bg-red-500 bg-opacity-0 w-[100%] h-[100vh] flex flex-col z-[-5] BackHomeBeforeLoad">
            {/* Logo */}
            <div className="flex flex-row bg-yellow-300 bg-opacity-0  m-[1vh] mt-[4vh]">
              <div className="bg-green-500 bg-opacity-0 w-[8vh] h-[8vh] ml-[3vw]">
                <img
                  src="digisorien.png"
                  alt="digisorien"
                  className="w-[100%]"
                />
              </div>
              <div className="text-[white] font-[Iransans] text-[4vh] h-[100%] mt-[1.4vh] ml-[2vw] ">
                <h1>Digi-Sorien E7</h1>
              </div>
            </div>
            {/* Titles */}
            <div className="flex flex-col w-[100%] items-center ">
              <div className="w-[90%]">
                <h2 className="opacity-100  text-[white] flex items-center justify-center text-[3vh] mt-[2vh]">
                  Online Shop Electronic Products
                </h2>
              </div>
              <div className="w-[90%]">
                <h3 className="opacity-100  text-[white] flex items-center justify-center text-[2vh] mt-[2vh]">
                  SmartPhones
                </h3>
                <h3 className="opacity-100  text-[white] flex items-center justify-center text-[2vh] mt-[2vh]">
                  LapTops
                </h3>
                <h3 className="opacity-100  text-[white] flex items-center justify-center text-[2vh] mt-[2vh]">
                  Accessories
                </h3>
                <h3 className="opacity-100  text-[white] flex items-center justify-center text-[2vh] mt-[2vh]">
                  Gaming
                </h3>
                <h3 className="opacity-100  text-[white] flex items-center justify-center text-[2vh] mt-[2vh]">
                  Gaming
                </h3>
                {/* <h3 className="opacity-100  text-[white] flex items-center justify-center text-[2vh] mt-[25vh]">
                Just Visit Shop !
              </h3> */}
              </div>
            </div>
          </div>
        </div>

        {/* SecondLoad */}
        <div className="bg-yellow-500 bg-opacity-0 w-[100%] h-max flex flex-col items-center">
          <HomeBanners />
        </div>
        {/* Logos */}
        <div
          className="bg-white bg-opacity-5 w-[100%] h-[30vh]
             grid grid-cols-3 md:flex md:flex-row md:items-center md:justify-around md:h-[8vh] "
        >
          <div className="flex items-center justify-center">
            <img src="images/apple.png" alt="apple" className="w-[5vh]" />
          </div>
          <div className="flex items-center justify-center">
            <img src="images/samsung.png" alt="samsung" className="w-[8.5vh]" />
          </div>
          <div className="flex items-center justify-center">
            <img src="images/asus.png" alt="asus" className="w-[8vh]" />
          </div>
          <div className="flex items-center justify-center">
            <img src="images/xiaomi.png" alt="xiaomi" className="w-[6vh]" />
          </div>
          <div className="flex items-center justify-center">
            <img
              src="images/playstation.png"
              alt="playstation"
              className="w-[5vh]"
            />
          </div>
          <div className="flex items-center justify-center">
            <img src="images/hp.png" alt="hp" className="w-[4.5vh]" />
          </div>
          <div className="flex items-center justify-center">
            <img src="images/msi.png" alt="msi" className="w-[8vh]" />
          </div>
          <div className="flex items-center justify-center">
            <img src="images/lenovo.png" alt="lenovo" className="w-[9vh]" />
          </div>
          <div className="flex items-center justify-center">
            {/* <img src="images/lenovo.png" alt="Image 7" className="w-[8vh]" /> */}
            <div className="text-[white] font-[Inter] font-bold">Microsoft</div>
          </div>
        </div>
        <div className="bg-white bg-opacity-5 h-[20vh] mt-[10vh]"></div>
        <div className="bg-white bg-opacity-5 h-[20vh] mt-[10vh]"></div>
        <div className="bg-white bg-opacity-5 h-[20vh] mt-[10vh]"></div>
        <div className="bg-white bg-opacity-5 h-[20vh] mt-[10vh]"></div>
        <div className="bg-white bg-opacity-5 h-[20vh] mt-[10vh]"></div>
        <div className="bg-white bg-opacity-5 h-[20vh] mt-[10vh]"></div>
      </div>
    </div>
  );
}
