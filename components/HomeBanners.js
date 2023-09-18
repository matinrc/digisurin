"use client";

import { useState, useEffect } from "react";
import "./HomeBanners.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
export default function HomeBanners() {
  const [poss, setposs] = useState({ counter: 0 });
  const [imagelink, setimagelink] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  //---download images
  useEffect(() => {
    const FetchImageCover = async (indexof) => {
      try {
        const data = {
          pic1: `homecover/cover${indexof}.jpg`,
        };
        const response = await fetch("api/awsimage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const res = await response.json();
          console.log(res);
          if (res.messsage !== "OK") {
            // setimagelink(data);
            return res.data;
          }
        }
      } catch (error) {
        console.log("Error Fetch Data:" + error);
      }
    };
    let Covers = [];
    async function myFunction() {
      for (let index = 0; index < 5; index++) {
        try {
          const response = await FetchImageCover(index + 1);
          console.log(response);
          // console.log(response); // Access the resolved value of the promise here
          Covers[index] = response;
        } catch (error) {
          console.log("Error Fetch Data: " + error);
          Covers[index] = error;
        }
      }
      console.log(Covers);
      setimagelink(Covers);
    }

    myFunction();
  }, []);
  //---Loading
  useEffect(() => {
    if (imagelink.length !== 0) {
      setTimeout(() => {
        setisLoading(false);
      }, 4000);
    }
  }, [imagelink]);
  //--sliding automatic
  useEffect(() => {
    if (isLoading === false) {
      const interval = setInterval(() => {
        setposs((prevPoss) => {
          if (prevPoss.counter === 4) {
            return { ...prevPoss, counter: 0 };
          } else {
            return { ...prevPoss, counter: prevPoss.counter + 1 };
          }
        });
      }, 10000); // 10 seconds

      return () => {
        clearInterval(interval);
      };
    }
  }, [isLoading]);

  const marginvalues = ["0vw", "-100vw", "-200vw", "-300vw", "-400vw"];

  const content = [
    {
      Title: "Samsung Galaxy Note 21",
      Discription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      Title: "Newset Apple AR/VR Technology",
      Discription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      Title: "Identify more colors !",
      Discription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      Title: "Microsoft Surface , Lighter than ever !",
      Discription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      Title: "Ipad Pro New Generation !",
      Discription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  function HandleChangeposs(where) {
    let newcounter = { ...poss };

    if (where === "right") {
      // newposs = defaltes;
      if (newcounter.counter < 4) {
        newcounter.counter = newcounter.counter + 1;
      } else {
        newcounter.counter = 0;
      }
      setposs(newcounter);
    }
    if (where === "left") {
      // newposs = defaltes;
      if (newcounter.counter > 0) {
        newcounter.counter = newcounter.counter - 1;
      } else {
        newcounter.counter = 4;
      }
      setposs(newcounter);
    }
    // console.log(newcounter);
    // console.log(defaltes[poss].mar);
  }

  return (
    <>
      <div className="w-[100%] 2xl:w-[60%]  h-max   bg-orange-500 bg-opacity-0 overflow-hidden">
        {isLoading === false && (
          <>
            {/* Images */}

            <div
              className={`sildeClass  h-[64vh] md:h-[65vh]
              ${poss.counter === 0 ? "" : ""}
              ${poss.counter === 1 ? "slide1" : ""}
              ${poss.counter === 2 ? "slide2" : ""}
              ${poss.counter === 3 ? "slide3" : ""}
              ${poss.counter === 4 ? "slide4" : ""}
              `}
            >
              {imagelink.map((item, index) => {
                return (
                  <div
                    key={`indexBanner${index}`}
                    className="min-w-[100%] h-[100%] flex items-center justify-center"
                  >
                    <div className="w-[100%] h-[100%]">
                      <img src={item} className="imageCover showimage" />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Titles */}
            <div className="backTitle h-[30vh] md:h-[20vh]">
              <div
                className="w-[10%] h-[20%] bg-orange-500 bg-opacity-0 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  HandleChangeposs("left");
                }}
              >
                <MdOutlineArrowLeft
                  size="3vh"
                  className="text-[white] opacity-30"
                />
              </div>
              <div className="w-[80%] h-[100%]  flex flex-col mt-[4vh] items-center">
                <div className="h-max w-[110%] text-[white] text-[3vh] bg-red-400 bg-opacity-0 font-bold">
                  {content[poss.counter].Title}
                </div>
                <div className="h-[80%] w-[100%] mt-[1vh] text-[white] pl-[4vw]">
                  {content[poss.counter].Discription}
                </div>
              </div>
              <div
                className="w-[10%] h-[20%] bg-orange-500 bg-opacity-0 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  HandleChangeposs("right");
                }}
              >
                <MdOutlineArrowRight
                  size="3vh"
                  className="text-[white] opacity-30 "
                />
              </div>
            </div>
          </>
        )}
        {isLoading === true && (
          <div className="bg-red-500 bg-opacity-0 w-[100%] h-[95vh] md:h-[85vh] flex items-center justify-center">
            <div className="bg-red-500 bg-opacity-0 mt-[80vh] w-[2vh] h-[2vh] m-[0.4]">
              <div className="Loading"></div>
            </div>
            <div className="bg-red-500 bg-opacity-0 mt-[80vh] w-[2vh] h-[2vh] m-[0.4]">
              <div className="Loading1"></div>
            </div>
            <div className="bg-red-500 bg-opacity-0 mt-[80vh] w-[2vh] h-[2vh] m-[0.4]">
              <div className="Loading2"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
