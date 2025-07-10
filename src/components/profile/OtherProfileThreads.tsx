import { useParams } from "react-router-dom";
import { MyThreadList } from "../thread/MyThreadText";
import {  fetchOtherThread } from "@/hooks/use-thread-by-id";

function OtherProfileThread() {
    const {username}=useParams()
  const { data: thread, isLoading, isError } = fetchOtherThread(username);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !thread) return <div>Gagal mengambil profil</div>;
 

  return (
    <>
      <MyThreadList thread={thread} />
    </>
  );
}

export default OtherProfileThread;
