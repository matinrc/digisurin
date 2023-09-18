"use client";
import Link from "next/link";
import Providers from "../app/providers";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PiBasketDuotone } from "react-icons/pi";
import { MdMenu, MdOutlineLanguage } from "react-icons/md";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import "./Navbar.css";

export default function Navbar({ state, session }) {
  const router = useRouter();
  const [nowState, setnowState] = useState(state);
  const [menuMobie, setmenuMobie] = useState(false);
  const [DesktopToggle, setDesktopToggle] = useState(false);
  const [firstItemsHover, setfirstItemsHover] = useState();
  const [firstItemsSelect, setfirstItemsSelect] = useState();
  const [categories, setcategories] = useState([]);
  const [products, setproducts] = useState([]);
  //---search desktop

  //---categories
  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await fetch("/api/categories");
        const jsondata = await response.json();
        // console.log(jsondata[0]);
        setcategories(jsondata.data);
        setfirstItemsHover(jsondata.data[0]);
      } catch (error) {
        console.log("Error Fetch Data:" + error);
      }
    };
    FetchData();
  }, []);
  //---Products
  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await fetch("/api/products");
        const jsondata = await response.json();
        console.log(jsondata);
        setproducts(jsondata.data);
        // let thispro = jsondata.filter((item) => {
        //   return item.prid === parseInt(prid);
        // });
        // setthispr(thispro);
      } catch (error) {
        console.log("Error Fetch Data:" + error);
      }
    };
    FetchData();
  }, []);

  function GnrLan() {
    return (
      <div className="w-[100%] h-[100%] flex flex-row items-center justify-center ">
        <MdOutlineLanguage size="3vh" className="text-[white] opacity-30" />
        <div className="text-[white] ml-[2vw] md:ml-[0.5vw]">En</div>
      </div>
    );
  }
  function GnrSearchDesktop() {
    const [inputvalue, setinputvalue] = useState("");
    const [opendropdown, setopendropdown] = useState(false);
    const [foundeditems, setfoundeditems] = useState([]);
    const timeoutIdRef = useRef(null);

    function Handlechange(event) {
      clearTimeout(timeoutIdRef.current);

      setinputvalue(event.target.value);
      console.log(inputvalue);
      const value = event.target.value;
      if (value.length > 3) {
        // Delay execution of foundingMatches by 2 seconds
        timeoutIdRef.current = setTimeout(foundingMatches, 2000);
      }
      if (value.length <= 3) {
        setopendropdown(false);
      }

      function foundingMatches() {
        setopendropdown(true);
        const lowerCaseInput = value.toLowerCase();
        let searchingname = lowerCaseInput.split(" ");
        console.log(searchingname);
        let filteredProducts = [...products];
        for (let index = 0; index < searchingname.length; index++) {
          filteredProducts = filteredProducts.filter((pr) => {
            return (
              pr.prname.toLowerCase().includes(searchingname[index]) ||
              pr.prnamee.toLowerCase().includes(searchingname[index])
            );
          });
        }
        console.log(filteredProducts);
        setfoundeditems(filteredProducts);
      }
    }
    function HandleFocus() {
      if (inputvalue.length > 3 && opendropdown === false) {
        setopendropdown(true);
      }
    }
    // function handleKeyDown(e) {
    //   if (inputvalue.length > 3 && e.key === "Enter") {
    //     console.log("open search page");
    //   }
    //   if (inputvalue.length <= 3 && e.key === "Enter") {
    //     console.log("insert at least 4 character");
    //   }
    // }

    return (
      <>
        <div className="bg-white bg-opacity-5 w-[100%] h-[100%] rounded-[5vw] flex flex-row items-center">
          <AiOutlineSearch size={"2vh"} className="opacity-40 ml-[0.4vw]" />
          <input
            className="w-[90%] bg-transparent focus:outline-none flex items-center justify-center text-center font-[Iransans] text-xs"
            type="text"
            onChange={Handlechange}
            onFocus={HandleFocus}
            placeholder="نام محصول وارد کنید"
            // onKeyDown={handleKeyDown}
          />
        </div>
        <div className="w-[0px] h-[0px] overflow-visible z-[99999]">
          {opendropdown ? (
            <div className="w-[30vw] pt-1 min-h-[15vh] ml-[-30vw] mt-[5vh] rounded-md flex flex-col backblurfilter items-center ">
              {foundeditems.slice(0, 10).map((item, index) => {
                const price = item.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return (
                  <Link
                    href={{
                      pathname: `/manage/product/${item.prid}`,
                      query: {
                        prname: `${item.prname}`,
                        prnamee: `${item.prnamee}`,
                      },
                    }}
                    className="bg-newblue bg-opacity-100 w-[95%] h-[5vh] rounded-sm mt-[2%] flex flex-row justify-between"
                    key={`searchedpr${index}`}
                  >
                    <div className="w-[25%] flex justify-start items-center ml-2 font-[Iransans] text-sm">
                      {price} T
                    </div>

                    {/* <div className="w-[40%]  flex justify-start items-center">
                      {item.prnamee}
                    </div> */}
                    <div className="w-[75%] flex justify-end items-center whitespace-nowrap overflow-hidden truncate mr-2 font-[Iransans] text-sm">
                      {item.prname}
                    </div>
                  </Link>
                );
              })}
              {foundeditems.length !== 0 ? (
                <div className="w-[100%] h-[10vh] bg-white bg-opacity-0 flex flex-row justify-center items-center mt-2">
                  <Link
                    href={{
                      pathname: `/manage/searchresult/`,
                      query: {
                        searchedvalue: inputvalue,
                      },
                    }}
                    className="w-max h-[5vh] bg-orange2 py-1 px-3 rounded-md mr-1 font-[Iransans] text-xs flex items-center justify-center"
                  >
                    نتایج بیشتر
                  </Link>
                  <button
                    onClick={() => {
                      setopendropdown(false);
                    }}
                    className="w-max h-[5vh] bg-white bg-opacity-10 py-1 px-3 rounded-md font-[Iransans] text-xs flex items-center justify-center"
                  >
                    بستن
                  </button>
                </div>
              ) : (
                <>
                  <div className="font-[Iransans] text-xs mt-[4vh]">
                    نتیجه ای یافت نشد{" "}
                  </div>
                  <button
                    onClick={() => {
                      setopendropdown(false);
                    }}
                    className="w-max h-[5vh] m-5 bg-white bg-opacity-10 py-1 px-3 rounded-md font-[Iransans] text-xs flex items-center justify-center"
                  >
                    بستن
                  </button>
                </>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
  function GnrSearchMobile() {
    const [inputvalue, setinputvalue] = useState("");

    function Handlechange1(event) {
      setinputvalue(event.target.value);
    }
    function handleKeyDown(event) {
      if (event.key === "Enter" && inputvalue.length >= 3) {
        const url = `/manage/searchresult/?searchedvalue=${encodeURIComponent(
          inputvalue
        )}`;
        window.location.href = url;
      }
    }

    return (
      <>
        <div className="bg-white bg-opacity-5 w-[100%] h-[100%] rounded-full flex flex-row items-center">
          <AiOutlineSearch
            size={"3vh"}
            className="opacity-100 ml-1 text-[white]"
          />
          <input
            className="w-[90%] bg-transparent focus:outline-none flex items-center justify-center text-center font-[Iransans] text-xs text-[white]"
            type="text"
            onChange={Handlechange1}
            onKeyDown={handleKeyDown}
            placeholder="نام محصول  را وارد کنید"
          />
        </div>
      </>
    );
  }
  function GnrUserauth() {
    if (session?.user.name) {
      return <div>{session.user.name}</div>;
    } else {
      return <div>Login/Signin</div>;
    }
  }
  if (nowState === "home") {
    return (
      <div className="bg-[#101010] flex flex-col items-center justify-center z-[20]  w-[100vw] h-[7vh] shadow-md">
        <div className="w-[100%] h-[75%]  flex flex-row bg-orange-600 bg-opacity-0 justify-between items-center">
          <div
            className="bg-green-200 bg-opacity-0
            ml-[5vw]
            flex flex-row items-center justify-around
            font-[Inter]
            text-[white]
            md:ml-[3vw]
            "
          >
            <div className="select-none">Home</div>

            <div
              className="ml-[7vw] md:ml-[3vw] opacity-40 cursor-pointer transition duration-300 ease-in-out hover:opacity-100 "
              onClick={() => {
                router.push(`/shop`);
              }}
            >
              Shop
            </div>
          </div>
          <div className="bg-green-200 bg-opacity-0 h-[100%] w-[20vw] mr-[5vw] md:w-[8vw] md:mr-[2vw] flex flex-row items-center justify-around">
            <GnrLan />
          </div>
        </div>
        <div className="w-[95%] h-[2px] bg-white"></div>
      </div>
    );
  }
  if (nowState === "shop") {
    return (
      <div className="w-[100vw] flex flex-col items-center justify-center z-[10] overflow-hidden bg-green-400 bg-opacity-5">
        <div className="w-[100%] h-[7vh] flex flex-row bg-orange-600 bg-opacity-0 justify-between">
          {/* Mobile */}
          <div className="bg-red-200 bg-opacity-5 md:hidden font-[Inter] text-[white] flex items-center justify-center w-[30%] text-2xl">
            DigiSorien
          </div>
          <div className="md:hidden w-[40%] flex items-center justify-center bg-red-300 bg-opacity-5 ">
            <img src="../digisorien.png" className="w-[4vh]" />
          </div>
          <div className=" md:hidden w-[30%] flex items-center justify-end bg-red-500 bg-opacity-5 ">
            <div
              className="w-max h-[100%] bg-yellow-500 flex items-center justify-center mr-[5vw] bg-opacity-0 text-[white]"
              onClick={() => {
                setmenuMobie(true);
              }}
            >
              <MdMenu size={"4vh"} />
            </div>
          </div>
          {/* Menu */}
          <div
            className={`backMenuMobile ${menuMobie === true ? "show" : "hide"}`}
          >
            <div className="h-[7.2vh] bg-red-200 bg-opacity-0 flex flex-col items-center">
              <div className="h-[100%] w-[100%] flex items-center justify-between">
                <div className="bg-red-200 bg-opacity-5 h-[100%] w-[30vw] flex items-center justify-center text-[white]">
                  Signin/Login
                </div>
                <div
                  className="bg-red-200 bg-opacity-5 h-[100%] w-[15vw] flex items-center justify-center text-[white]"
                  onClick={() => {
                    setmenuMobie(false);
                  }}
                >
                  <AiOutlineClose size={"2.5vh"} />
                </div>
              </div>
              <div className="w-[95%] h-[2px] bg-white"></div>
            </div>
          </div>
          {/* Desktop */}
          <div className="bg-red-200 hidden md:block">DigiSorienDesktop</div>
          <div className="hidden md:block">LogoDesktop</div>
          <div className="hidden md:block">Signin/Login</div>
        </div>
        <div className="w-[95%] h-[2px] bg-white"></div>
      </div>
    );
  }
  if (nowState === "manage") {
    console.log(session);
    function HandleChangeURL(cat) {
      router.push(`manage/categories/${cat.catid}`);
    }
    function GnrFirstItemsMenu() {
      let thisitems = categories.filter((item) => {
        return item.catid === item.catfk;
      });
      thisitems = thisitems.map((card, index) => {
        const handleMouseEnter = () => {
          setfirstItemsHover(card);
          setfirstItemsSelect(card.catid);
        };
        if (firstItemsSelect === card.catid) {
          return (
            <Link
              key={`item0Cats${index}`}
              // href={`/manage/categories/${card.catid}`}
              href={{
                pathname: `/manage/categories/${card.catid}`,
                query: {
                  catname: `${card.catname}`,
                  catnamee: `${card.catnamee}`,
                  catid: `${card.catid}`,
                  catfk: `${card.catfk}`,
                },
              }}
              className="w-[80%]"
            >
              <div
                className={`items0CatSel`}
                // onMouseLeave={handleMouseLeave}
              >
                {card.catname}
              </div>
            </Link>
          );
        } else {
          return (
            <div key={`item0Cats${index}`} className="w-[80%]">
              <div
                className={`items0Cat ${
                  firstItemsHover.catname === card.catname ? "hoverShow" : ""
                }`}
                onMouseEnter={handleMouseEnter}
                onClick={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
              >
                {card.catname}
              </div>
            </div>
          );
        }
        // const handleMouseLeave = () => {
        //   setIsHovered(false);
        // };
      });
      return <>{thisitems}</>;
    }
    function GnrContent() {
      let thisitems = categories.filter((item) => {
        return (
          item.catfk === firstItemsHover.catid && item.catid !== item.catfk
        );
      });
      thisitems.sort((a, b) => a.ordersort - b.ordersort);
      let render = thisitems.map((item, index1) => {
        let GetSubs = categories.filter((cat) => {
          return cat.catfk === item.catid;
        });
        return (
          <div
            key={`MainItem${index1}`}
            className="bg-orange-300 bg-opacity-0 w-[15vw] flex flex-col m-[0.1vw] mb-[1vh] "
          >
            <div
              className="text-[white] font-[Iransans] h-[4vh] w-[100%] bg-orange-400 bg-opacity-0 flex items-center justify-end cursor-pointer"
              key={item.catid}
              // onClick={() => {
              //   HandleChangeURL(item);
              // }}
            >
              <Link
                href={{
                  pathname: `/manage/categories/${item.catid}`,
                  query: {
                    catname: `${item.catname}`,
                    catnamee: `${item.catnamee}`,
                    catid: `${item.catid}`,
                    catfk: `${item.catfk}`,
                  },
                }}
              >
                {item.catname}
              </Link>
            </div>

            {GetSubs.length !== 0 ? (
              GetSubs.map((sub, index) => (
                <div
                  className="text-[white] opacity-25 flex bg-yellow-400 bg-opacity-0  w-[100%] justify-end font-[Iransans] ml-[-0.5vw]"
                  key={`Sub${item.catid}`}

                  // onClick={() => {
                  //   HandleChangeURL(sub);
                  // }}
                >
                  <Link
                    href={{
                      pathname: `/manage/categories/${sub.catid}`,
                      query: {
                        catname: `${sub.catname}`,
                        catnamee: `${sub.catnamee}`,
                        catid: `${sub.catid}`,
                        catfk: `${sub.catfk}`,
                      },
                    }}
                  >
                    {sub.catname}
                  </Link>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        );
      });
      return (
        // <div className="inline-flex flex-col flex-wrap-reverse h-[100%] items-start">
        <div className=" h-[100%] w-[100%] flex flex-col flex-wrap-reverse bg-green-400 bg-opacity-0 p-[1vw]">
          {render}
        </div>
      );
    }
    function GnrCategoriesMobile() {
      const [selectedcat, setselectedcat] = useState("first");

      function GnrThisCat({ thiscat }) {
        //---check its last or there is sub
        const [mode, setmode] = useState("close");

        const subs = categories.filter((item) => {
          return item.catfk === thiscat.catid && item.catid !== item.catfk;
        });
        console.log(subs);

        return (
          <>
            <div
              className={
                subs.length !== 0
                  ? `backGpNavigationMobile ${
                      mode === "open" ? "openPanel" : ""
                    }`
                  : ``
              }
            >
              <div className="w-[100%] h-[5vh] bg-green-500 bg-opacity-0 flex items-center justify-center text-xs">
                {subs.length !== 0 && (
                  <button
                    onClick={() => {
                      if (mode === "close") {
                        setmode("open");
                      } else {
                        setmode("close");
                      }
                    }}
                    className="bg-newblue bg-opacity-100 w-[100%] h-[100%] rounded-md flex items-center justify-end hover:bg-opacity-40"
                  >
                    <div className="mr-[5%]">{thiscat.catname}</div>
                    <BiSolidDownArrow
                      className={`arrowCategorieDesktop ${
                        mode === "open" ? "Rot" : ""
                      } mr-[5%]`}
                    />
                  </button>
                )}
                {subs.length === 0 && (
                  <Link
                    href={{
                      pathname: `/manage/categories/${thiscat.catid}`,
                      query: {
                        catname: `${thiscat.catname}`,
                        catnamee: `${thiscat.catnamee}`,
                        catid: `${thiscat.catid}`,
                        catfk: `${thiscat.catfk}`,
                      },
                    }}
                    className="w-[100%] h-[100%] flex items-center justify-end font-[Iransans] text-[white]"
                  >
                    <div className="mr-[5%]">{thiscat.catname}</div>
                    <div className="w-[5%] h-[2px] bg-white bg-opacity-10 mr-[5%]"></div>
                  </Link>
                )}
              </div>
              {mode === "open" &&
                subs.map((sub, index) => {
                  return <GnrThisCat key={`catmobile${index}`} thiscat={sub} />;
                })}
            </div>
          </>
        );
      }

      if (selectedcat === "first") {
        const thiscats = categories.filter((item) => {
          return item.catid === item.catfk;
        });
        return (
          <>
            {thiscats.map((item, index) => {
              return <GnrThisCat key={`catmobile${index}`} thiscat={item} />;
            })}
          </>
        );
      }
    }

    return (
      <Providers>
        <div className="w-[100vw] flex flex-col items-center justify-center z-[10] overflow-visible lg:bg-newblack pb-1">
          <div className="w-[100%] h-[7vh] lg:h-[5vh] flex flex-row bg-orange-600 bg-opacity-0 justify-between">
            {/* Mobile */}
            <div className="bg-red-200 bg-opacity-0 lg:hidden font-[Inter] text-orange2 flex items-center justify-center w-[30%] text-sm">
              DigiSurin
            </div>
            <div className="lg:hidden w-[40%] flex items-center justify-center bg-red-300 bg-opacity-0 ">
              <img src="/logoorange2.svg" className="w-[4vh] " />
            </div>
            <div className=" lg:hidden w-[30%] flex items-center justify-end bg-red-500 bg-opacity-0 ">
              <div
                className="w-max h-[100%] bg-yellow-500 flex items-center justify-center mr-[5vw] bg-opacity-0 text-[white]"
                onClick={() => {
                  setmenuMobie(true);
                }}
              >
                <MdMenu className="text-orange2" size={"4vh"} />
              </div>
            </div>
            {/* Menu */}
            <div className="lg:hidden w-0 h-0 bg-orange-400 overflow-visible">
              <div
                className={`backMenuMobile ${
                  menuMobie === true ? "show" : "hide"
                } lg:hidden`}
              >
                <div className="h-[7.2vh] bg-red-200 bg-opacity-0 flex flex-col items-center">
                  <div className="h-[100%] w-[100%] flex items-center justify-between">
                    <div className="bg-red-200 bg-opacity-0 h-[100%] w-[30vw] flex items-center justify-center text-[white]">
                      <GnrUserauth />
                    </div>
                    <div
                      className="bg-red-200 bg-opacity-0 h-[100%] w-[15vw] flex items-center justify-center text-[white]"
                      onClick={() => {
                        setmenuMobie(false);
                      }}
                    >
                      <AiOutlineClose size={"2.5vh"} />
                    </div>
                  </div>
                  <div className="w-[95%] h-[2px] bg-white"></div>
                </div>
                <div className="w-[100%] h-[5vh] mt-2 bg-white bg-opacity-0 flex items-center justify-center py-1 px-2">
                  <GnrSearchMobile />
                </div>

                <div className="w-[100%] h-[85vh] bg-orange-400 bg-opacity-0 overflow-scroll p-[5%] rounded-md">
                  <GnrCategoriesMobile />
                </div>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:block h-[100%] w-max ml-10  items-center justify-center ">
              <div className="text-orange2 w-[100$] h-[100%] flex items-center justify-center">
                {session.user.name}
              </div>
            </div>

            <div className="hidden lg:block h-[100%] w-[5%] lg:mr-[-30vw] xl:mr-[-20vw]">
              <div className="bg-white bg-opacity-0 h-[100%] w-[100%] flex items-center justify-center text-[white] ">
                <img src="/logoorange2.svg" className="w-[30%]" />
              </div>
            </div>
            <div className="hidden lg:block h-[100%] lg:w-[30%] xl:w-[25%] mr-[2.5vw] bg-white bg-opacity-0">
              <div className="bg-red-200 bg-opacity-0 text-[white] flex flex-row items-center justify-between h-[100%]">
                {/* Search */}
                <div className="bg-white bg-opacity-0 h-[3.5vh] lg:w-[60%] xl:w-[65%] flex justify-center items-center">
                  {products.length !== 0 && categories.length !== 0 ? (
                    <GnrSearchDesktop />
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className="bg-white bg-opacity-0 h-[100%] xl:w-[20%] lg:w-[30%]  flex justify-around items-center font-[Iransans] select-none cursor-pointer md:text-sm"
                  onClick={() => {
                    setDesktopToggle(!DesktopToggle);
                  }}
                >
                  <div className="text-xs whitespace-nowrap"> دسته بندی ها</div>
                  <div
                    className={`arrowCategorieDesktop ${
                      DesktopToggle === true ? "Rot" : ""
                    }`}
                  >
                    <BiSolidDownArrow />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[95%] h-[2px] bg-orange2"></div>
          {/* Categories */}

          <div className="bg-orange-400  w-[100%] h-[0vh] overflow-visible  flex justify-end ">
            <div
              className={`desktopCat ${
                DesktopToggle === true ? "oppening" : "closing"
              }`}
            >
              <div className="h-[100%] w-[12vw] bg-white bg-opacity-5 flex items-center justify-around flex-col">
                {categories.length !== 0 ? <GnrFirstItemsMenu /> : <>No</>}
              </div>
              <div className="h-[95%] w-[0.12vw] bg-white"></div>
              <div className="bg-white bg-opacity-0 w-[65vw]  h-[100%] flex items-center justify-end">
                <GnrContent />
              </div>
            </div>
          </div>
        </div>
      </Providers>
    );
  }
}
