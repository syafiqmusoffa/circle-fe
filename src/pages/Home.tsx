import CreateContent from "@/components/thread/CreateContent";
import ThreadList from "@/components/thread/ThreadList";
import { useThreads } from "@/hooks/use-thread-list";

function Home() {
  const { data: threads, isLoading, error } = useThreads();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading threads</p>;
  return (
    <main className="pt-3 ">
      <h1 className="p-3 text-4xl text-gray-400">Home</h1>
      <CreateContent />
      <br />
      <ThreadList threads={threads} />
      <div className="py-10 "></div>
    </main>
  );
}

export default Home;
