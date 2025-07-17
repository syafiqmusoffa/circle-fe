import { useParams } from "react-router-dom";
import { MyThreadList } from "../thread/MyThreadText";
import {  fetchOtherThread } from "@/hooks/use-thread-by-id";

function OtherProfileThread() {
    const {username}=useParams()
  const { data: thread, isLoading, isError } = fetchOtherThread(username);

  if (isLoading) return <div className="text-gray-400">Loading...</div>;
  if (isError || !thread) return <div className="text-red-500">Gagal mengambil profil</div>;
 

  return (
    <>
      <MyThreadList thread={thread} />
    </>
  );
}

export default OtherProfileThread;
