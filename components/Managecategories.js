"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./Managecategories.css";
import Radio from "@mui/material/Radio";
import { BiSolidDownArrow } from "react-icons/bi";

export default function Managecategories({ params }) {
  const [categories, setcategories] = useState([]);
  const [products, setproducts] = useState([]);
  //----sortmode
  const [sortMode, setSortMode] = useState({
    mode: "countstorage",
    switch: "more",
  });
  const [selectedBrand, setselectedBrand] = useState("");
  //---pagechanger
  const [pageinfo, setpageinfo] = useState({ nowpage: 1, eachpagecontent: 10 });
  //---categories
  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await fetch("/api/categories");
        const jsondata = await response.json();
        // console.log(jsondata);
        setcategories(jsondata.data);
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
      } catch (error) {
        console.log("Error Fetch Data:" + error);
      }
    };
    FetchData();
  }, []);
  // console.log("params");
  // console.log(params);

  //--THere is SubCategories or Show Brands
  //--Navigator
  function CalculateSubOrBrand() {
    if (categories.length !== 0) {
      //---get this
      console.log(params.catid);

      let thisItem = categories.filter((item) => {
        return item.catid === parseInt(params.catid);
      });
      // console.log(thisItem);
      let condition = true;
      let lastItems = [];
      lastItems[0] = thisItem[0];
      while (condition) {
        //--there is before or not
        let lastitem = categories.filter((item) => {
          return (
            item.catid === lastItems[lastItems.length - 1].catfk &&
            lastItems[lastItems.length - 1].catname !== item.catname
          );
        });

        if (lastitem.length !== 0) {
          lastItems[lastItems.length] = lastitem[0];
        } else {
          condition = false;
        }
      }
      //--Array of History categpries
      console.log(lastItems);

      let lastItemsRender = lastItems.map((item, index) => {
        if (index === 0) {
          return (
            <Link
              // href={`/manage/categories/${item.catid}`}
              href={{
                pathname: `/manage/categories/${item.catid}`,
                query: {
                  catname: `${item.catname}`,
                  catnamee: `${item.catnamee}`,
                  catid: `${item.catid}`,
                  catfk: `${item.catfk}`,
                },
              }}
              key={`Navigator${index}`}
            >
              <div className="h-[100%] flex items-center justify-center bg-white bg-opacity-0 mr-[0.5vw] select-none cursor-pointer text-newblack">
                {item.catname}
              </div>
            </Link>
          );
        } else {
          return (
            <Link
              // href={`/manage/categories/${item.catid}`}
              href={{
                pathname: `/manage/categories/${item.catid}`,
                query: {
                  catname: `${item.catname}`,
                  catnamee: `${item.catnamee}`,
                  catid: `${item.catid}`,
                  catfk: `${item.catfk}`,
                },
              }}
              key={`Navigator${index}`}
            >
              <div className=" h-[100%] flex items-center justify-center bg-white bg-opacity-0 mr-[0.5vw]  select-none cursor-pointer hover:opacity-100 transition-opacity duration-300 text-newblack opacity-30">
                /{item.catname}
              </div>
            </Link>
          );
        }
      });

      return (
        <div className="bg-orange-200 bg-opacity-0 flex flex-row items-center text-[white] font-[Iransans] justify-between mr-[3vw] text-sm">
          {lastItemsRender}
        </div>
      );
    }
  }
  function BrandOrSubs() {
    if (categories.length !== 0) {
      let thisItem = categories.filter((item) => {
        return item.catid === parseInt(params.catid);
      });
      //---is it last item in tree or not
      const after = categories.filter((item) => {
        return (
          item.catfk === thisItem[0].catid &&
          item.catid !== parseInt(params.catid)
        );
      });
      let content;
      //---sub categories
      if (after.length !== 0) {
        // console.log(after);
        content = after.map((item, index) => {
          return (
            <Link
              // href={`/manage/categories/${item.catid}`}
              href={{
                pathname: `/manage/categories/${item.catid}`,
                query: {
                  catname: `${item.catname}`,
                  catnamee: `${item.catnamee}`,
                  catid: `${item.catid}`,
                  catfk: `${item.catfk}`,
                },
              }}
              // className="h-[16vh] sm:h-[20vh] md:h-[18vh] min-w-[12vh]  md:min-w-[15vh] bg-white bg-opacity-0 m-[0.4vw] "
              className="h-[100%] min-w-[15vh] mr-2 customegrad rounded-md"
              key={`Sub${index}`}
            >
              <div className="BackCard1 rounded-md">
                <div className="bg-orange-400 bg-opacity-0 w-[100%] h-[80%] p-[1vh]">
                  <div className="imageCard"></div>
                </div>
                <div className="w-[100%] h-[16%] bg-orange-400 bg-opacity-0">
                  <div className="TitleCard text-xs">{item.catname}</div>
                </div>
              </div>
            </Link>
          );
        });
      } else {
        //---Brands
        if (products.length !== 0) {
          function getUniqueBrands(products) {
            const uniqueBrands = new Set();

            for (const product of products) {
              if (product.brand) {
                uniqueBrands.add(product.brand);
              }
            }

            return Array.from(uniqueBrands);
          }
          function getProductsByCatIds(products, ids) {
            const catIds = ids.map((obj) => obj.catid);
            console.log(catIds);
            return products.filter((product) => catIds.includes(product.catid));
          }
          const product = getProductsByCatIds(products, thisItem);
          let brands = getUniqueBrands(product);
          console.log(brands);
          content = brands.map((brand, index) => {
            return (
              <div
                key={`Brand${index}`}
                className="h-[100%] min-w-[15vh] mr-2 customegrad rounded-md"
                onClick={
                  selectedBrand === brand
                    ? () => {
                        setselectedBrand("");
                      }
                    : () => {
                        console.log(brand);
                        console.log(selectedBrand);
                        setselectedBrand(brand);
                      }
                }
              >
                <div
                  className={` rounded-md ${
                    selectedBrand === brand
                      ? "BackCard1Sel selCard"
                      : "BackCard1"
                  }`}
                >
                  <div className="bg-orange-400 bg-opacity-0 w-[100%] h-[80%] p-[1vh]">
                    <div className="imageCard"></div>
                  </div>
                  <div className="w-[100%] h-[16%] bg-orange-400 bg-opacity-0">
                    <div
                      className={`TitleCard text-sm ${
                        selectedBrand === brand ? "text-white" : ""
                      }`}
                    >
                      {brand.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            );
          });
        }
      }
      return (
        <>
          <div className="w-[100vw] h-max flex items-center justify-end">
            <div className="bg-newblue mt-[2vh] mr-2 py-1 px-4 text-white text-xs font-[Iransans] rounded-t-md lg:mr-10">{`${
              after.length === 0 ? "برند ها" : "دسته ها"
            }`}</div>
          </div>
          <div className="bg-newgrey w-[100vw] h-[22vh]  insetshadow">
            <div className="w-[100vw] flex flex-row-reverse overflow-scroll h-[100%] pb-5 pt-2">
              {content}
            </div>
          </div>
        </>
      );
    }
  }
  function GnrSortingOptions() {
    const Items = [
      "price",
      // "countshow",
      "countstorage",
      // "sellmonth",
      // "sellweek",
    ];
    const ItemsPersian = [
      "قیمت",

      // "تعداد در شو",
      "تعداد در انبار",
      // "فروش ماهیانه",
      // "فروش هفتگی",
    ];

    let selectedMode = "";

    for (let index = 0; index < Items.length; index++) {
      if (sortMode.mode == Items[index]) {
        selectedMode = Items[index];
      }
    }
    // console.log(selectedMode);

    function HandelChangesortMode(item, value) {
      const newObj = {
        mode: item,
        switch: value,
      };
      setSortMode(newObj);
    }
    return (
      <>
        {Items.map((item, index) => {
          return (
            <div
              // className={
              //   selectedMode == item ? "BackEachGp sel3" : "BackEachGp"
              // }
              className={`w-max h-[3.6vh] flex flex-row items-center
               bg-white bg-opacity-5 m-[2%] rounded-full select-none sm:m-[0.5%] ${
                 selectedMode == item ? "bg-white bg-opacity-50" : ""
               }`}
              key={`Back${item}`}
            >
              <div className="w-[35vw] sm:w-[15vh] md:w-[15vh] h-[100%] bg-orange-400 bg-opacity-0 flex flex-row p-[2%] items-center justify-center ">
                {/* <div className="backSwitch"> */}
                <div className="bg-red-400 bg-opacity-0 w-[50%] h-[100%]">
                  <div
                    className={
                      sortMode.switch == "less" && selectedMode == item
                        ? "option3 sel4 text-xs"
                        : "option3 text-xs"
                    }
                    onClick={() => {
                      HandelChangesortMode(item, "less");
                    }}
                  >
                    کمترین
                  </div>
                </div>
                <div className="bg-red-400 bg-opacity-0 w-[50%] h-[100%]">
                  <div
                    className={
                      sortMode.switch == "more" && selectedMode == item
                        ? "option3 sel4 text-xs"
                        : "option3 text-xs"
                    }
                    onClick={() => {
                      HandelChangesortMode(item, "more");
                    }}
                  >
                    بیشترین
                  </div>
                </div>
              </div>

              <div
                className="w-max h-[100%] flex items-center justify-center font-[Iransans] text-newblack  text-xs"
                onClick={
                  selectedMode == item
                    ? () => {
                        console.log("ok");
                      }
                    : () => {
                        HandelChangesortMode(item, "more");
                      }
                }
              >
                {ItemsPersian[index]}
              </div>
              <Radio
                checked={selectedMode === item}
                onClick={
                  selectedMode == item
                    ? () => {
                        console.log("ok");
                      }
                    : () => {
                        HandelChangesortMode(item, "more");
                      }
                }
              >
                {selectedMode == item && <div className="RadioOn"></div>}
              </Radio>
            </div>
          );
        })}
      </>
    );
  }
  function Products() {
    const GnrOneProductThubm = ({ pr }) => {
      const [imagelink, setimagelink] = useState("");
      useEffect(() => {
        const FetchApi = async () => {
          try {
            const data = {
              pic1: `thumbs/${pr.prid}.png`,
              // pic1: `original/corolla-15.5.png`,
            };

            const response = await fetch("/api/awsimage", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              if (!data.message.startsWith("Error")) {
                setimagelink(data.data);
              }
            } else {
              setimagelink("/images/noimage.svg");
            }
          } catch (error) {
            console.log("Error Fetch Data:" + error);
          }
        };
        FetchApi();
      }, []);

      const price = pr.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return (
        <Link
          href={{
            pathname: `/manage/product/${pr.prid}`,
            query: {
              prname: `${pr.prname}`,
              prnamee: `${pr.prnamee}`,
            },
          }}
          className="w-[100%] h-[30vh] sm:h-[30vh]  bg-white - bg-opacity-0 flex flex-col "
        >
          <div className="BackCard1PR rounded-md">
            <div className="bg-orange-400 bg-opacity-0 w-[100%] h-[55%] p-[1vh]">
              <div className="imageCard">
                {imagelink ? (
                  <img src={imagelink} className="w-[70%]"></img>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="TitlePrCard text-sm h-[10%] bg-orange-400 bg-opacity-0 mb-[1%]  text-[1.5vh] text-newblack flex items-center justify-end">
              {pr.prname}
            </div>
            <div className="TitlePrCard text-md h-[10%] bg-orange-400 bg-opacity-0 mb-[1%] font-bold text-[1.8vh] text-newblack items-center justify-center">
              {pr.brand?.toUpperCase()}
            </div>
            <div className="w-[100%] h-[10%] bg-newblue bg-opacity-5">
              <div className="TitleCard text-sm text-[1.5vh]">
                {pr.prnamee.toUpperCase()}
              </div>
            </div>
            <div className="TitlePrCard text-md h-[10%] bg-orange-400 bg-opacity-0 mt-[5%] text-[1.8vh] items-center justify-center">
              {price} تومان
            </div>
          </div>
        </Link>
      );
    };

    if (categories.length !== 0 && products.length !== 0) {
      //---- hierarchical Find Method
      function findRelatedObjects(objects, key) {
        const relatedObjects = [];
        const visitedCatIds = new Set();

        const findRelated = (objects, currentKey) => {
          for (const obj of objects) {
            if (obj.catfk === currentKey && !visitedCatIds.has(obj.catid)) {
              visitedCatIds.add(obj.catid);
              if (obj.catid !== key) {
                relatedObjects.push(obj);
              }
              findRelated(objects, obj.catid);
            }
          }
        };

        findRelated(objects, key);

        return relatedObjects;
      }
      let SubCategories = findRelatedObjects(
        categories,
        parseInt(params.catid)
      );
      console.log(SubCategories);

      //---it was last cat or there is others in sub
      if (SubCategories.length === 0) {
        let thisItem = categories.filter((item) => {
          return item.catid === parseInt(params.catid);
        });
        SubCategories = thisItem;
      }
      //---filter products of this IDs
      function getProductsByCatIds(products, ids) {
        const catIds = ids.map((obj) => obj.catid);
        console.log(catIds);
        return products.filter((product) => catIds.includes(product.catid));
      }
      let product = getProductsByCatIds(products, SubCategories);

      if (selectedBrand !== "") {
        product = product.filter((item) => {
          return item.brand === selectedBrand;
        });
      }
      if (sortMode.mode == "countstorage") {
        if (sortMode.switch == "more") {
          product = product.sort((a, b) => b.count - a.count);
        } else {
          product = product.sort((a, b) => a.count - b.count);
        }
      }
      if (sortMode.mode == "price") {
        if (sortMode.switch == "more") {
          product = product.sort((a, b) => b.price - a.price);
        } else {
          product = product.sort((a, b) => a.price - b.price);
        }
      }
      //----page counter
      //--get INT part of Divid
      const pagecount =
        Math.floor(product.length / parseInt(pageinfo.eachpagecontent)) + 1;
      console.log(pagecount);
      console.log(parseInt(pageinfo.nowpage));
      console.log(parseInt(pageinfo.nowpage));
      //---create a array of pagecount for .map function
      const arraypagecount = Array.from(
        { length: pagecount },
        (_, index) => index
      );

      product = product.slice(
        (parseInt(pageinfo.nowpage) - 1) * parseInt(pageinfo.eachpagecontent),
        (parseInt(pageinfo.nowpage) - 1) * parseInt(pageinfo.eachpagecontent) +
          parseInt(pageinfo.eachpagecontent)
      );
      console.log(product);

      function GnrPageCounter() {
        if (pagecount !== 0) {
          return (
            <div className="w-[100%] h-[5vh] bg-white bg-opacity-5 flex flex-row justify-center items-center mt-2">
              <div
                onClick={
                  pageinfo.nowpage === pagecount
                    ? () => {}
                    : () => {
                        setpageinfo({
                          ...pageinfo,
                          nowpage: pageinfo.nowpage + 1,
                        });
                      }
                }
              >
                <BiSolidDownArrow
                  className={`text-newblack rotate-90 ${
                    pageinfo.nowpage === pagecount ? "opacity-5" : ""
                  }`}
                />
              </div>
              {pagecount > 4 && (
                <>
                  {pageinfo.nowpage === 1 && (
                    <>
                      <div
                        className="bg-white bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center m-2 select-none"
                        onClick={() => {
                          setpageinfo({
                            ...pageinfo,
                            nowpage: pagecount,
                          });
                        }}
                      >
                        {pagecount}
                      </div>
                      <div>...</div>
                      <div
                        className="bg-white bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center m-2 select-none"
                        onClick={() => {
                          setpageinfo({
                            ...pageinfo,
                            nowpage: pageinfo.nowpage + 2,
                          });
                        }}
                      >
                        {pageinfo.nowpage + 2}
                      </div>
                      <div
                        className="bg-white bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center m-2 select-none"
                        onClick={() => {
                          setpageinfo({
                            ...pageinfo,
                            nowpage: pageinfo.nowpage + 1,
                          });
                        }}
                      >
                        {pageinfo.nowpage + 1}
                      </div>
                      <div className="bg-white bg-opacity-80 rounded-full w-8 h-8 flex items-center justify-center m-2 shadow-md select-none">
                        {pageinfo.nowpage}
                      </div>
                    </>
                  )}
                  {pageinfo.nowpage > 1 &&
                    pageinfo.nowpage + 1 !== pagecount &&
                    pageinfo.nowpage !== pagecount && (
                      <>
                        <div
                          className="bg-white bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center m-2 select-none"
                          onClick={() => {
                            setpageinfo({
                              ...pageinfo,
                              nowpage: pagecount,
                            });
                          }}
                        >
                          {pagecount}
                        </div>
                        <div>...</div>
                        <div
                          className="bg-white bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center m-2 select-none"
                          onClick={() => {
                            setpageinfo({
                              ...pageinfo,
                              nowpage: pageinfo.nowpage + 1,
                            });
                          }}
                        >
                          {pageinfo.nowpage + 1}
                        </div>
                        <div className="bg-white bg-opacity-80 rounded-full w-8 h-8 flex items-center justify-center m-2 shadow-md select-none">
                          {pageinfo.nowpage}
                        </div>
                        <div
                          className="bg-white bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center m-2 select-none"
                          onClick={() => {
                            setpageinfo({
                              ...pageinfo,
                              nowpage: pageinfo.nowpage - 1,
                            });
                          }}
                        >
                          {pageinfo.nowpage - 1}
                        </div>
                      </>
                    )}
                  {pageinfo.nowpage + 1 === pagecount && (
                    <>
                      <div
                        className="bg-white bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center m-2 select-none"
                        onClick={() => {
                          setpageinfo({
                            ...pageinfo,
                            nowpage: pageinfo.nowpage + 1,
                          });
                        }}
                      >
                        {pagecount}
                      </div>
                      <div
                        className="bg-white bg-opacity-80 shadow-md rounded-full w-8 h-8 flex items-center justify-center m-2 select-none"
                        onClick={() => {
                          setpageinfo({
                            ...pageinfo,
                            nowpage: pageinfo.nowpage + 1,
                          });
                        }}
                      >
                        {pageinfo.nowpage}
                      </div>
                      <div
                        className="bg-white bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center m-2  select-none"
                        onClick={() => {
                          setpageinfo({
                            ...pageinfo,
                            nowpage: pageinfo.nowpage - 1,
                          });
                        }}
                      >
                        {pageinfo.nowpage - 1}
                      </div>
                      <div>...</div>

                      <div
                        className="bg-white bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center m-2 select-none"
                        onClick={() => {
                          setpageinfo({
                            ...pageinfo,
                            nowpage: 1,
                          });
                        }}
                      >
                        {1}
                      </div>
                    </>
                  )}
                  {pageinfo.nowpage === pagecount && (
                    <>
                      <div
                        className="bg-white bg-opacity-80 shadow-md rounded-full w-8 h-8 flex items-center justify-center m-2 select-none"
                        onClick={() => {
                          setpageinfo({
                            ...pageinfo,
                            nowpage: pageinfo.nowpage,
                          });
                        }}
                      >
                        {pagecount}
                      </div>
                      <div
                        className="bg-white bg-opacity-30  rounded-full w-8 h-8 flex items-center justify-center m-2 select-none"
                        onClick={() => {
                          setpageinfo({
                            ...pageinfo,
                            nowpage: pageinfo.nowpage - 1,
                          });
                        }}
                      >
                        {pageinfo.nowpage - 1}
                      </div>
                      <div
                        className="bg-white bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center m-2  select-none"
                        onClick={() => {
                          setpageinfo({
                            ...pageinfo,
                            nowpage: pageinfo.nowpage - 2,
                          });
                        }}
                      >
                        {pageinfo.nowpage - 2}
                      </div>
                      <div>...</div>

                      <div
                        className="bg-white bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center m-2 select-none"
                        onClick={() => {
                          setpageinfo({
                            ...pageinfo,
                            nowpage: 1,
                          });
                        }}
                      >
                        {1}
                      </div>
                    </>
                  )}
                </>
              )}
              {pagecount <= 4 && (
                <div className="flex flex-row-reverse">
                  {arraypagecount.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`bg-white rounded-full w-8 h-8 flex items-center justify-center m-2 select-none ${
                          pageinfo.nowpage === item + 1
                            ? "opacity-80"
                            : "opacity-30"
                        }`}
                        onClick={
                          pageinfo.nowpage === item + 1
                            ? () => {}
                            : () => {
                                setpageinfo({
                                  ...pageinfo,
                                  nowpage: item + 1,
                                });
                              }
                        }
                      >
                        {item + 1}
                      </div>
                    );
                  })}
                </div>
              )}
              <div
                onClick={
                  pageinfo.nowpage === 1
                    ? () => {}
                    : () => {
                        setpageinfo({
                          ...pageinfo,
                          nowpage: pageinfo.nowpage - 1,
                        });
                      }
                }
              >
                <BiSolidDownArrow
                  className={`text-newblack -rotate-90 ${
                    pageinfo.nowpage === 1 ? "opacity-5" : ""
                  }`}
                />
              </div>
            </div>
          );
        }
      }
      //------------------------------------------------
      let Render = product.map((pr) => {
        return <GnrOneProductThubm key={`products${pr.prid}`} pr={pr} />;
      });

      //---in last categories?

      let nextItem = categories.filter((item) => {
        return item.catfk === parseInt(params.catid);
      });

      function HandleAddPr() {
        const itemWithMaxId = products.reduce((maxItem, currentItem) => {
          if (currentItem.prid > maxItem.prid) {
            return currentItem;
          } else {
            return maxItem;
          }
        });
        console.log(itemWithMaxId);
        const SendData = async () => {
          const data = {
            prid: parseInt(itemWithMaxId.prid) + 1,
            prname: "محصول جدید",
            prnamee: "undefined",
            brand: "ثبت نشده",
            price: 0,
            count: 0,
            catid: parseInt(params.catid),
          };
          try {
            const response = await fetch("/api/products", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            const jsondata = await response.json();
            console.log(jsondata);
            const url = `/manage/product/${
              data.prid
            }?prname=${encodeURIComponent(
              data.prname
            )}&prnamee=${encodeURIComponent(data.prnamee)}`;
            window.location.href = url;
          } catch (error) {
            console.log("Error Fetch Data:" + error);
          }
        };
        SendData();
      }
      return (
        <>
          <div className="w-[100%] bg-white bg-opacity-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-4">
            {Render}
          </div>
          <GnrPageCounter />
          {nextItem.length === 0 && (
            <div className="w-[100%] h-[5vh] bg-white bg-opacity-0 flex flex-row justify-center items-center mt-2">
              <button
                className="bg-newblue px-4 py-1 rounded-md text-white font-[Iransans]"
                onClick={() => {
                  HandleAddPr();
                }}
              >
                محصول جدید
              </button>
            </div>
          )}
        </>
      );
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-[100%] h-[4vh] bg-white bg-opacity-0 mt-[1.5vh] flex flex-row justify-end">
        <CalculateSubOrBrand />
      </div>

      <BrandOrSubs />

      <div className="bg-orange-400 bg-opacity-0 w-[100vw] flex flex-col mt-[2vh] h-max items-end sm:flex-row sm:justify-end">
        <GnrSortingOptions sortMode={sortMode} setSortMode={setSortMode} />
      </div>
      <div className="w-[90%] h-[3px] bg-white mt-[1vh] bg-opacity-20"></div>
      <div className="w-[100vw] bg-white bg-opacity-5 mt-[2vh] px-4">
        <Products />
      </div>
      {/* {params.catid} */}

      <div className="w-[90%] h-[3px] bg-white bg-opacity-20 mt-2"></div>
    </div>
  );
}
