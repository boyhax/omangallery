import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Place, FilterType } from '../types';

interface SearchResult {
  type: 'place' | 'category' | 'location';
  text: string;
  subtext?: string;
  filterType?: FilterType;
  state?: string;
  city?: string;
}

interface SearchBarProps {
  places: Place[];
  onSelectPlace: (place: Place) => void;
  onSelectCategory: (category: FilterType) => void;
  onSelectLocation: (state: string | null, city: string | null) => void;
}

export function SearchBar({ places, onSelectPlace, onSelectCategory, onSelectLocation }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Generate search results
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search places
    places.forEach(place => {
      if (place.name.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          type: 'place',
          text: place.name,
          subtext: place.type
        });
      }
    });

    // Search categories
    const categories: FilterType[] = ['landmark', 'company', 'restaurant', 'cafe', 'mall', 'park', 'hospital', 'museum'];
    categories.forEach(category => {
      if (category.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          type: 'category',
          text: category,
          filterType: category
        });
      }
    });

    // Search locations
    const locations = new Set<string>();
    places.forEach(place => {
      const state = place.location.state;
      const city = place.location.city;

      if (state.toLowerCase().includes(lowerQuery) && !locations.has(state)) {
        locations.add(state);
        searchResults.push({
          type: 'location',
          text: state,
          subtext: 'State'
        });
      }

      if (city.toLowerCase().includes(lowerQuery) && !locations.has(city)) {
        locations.add(city);
        searchResults.push({
          type: 'location',
          text: city,
          subtext: state
        });
      }
    });

    setResults(searchResults.slice(0, 8));
    setSelectedIndex(0);
  }, [query, places]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelectResult(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    if (result.type === 'place') {
      const place = places.find(p => p.name === result.text);
      if (place) onSelectPlace(place);
    } else if (result.type === 'category' && result.filterType) {
      onSelectCategory(result.filterType);
    } else if (result.type === 'location') {
      if (result.subtext === 'State') {
        onSelectLocation(result.text, null);
      } else {
        const place = places.find(p => p.location.city === result.text);
        if (place) {
          onSelectLocation(place.location.state, result.text);
        }
      }
    }
    setQuery('');
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search places, categories, or locations..."
          className="w-full px-4 py-3 pl-12 bg-white/10 text-white placeholder-white/60 rounded-full border border-white/20 focus:border-white/40 focus:ring-0 focus:outline-none"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
      </div>

      {isOpen && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute mt-2 w-full bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 shadow-xl overflow-hidden z-50"
        >
          {results.map((result, index) => (
            <div
              key={`${result.type}-${result.text}`}
              onClick={() => handleSelectResult(result)}
              className={`px-4 py-3 cursor-pointer ${
                index === selectedIndex
                  ? 'bg-white/20'
                  : 'hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{result.text}</span>
                <span className="text-white/60 text-sm capitalize">
                  {result.subtext || result.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}