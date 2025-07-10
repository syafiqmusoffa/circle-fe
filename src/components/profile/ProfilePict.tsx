import { MyThread } from "../thread/MyThreadPict";
import { fetchMyThread } from "@/hooks/use-thread-by-id";

export function ProfilePict() {
  const { data: threads, isLoading, isError } = fetchMyThread();

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (isError || !threads) return <div className="text-white">Gagal mengambil profil</div>;
 
  return (
    <div>
      <MyThread threads={threads} />
    </div>
  );
}

;
