import React from 'react';
import { useParams } from 'react-router-dom';
import { Landmark, Building2, Utensils, Coffee, Building, Trees as Tree, Guitar as Hospital, Mouse as Museum } from 'lucide-react';
import { FilterChip } from './FilterChip';
import { PlaceCard } from './PlaceCard';
import { LocationFilterComponenet } from './LocationFilter';
import { SearchBar } from './SearchBar';
import { useGallery } from '../hooks/useGallery';

export function Gallery() {
  const { slug } = useParams();
  const {
    expandedId,
    activeFilter,
    locationFilter,
    locations,
    filteredPlaces,
    allPlaces,
    handleCardClick,
    setActiveFilter,
    handleStateChange,
    handleCityChange,
    initializeFromSlug
  } = useGallery();

  // Initialize from URL slug when component mounts or slug changes
  React.useEffect(() => {
    if (slug) {
      initializeFromSlug(slug);
    }
  }, [slug, initializeFromSlug]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-sky-500 p-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.1),rgba(0,0,0,0.3))] pointer-events-none" />
      <div className="max-w-[1920px] mx-auto relative">
        <div className="text-center mb-2">
          <a 
            href="https://omanapps.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-white/60 text-sm hover:text-white transition-colors"
          >
            Made with ♥ by OmanApps
          </a>
        </div>

        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Oman Gallery
        </h1>

        <div className="space-y-8 mb-8">
          <SearchBar
            places={allPlaces}
            onSelectPlace={handleCardClick}
            onSelectCategory={setActiveFilter}
            onSelectLocation={handleStateChange}
          />

          <div className="flex flex-wrap justify-center gap-4 animate-fadeIn">
            <FilterChip 
              type="all" 
              label="All" 
              isActive={activeFilter === 'all'}
              onClick={setActiveFilter}
            />
            <FilterChip 
              type="landmark" 
              label="Landmarks" 
              icon={Landmark}
              isActive={activeFilter === 'landmark'}
              onClick={setActiveFilter}
            />
            <FilterChip 
              type="company" 
              label="Companies" 
              icon={Building2}
              isActive={activeFilter === 'company'}
              onClick={setActiveFilter}
            />
            <FilterChip 
              type="restaurant" 
              label="Restaurants" 
              icon={Utensils}
              isActive={activeFilter === 'restaurant'}
              onClick={setActiveFilter}
            />
            <FilterChip 
              type="cafe" 
              label="Cafes" 
              icon={Coffee}
              isActive={activeFilter === 'cafe'}
              onClick={setActiveFilter}
            />
            <FilterChip 
              type="mall" 
              label="Malls" 
              icon={Building}
              isActive={activeFilter === 'mall'}
              onClick={setActiveFilter}
            />
            <FilterChip 
              type="park" 
              label="Parks" 
              icon={Tree}
              isActive={activeFilter === 'park'}
              onClick={setActiveFilter}
            />
            <FilterChip 
              type="hospital" 
              label="Hospitals" 
              icon={Hospital}
              isActive={activeFilter === 'hospital'}
              onClick={setActiveFilter}
            />
            <FilterChip 
              type="museum" 
              label="Museums" 
              icon={Museum}
              isActive={activeFilter === 'museum'}
              onClick={setActiveFilter}
            />
          </div>

          <LocationFilterComponenet
            locations={locations}
            currentFilter={locationFilter}
            onStateChange={handleStateChange}
            onCityChange={handleCityChange}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              isExpanded={expandedId === place.id}
              onCardClick={() => handleCardClick(place)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}