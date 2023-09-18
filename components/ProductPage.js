"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./ProductPage.css";
// import { makeStyles } from '@material-ui/styles';

export default function ProductPage({ prid }) {
  const [imagelink, setimagelink] = useState("");
  const [categories, setcategories] = useState([]);
  const [products, setproducts] = useState([]);
  const [thispr, setthispr] = useState([]);
  //---image file upload
  const [image, setImage] = useState(null);
  const [loadingUpload, setloadingUpload] = useState(false);
  //---cat picker
  const [catpicker, setcatpicker] = useState(false);

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
        let thispro = jsondata.data.filter((item) => {
          return item.prid === parseInt(prid);
        });
        setthispr(thispro);
      } catch (error) {
        console.log("Error Fetch Data:" + error);
      }
    };
    FetchData();
  }, []);
  //---get image
  const FetchApi = async () => {
    try {
      const data = {
        pic1: `original/${thispr[0].prid}.png`,
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
          setloadingUpload(false);
        }
      } else {
        setimagelink("/images/noimage.svg");
      }
    } catch (error) {
      console.log("Error Fetch Data:" + error);
    }
  };
  useEffect(() => {
    if (thispr.length !== 0) {
      FetchApi();
    }
  }, [thispr]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloadingUpload(true);

    var formdata = new FormData();

    formdata.append("image", image);
    formdata.append("prid", prid);
    try {
      const response = await axios.post("/api/uploadawsimage", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      FetchApi();
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  };
  function GnrInfoOfPr() {
    function InputField({ titpepr, title, value }) {
      const [inputValue, setInputValue] = useState(value);
      const inputRef = useRef(null);

      const handleInputChange = (event) => {
        // if (!isFocus) {
        //   setisFocus(true);
        // }
        setInputValue(event.target.value);
        let str = event.target.value;
        let finallRes;

        if (/^\d+$/.test(str)) {
          finallRes = parseInt(str, 10); // Convert the string to a number
        } else {
          finallRes = str; // Return the string as is
        }
        // thispr[0][title] = finallRes;
      };
      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          const thisprnew = [...thispr];
          thisprnew[0][title] = inputRef.current.value;
          console.log(thisprnew);
          setthispr(thisprnew);
        }
      };
      const handleUnfocus = () => {
        const thisprnew = [...thispr];
        thisprnew[0][title] = inputRef.current.value;
        console.log(thisprnew);
        setthispr(thisprnew);
      };
      return (
        <>
          <TextField
            inputRef={inputRef}
            label={titpepr}
            id={`id${title}`}
            key={`key${title}`}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleUnfocus}
            // variant="outlined"
            variant="standard"
            className="custom-textfield w-[90%]"
          />
        </>
      );
    }
    function CategoriesPick() {
      function GnrContent() {
        const [selected, setselected] = useState("first");
        const [lasthit, setlasthit] = useState();
        function handleClick(clicked) {
          //---check its last cat or there is subs
          let thereissub = categories.filter((item) => {
            return item.catfk === clicked.catid && item.catid !== item.catfk;
          });
          console.log(thereissub);
          if (thereissub.length !== 0) {
            console.log("there is sub");
            console.log(clicked);
            setselected(clicked);
            if (lasthit) {
              setlasthit();
            }
          } else {
            console.log(lasthit);
            setlasthit(clicked);
          }
        }
        function handleSave() {
          const thisprnew = [...thispr];
          thisprnew[0].catid = lasthit.catid;
          console.log(thisprnew);
          setthispr(thisprnew);
          setcatpicker(false);
        }
        function handleback() {
          let lastcats = categories.filter((item) => {
            return item.catid === selected.catfk;
          });
          if (lastcats[0].catid === selected.catid) {
            setselected("first");
          } else {
            console.log(selected);
            console.log(lastcats);
            setselected(lastcats[0]);
          }
          if (lasthit) {
            setlasthit();
          }
        }
        if (selected === "first") {
          let firstcontent = categories.filter((item) => {
            return item.catid === item.catfk;
          });
          return (
            <>
              {firstcontent.map((item, index) => {
                return (
                  <div
                    className={`w-[90$] h-[5vh] bg-white bg-opacity-10 ${
                      lasthit?.catid === item.catid ? "selected" : ""
                    }`}
                    key={`content${index}`}
                    onClick={() => {
                      handleClick(item);
                    }}
                  >
                    {item.catname}
                  </div>
                );
              })}
              {lasthit ? (
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleSave();
                  }}
                >
                  ok
                </Button>
              ) : (
                <></>
              )}
            </>
          );
        } else {
          console.log(selected);
          let thiscategories = categories.filter((item) => {
            return item.catfk === selected.catid && item.catid !== item.catfk;
          });
          return (
            <>
              {thiscategories.map((item, index) => {
                if (lasthit?.catid === item.catid) {
                  console.log("changing");
                }
                return (
                  <div
                    className={`w-[90$] h-[5vh] bg-white bg-opacity-10 ${
                      lasthit?.catid === item.catid ? "selected" : ""
                    }`}
                    key={`content${index}`}
                    onClick={() => {
                      handleClick(item);
                    }}
                  >
                    {item.catname}
                  </div>
                );
              })}
              <Button
                variant="outlined"
                onClick={() => {
                  handleback();
                }}
              >
                back
              </Button>
              {lasthit ? (
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleSave();
                  }}
                >
                  ok
                </Button>
              ) : (
                <></>
              )}
            </>
          );
        }
      }
      let thiscatname = categories.filter((item) => {
        return item.catid === thispr[0].catid;
      });

      //----get thispr categorie  root
      let condition = true;
      let root = [];
      root[0] = thiscatname[0];
      while (condition) {
        const laststep = categories.filter((item) => {
          return item.catid === root[root.length - 1].catfk;
        });
        if (laststep.length !== 0) {
          root[root.length] = laststep[0];
          if (parseInt(laststep[0].catid) === parseInt(laststep[0].catfk)) {
            condition = false;
          }
        }
      }

      return (
        <>
          <button
            className="bg-white underline bg-opacity-0 mr-5 text-newblack"
            variant="outlined"
            onClick={() => {
              setcatpicker(true);
            }}
          >
            ویرایش
          </button>

          {root.map((item, index) => {
            if (index === 0) {
              return (
                <div className="mr-1 text-newblack" key={index}>
                  {item.catname}
                </div>
              );
            } else {
              return (
                <div
                  className=" opacity-40 mr-1 text-newblack"
                  key={index}
                >{`/ ${item.catname}`}</div>
              );
            }
          })}

          <div className="w-0 h-0 overflow-visible">
            {catpicker ? (
              <>
                <div
                  className="w-[100vw] h-[100vh] bg-black 
                  bg-opacity-40 absolute right-0 top-0 z-[9999]
                  backdrop-filter backdrop-blur-sm
                  flex items-center justify-center
                  flex-col
                  "
                >
                  <div className="w-[90vw] md:w-[30vw] h-[70vh] bg-orange-500 bg-opacity-10 flex flex-col">
                    <GnrContent />
                  </div>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setcatpicker(false);
                    }}
                  >
                    cancle
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      );
    }
    async function savetomysql() {
      const data = {
        prid: thispr[0].prid,
        prname: thispr[0].prname,
        prnamee: thispr[0].prnamee,
        price: thispr[0].price,
        buyprice: thispr[0].buyprice,
        discount: thispr[0].discount,
        pic1: thispr[0].pic1,
        catid: thispr[0].catid,
        brand: thispr[0].brand,
        count: thispr[0].count,
      };
      try {
        const response = await fetch("/api/products", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const jsondata = await response.json();
        console.log(jsondata);
      } catch (error) {
        console.log("Error Fetch Data:" + error);
      }
    }

    const sqlitems = [
      "prid",
      "prname",
      "prnamee",
      "price",
      "pic1",
      "catid",
      "brand",
      "count",
    ];
    const sqlitemspersian = [
      "آیدی",
      "نام فارسی",
      "نام انگلیسی",
      "قیمت",
      "نام عکس",
      "گروه محصول",
      "برند",
      "تعداد",
    ];

    return (
      <>
        <div
          className="bg-white bg-opacity-0 w-[100%] h-[7vh] flex items-center justify-center flex-row
        font-[Iransans] text-newblack"
        >
          <div>{`#${thispr[0].prid}`}</div>
          <div className="ml-[2%]">شناسه یکتا محصول</div>
        </div>
        {/* gorohmahsol */}
        <div
          className="bg-white bg-opacity-0 w-[100%] h-[max] flex items-center flex-col
        font-[Iransans] text-[white] mt-[1%]"
        >
          <div className="w-[100%] h-[2px] bg-white bg-opacity-25"></div>
          <div className="flex flex-col justify-center items-end w-[100%]">
            <div className="bg-newblack bg-opacity-30 whitespace-nowrap py-2 px-3 rounded-b-xl">
              گروه محصول
            </div>
            <div className="flex bg-white bg-opacity-0 flex-row w-[100%] items-center justify-end py-3">
              <CategoriesPick key={`categoriesPick`} />
            </div>
          </div>
        </div>
        {/* moshakhasat */}
        <div
          className="bg-white bg-opacity-0 w-[100%] h-[max] flex items-center flex-col
        font-[Iransans] text-[white] mt-[1%]"
        >
          <div className="w-[100%] h-[2px] bg-white bg-opacity-25"></div>
          <div className="flex flex-row justify-end items-center w-[100%]">
            <div className="bg-newblack bg-opacity-30 whitespace-nowrap py-2 px-3 rounded-b-xl">
              مشخصات
            </div>
          </div>
          <div className="bg-white bg-opacity-0 w-[100%] h-max flex flex-col justify-center items-center py-4 md:flex-row-reverse">
            <div className="w-[100%] h-[4vh] flex items-center justify-center mt-5 md:m-0">
              <InputField
                key={`prname`}
                titpepr={`نام محصول (فارسی)`}
                title={"prname"}
                value={thispr[0].prname}
              />
            </div>
            <div className="w-[100%] h-[4vh] flex items-center justify-center mt-10 md:m-0">
              <InputField
                key={`prnamee`}
                titpepr={`نام محصول (انگلیسی)`}
                title={"prnamee"}
                value={thispr[0].prnamee}
              />
            </div>
            <div className="w-[100%] h-[4vh] flex items-center justify-center mt-10 mb-3 md:m-0">
              <InputField
                key={`brand`}
                titpepr={`برند محصول`}
                title={"brand"}
                value={thispr[0].brand}
              />
            </div>
          </div>
        </div>
        {/* فروشگاه */}
        <div
          className="bg-white bg-opacity-0 w-[100%] h-[max] flex items-center flex-col
        font-[Iransans] text-[white] mt-[1%]"
        >
          <div className="w-[100%] h-[2px] bg-white bg-opacity-25"></div>
          <div className="flex flex-row justify-end items-center w-[100%]">
            <div className="bg-newblack bg-opacity-30 whitespace-nowrap py-2 px-3 rounded-b-xl">
              فروشگاه
            </div>
          </div>
          <div className="bg-white bg-opacity-0 w-[100%] h-max flex flex-col justify-center items-center py-4 md:flex-row-reverse">
            <div className="w-[100%] h-max flex items-center justify-center mt-5">
              <InputField
                key={`count`}
                titpepr="تعداد موجود"
                title={"count"}
                value={thispr[0].count}
              />
            </div>
            <div className="w-[100%] h-max flex items-center justify-center mt-5">
              <InputField
                key={`buyprice`}
                titpepr={`قیمت خرید`}
                title={"buyprice"}
                value={thispr[0].buyprice}
              />
            </div>
            <div className="w-[100%] h-max flex items-center justify-center mt-5">
              <InputField
                key={`price`}
                titpepr={`قیمت فروش`}
                title={"price"}
                value={thispr[0].price}
              />
            </div>
            <div className="w-[100%] h-max flex items-center justify-center mt-5">
              <InputField
                key={`discount`}
                titpepr={`مبلغ تخفیف`}
                title={"discount"}
                value={thispr[0].discount}
              />
            </div>
          </div>
        </div>
        {/* {sqlitems.map((item, index) => {
          if (item === "catid") {
            // return <CategoriesPick key={`categoriesPick`} />;
          }
          return (
            <InputField
              key={`info${index}`}
              titpepr={`${sqlitemspersian[index]}`}
              title={item}
              value={thispr[0][item]}
            />
          );
        })} */}
        <button
          className="bg-opacity-100 bg-newblue text-white ml-[5%]
          py-2 px-6 rounded-md cursor-pointer shadow-md font-[Iransans] mt-10"
          onClick={() => {
            savetomysql();
          }}
        >
          ذخیره تغییرات
        </button>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center md:flex-row w-[100%] bg-white bg-opacity-0 md:items-start">
      {/* Image */}
      <div className="bg-orange-400 bg-opacity-0 mt-[4%] w-[95vw] md:w-[30vw] h-[50vh] flex items-center flex-col justify-between">
        <div className="h-[85%] w-[90%] flex items-center justify-center bg-white bg-opacity-70 shadow-md rounded-lg">
          {imagelink && !loadingUpload ? (
            <img src={imagelink} className="w-[50%]" alt="Uploaded Image" />
          ) : (
            <></>
          )}
          {loadingUpload ? <CircularProgress /> : <></>}
        </div>
        <div className="flex items-center justify-center bg-white bg-opacity-0 w-full h-[15%] flex-row">
          <label
            className="bg-white bg-opacity-70 text-newblack
           py-2 px-4 rounded-md cursor-pointer font-[Iransans]"
          >
            انتخاب عکس جدید
            <input
              type="file"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          {image ? (
            <button
              className="bg-opacity-100 bg-newblue text-white ml-[5%]
           py-2 px-6 rounded-md cursor-pointer shadow-md font-[Iransans]"
              onClick={handleSubmit}
            >
              آپلود
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* information */}

      <div
        className="bg-white bg-opacity-0 w-[90vw] md:w-[70vw] 
      h-max flex flex-col items-center justify-center py-5"
      >
        {thispr[0] && categories.length !== 0 ? <GnrInfoOfPr /> : <></>}
      </div>
    </div>
  );
}
