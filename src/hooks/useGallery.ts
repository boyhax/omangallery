import { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterType, LocationFilter, Place } from '../types';
import museums from '../data/museums.json';
import landmarks from '../data/landmarks.json';
import restaurants from '../data/restaurants.json';
import companies from '../data/companies.json';
import cafes from '../data/cafes.json';
import parks from '../data/parks.json';

// Generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Add slugs to places
const allPlaces = [
  ...museums.places,
  ...landmarks.places,
  ...restaurants.places,
  ...companies.places,
  ...cafes.places,
  ...parks.places
].map(place => ({
  ...place,
  slug: generateSlug(place.name)
}));

export function useGallery() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [locationFilter, setLocationFilter] = useState<LocationFilter>({
    state: null,
    city: null
  });

  const initializeFromSlug = useCallback((slug: string) => {
    const place = allPlaces.find(p => p.slug === slug);
    if (place) {
      setExpandedId(place.id);
      // Set the filter to match the place type
      setActiveFilter(place.type);
      // Set location filter to match the place location
      setLocationFilter({
        state: place.location.state,
        city: place.location.city
      });
    }
  }, []);

  const handleCardClick = (place: Place) => {
    const newId = expandedId === place.id ? null : place.id;
    setExpandedId(newId);
    
    // Update URL using React Router's navigate
    if (newId) {
      navigate(`/p/${place.slug}`);
    } else {
      navigate('/');
    }
  };

  // Scroll to expanded item
  useEffect(() => {
    if (expandedId) {
      const element = document.getElementById(`place-${expandedId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [expandedId]);

  const locations = useMemo(() => {
    const states = new Set<string>();
    const cities = new Map<string, Set<string>>();

    allPlaces.forEach(place => {
      const state = place.location.state;
      const city = place.location.city;
      
      states.add(state);
      
      if (!cities.has(state)) {
        cities.set(state, new Set<string>());
      }
      cities.get(state)?.add(city);
    });

    return {
      states: Array.from(states).sort(),
      cities: Array.from(cities.entries()).reduce((acc, [state, citySet]) => {
        acc[state] = Array.from(citySet).sort();
        return acc;
      }, {} as Record<string, string[]>)
    };
  }, []);

  const filteredPlaces = allPlaces.filter(place => {
    const typeMatch = activeFilter === 'all' ? true : place.type === activeFilter;
    const stateMatch = !locationFilter.state || place.location.state === locationFilter.state;
    const cityMatch = !locationFilter.city || place.location.city === locationFilter.city;
    return typeMatch && stateMatch && cityMatch;
  });

  const handleStateChange = (state: string | null) => {
    setLocationFilter(prev => ({
      state,
      city: null // Reset city when state changes
    }));
  };

  const handleCityChange = (city: string | null) => {
    setLocationFilter(prev => ({
      ...prev,
      city
    }));
  };

  return {
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
  };
}