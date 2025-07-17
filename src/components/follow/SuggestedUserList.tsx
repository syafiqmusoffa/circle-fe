import SuggestedUser from "../thread/SuggestedUser";
import { useSuggested } from "@/hooks/use-suggested";

function SuggestedUserList() {
  const { data, isLoading, isError } = useSuggested();

  if (isLoading)
    return <div className="text-gray-400">Loading suggestions...</div>;
  if (isError || !data?.suggested)
    return <div className="text-red-500">Gagal memuat user</div>;
  return (
    <div className="mt-2 space-y-3">
      {data.suggested.map((suggested) => (
        <SuggestedUser key={suggested.id} suggested={suggested} />
      ))} 
    </div>
  );
}

export default SuggestedUserList;
