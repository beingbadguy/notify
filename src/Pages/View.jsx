import supabase from "@/db/supabase";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";

const View = () => {
  const [asset, setAsset] = useState();
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const fetchOneData = async (id) => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select()
        .eq("id", id);

      if (error) {
        throw error;
      }
      setAsset(data);
      // console.log("Record:", data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchOneData(id);
  }, []);
  return (
    <div>
      <div className="flex items-center p-4 ">
        <div
          className="text-3xl cursor-pointer"
          onClick={() => {
            navigate("/homepage");
          }}
        >
          <MdKeyboardArrowLeft />
        </div>
      </div>

      {asset &&
        asset.map((item, index) => (
          <div
            key={index}
            className={` relative text-black   rounded-xl px-10`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <CiCalendar />
                </div>
                <p> {new Date(item.created_at).getFullYear()}</p>
              </div>
            </div>

            <h1 className="font-bold text-4xl mt-3">{item.title}</h1>
            <p className="mt-5">{item.description}</p>
          </div>
        ))}
    </div>
  );
};

export default View;
