import { MyThread } from "../thread/MyThreadPict";
import { fetchOtherThread } from "@/hooks/use-thread-by-id";
import { useParams } from "react-router-dom";

export function OtherProfilePict() {
    const {username}= useParams()
  const { data: threads, isLoading, isError } = fetchOtherThread(username);

  if (isLoading) return <div className="text-gray-400">Loading...</div>;
  if (isError || !threads) return <div className="text-red-500">Gagal mengambil profil</div>;

  return (
    <div>
      <MyThread threads={threads} />
    </div>
  );
}

;
