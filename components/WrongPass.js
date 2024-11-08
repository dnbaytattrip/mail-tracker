import React from "react";
import { useSession } from "next-auth/react";
import { API_URL } from "../config/index";
import { useRouter } from "next/router";
import axios from "axios";

function WrongPass() {
  const router = useRouter();
  const { data: session } = useSession();

  const role = session?.user?.admin ? "admin" : "user";

  // console.log("role", role);
  const posterDetailsId =
    role === "admin" ? router.query.posterDetailsId : session?.user?.id;
  const adminId = session?.user?.id;
  console.log("posterid", posterDetailsId);
  const handleWrongPass = async () => {
    const values = {
      id: "672dada34300bf9ea46333c0",
      adminId,
    };
    const url = `${API_URL}/password/post/wrong`;

    const res = await axios.post(url, values);
    const data = await res.json();
    console.log(data);
  };
  return (
    <button
      onClick={handleWrongPass}
      className="bg-red-600 text-xs text-white font-semibold px-2 py-1 rounded"
    >
      PassWrong
    </button>
  );
}

export default WrongPass;
