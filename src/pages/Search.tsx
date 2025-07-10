import { fetchUser } from "@/api/users";
import { SearchUserCard } from "@/components/search bar/Search";
import { SuggestedUserType } from "@/types/suggested-profile";
import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

function Search() {
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState<SuggestedUserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedInput = useDebounce(userInput, 500);

  useEffect(() => {
    if (debouncedInput.trim()) {
      setLoading(true);
      setError(null);
      fetchUser(debouncedInput)
        .then((data) => {
          setUserData(data);
          if (data.length === 0) setError("No users found");
        })
        .catch((err) => {
          setUserData([]);
          setError(err.message || "Fetch error");
        })
        .finally(() => setLoading(false));
    } else {
      setUserData([]);
      setError(null);
    }
  }, [debouncedInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="p-4 h-screen text-white">
      <h1 className="py-3 text-4xl text-gray-400">Search Users</h1>

      <input
        type="text"
        placeholder="Search by name or username..."
        className="w-full p-3 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={userInput}
        onChange={handleChange}
      />

      <div className="mt-4">
        {loading && <p className="text-gray-400">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {userData.length > 0 && (
          <div className="space-y-4">
            {userData.map((user) => (
              <SearchUserCard
                key={user.id}
                user={user}
                onToggleFollow={(updated: any) =>
                  setUserData((prev) =>
                    prev.map((u) =>
                      u.id === user.id ? { ...u, isFollowed: updated } : u
                    )
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
      <div className="py-10 "></div>
    </div>
  );
}

export default Search;
