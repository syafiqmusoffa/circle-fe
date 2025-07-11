import { ThreadProps } from "@/types/thread";
import Thread from "./Thread";

interface ThreadListProps {
  threads: ThreadProps[];
}

function ThreadList({ threads }: ThreadListProps) {
  return (
    <>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </>
  );
}

export default ThreadList;