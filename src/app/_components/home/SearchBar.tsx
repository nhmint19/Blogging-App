import Image from "next/image";

export function SearchBar() {
  return (
    <div className="relative flex border p-2 mx-4 rounded-md items-center max-w-[680px] w-full">
      <button type="submit">
        <Image priority src="/icons/search.svg" alt="Search..." width="24" height="24" />
      </button>
      <input
        type="text"
        className="px-2 border-none rounded-lg focus:outline-none focus:ring-0 placeholder-gray-600 h-6"
        placeholder="Search..."
      />
      <span className="absolute right-2 bottom-2 flex items-center text-xs text-gray-500">
        Powered by Minh
      </span>
    </div>
  );
}
