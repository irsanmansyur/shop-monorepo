import { useState, useEffect, useRef } from "react";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { useSearch } from "~/store/zustan";
import { Link } from "react-router";

const FloatingSearch = () => {
  const { set, result } = useSearch();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches] = useState([
    "iPhone 15 Pro",
    "Samsung Galaxy S24",
    "MacBook Air M3",
    "AirPods Pro",
  ]);
  const [trendingSearches] = useState([
    "Gaming Laptop",
    "Wireless Headphones",
    "Smart Watch",
    "Tablet Android",
    "Camera DSLR",
  ]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: any) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = setTimeout(() => {
      set({ q: searchQuery });
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Implement your search logic here
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="relative">
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative group"
      >
        <Search size={28} className="text-gray-600 group-hover:text-gray-800" />
      </button>

      {/* Floating Search Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 px-4">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Search Container */}
          <div className="relative w-full max-w-2xl mx-auto">
            {/* Search Input */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 scale-100">
              <div className="flex items-center px-6 py-4 border-b border-gray-100">
                <Search size={20} className="text-gray-400 mr-3" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      handleSearch(searchQuery.trim());
                    }
                  }}
                  className="flex-1 text-lg outline-none placeholder-gray-400"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 ml-2"
                >
                  <X size={18} className="text-gray-400" />
                </button>
              </div>

              {/* Search Content */}
              <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
                {searchQuery.trim() ? (
                  /* Search Results */
                  <div className="p-4">
                    <div className="text-sm text-gray-500 mb-3">
                      Search results for "{searchQuery}"
                    </div>
                    <div className="space-y-2">
                      {/* Mock search results */}
                      {result.slice(0, 8).map((item) => (
                        <Link
                          key={item.id}
                          to={"/details/" + item.slug}
                          className="flex items-start p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
                        >
                          <div className="bg-gray-200 rounded-lg mr-3 flex items-center justify-center w-[150px]">
                            <img src={item.imageUrl} className="bg-cover" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Category • Brand
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Search Suggestions */
                  <div className="p-4 space-y-6">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center mb-3">
                          <Clock size={16} className="text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-600">
                            Recent Searches
                          </span>
                        </div>
                        <div className="space-y-1">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(search)}
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-700"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trending Searches */}
                    <div>
                      <div className="flex items-center mb-3">
                        <TrendingUp size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-600">
                          Trending Searches
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((trend, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(trend)}
                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors duration-200"
                          >
                            {trend}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="text-xs text-gray-400 text-center">
                        Press{" "}
                        <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">
                          ESC
                        </kbd>{" "}
                        to close
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingSearch;
