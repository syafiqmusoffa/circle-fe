import { MyThreadList } from "../thread/MyThreadText";
import { fetchMyThread } from "@/hooks/use-thread-by-id";

function ProfileThread() {
  const { data: thread, isLoading, isError } = fetchMyThread();

  if (isLoading) return <div className="text-gray-400">Loading...</div>;
  if (isError || !thread) return <div className="text-red-500">Gagal mengambil profil</div>;

  return (
    <>
      <MyThreadList thread={thread} />
    </>
  );
}

export default ProfileThread;
