import React from 'react';
import { MapPin } from 'lucide-react';
import { FilterChip } from './FilterChip';
import { type LocationFilter } from '../types';

interface LocationFilterProps {
  locations: {
    states: string[];
    cities: Record<string, string[]>;
  };
  currentFilter: LocationFilter;
  onStateChange: (state: string | null) => void;
  onCityChange: (city: string | null) => void;
}

export function LocationFilterComponenet({
  locations,
  currentFilter,
  onStateChange,
  onCityChange
}: LocationFilterProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-2 justify-center">
        
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        <FilterChip
          type="all"
          label="All States"
          isActive={!currentFilter.state}
          onClick={() => onStateChange(null)}
        />
        {locations.states.map(state => (
          <FilterChip
            key={state}
            type="all"
            label={state}
            isActive={currentFilter.state === state}
            onClick={() => onStateChange(state)}
          />
        ))}
      </div>

      {currentFilter.state && (
        <div className="flex flex-wrap justify-center gap-3">
          <FilterChip
            type="all"
            label="All Cities"
            isActive={!currentFilter.city}
            onClick={() => onCityChange(null)}
          />
          {locations.cities[currentFilter.state]?.map(city => (
            <FilterChip
              key={city}
              type="all"
              label={city}
              isActive={currentFilter.city === city}
              onClick={() => onCityChange(city)}
            />
          ))}
        </div>
      )}
    </div>
  );
}