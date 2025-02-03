import React from 'react';
import { Place } from '../types';

interface TravelAgenciesProps {
  agencies: Place['travelAgencies'];
}

export function TravelAgencies({ agencies }: TravelAgenciesProps) {
  if (!agencies) return null;

  return (
    <div className="mt-4">
      <h3 className="text-white/90 font-semibold mb-2">Book your visit:</h3>
      <div className="flex flex-wrap gap-4">
        {agencies.map((agency, index) => (
          <a
            key={index}
            href={agency.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-3 py-1.5 transition-all"
          >
            <img
              src={agency.avatar}
              alt={agency.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-white/90 text-sm">{agency.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}