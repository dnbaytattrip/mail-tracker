import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import useToggle from "../../../hooks/useToggle";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
// import { notificationsData } from "./notificationsData";

function PassWrong() {
  const { data: session } = useSession();
  const role = session?.user?.admin ? "admin" : "user";
  const posterDetailsId =
    role === "admin" ? router.query.posterDetailsId : session?.user?.id;

  console.log("posterid", posterDetailsId);

  // console.log("session", session);
  // console.log("notifications", notifications);

  useEffect(() => {
    if (adminId) {
      const pusher = new Pusher("e4766909b306ad7ddd58", {
        // APP_KEY
        cluster: "ap2",
        encrypted: true,
      });

      const channel = pusher.subscribe(adminId);
      channel.bind("password-notification", (data) => {
        console.log("notification:", data);
      });

      return () => {
        // channel.unbind_all();
        // channel.unbind(); // Unbind event listeners when component unmounts
        // pusher.unsubscribe("notifications");
        channel.unbind("new-notification"); // Unbind event listeners when component unmounts
        pusher.unsubscribe(adminId);
      };
    }
  }, [adminId]);

  return (
    <div className="">
      <button className="bg-red-600 text-xs text-white font-semibold px-2 py-1 rounded">
        PassWrong
      </button>
    </div>
  );
}

export default PassWrong;
