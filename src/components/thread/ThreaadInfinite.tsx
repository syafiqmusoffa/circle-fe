import { useInfiniteThreads } from "@/hooks/use-thread-list";
import { useEffect, useRef, useCallback } from "react";

export function ThreadListPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteThreads();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    if (!loadMoreRef.current) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      threshold: 1.0,
    });

    observerRef.current.observe(loadMoreRef.current);
  }, [handleObserver]);

  if (status === "pending") return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      {data?.pages.flatMap((page) =>
        page.threads.map((thread: any) => (
          <div key={thread.id} className="border p-4 rounded shadow-sm">
            <div className="font-bold">{thread.author.profile.username}</div>
            <p>{thread.content}</p>
            {thread.imageUrl && (
              <img
                src={thread.imageUrl}
                alt="thread"
                className="mt-2 max-w-full rounded"
              />
            )}
            <div className="text-sm text-gray-500">
              {thread.likeCount} likes · {thread.likeComment} comments
            </div>
          </div>
        ))
      )}

      <div ref={loadMoreRef} className="text-center py-4">
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
            ? "Scroll to load more"
            : "No more threads"}
      </div>
    </div>
  );
}
