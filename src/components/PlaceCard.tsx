import React from 'react';
import { Landmark, Building2, Utensils, Coffee, Building, Trees as Tree, Guitar as Hospital, Clock, Phone, Mail, MapPin, Navigation, Mouse as Museum } from 'lucide-react';
import { Place } from '../types';
import { SocialLinks } from './SocialLinks';
import { TravelAgencies } from './TravelAgencies';

interface PlaceCardProps {
  place: Place;
  isExpanded: boolean;
  onCardClick: () => void;
}

const getIcon = (type: Place['type']) => {
  switch (type) {
    case 'landmark': return Landmark;
    case 'company': return Building2;
    case 'restaurant': return Utensils;
    case 'cafe': return Coffee;
    case 'mall': return Building;
    case 'park': return Tree;
    case 'hospital': return Hospital;
    case 'museum': return Museum;
    default: return Building2;
  }
};

export function PlaceCard({ 
  place, 
  isExpanded, 
  onCardClick 
}: PlaceCardProps) {
  const Icon = getIcon(place.type);

  return (
    <div
      id={`place-${place.id}`}
      onClick={onCardClick}
      className={`
        relative overflow-hidden rounded-xl cursor-pointer
        transition-all duration-700 ease-in-out transform
        ${isExpanded ? 'lg:col-span-2 lg:row-span-2 scale-105' : 'scale-100'}
        hover:shadow-2xl hover:-translate-y-1
        animate-fadeIn
      `}
      style={{
        minHeight: isExpanded ? '600px' : '300px',
        height: 'auto',
        transition: 'all 0.7s ease-in-out',
        animationDelay: `${place.id * 100}ms`
      }}
    >
      <div className="relative h-full group">
        <div className="absolute inset-0">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] group-hover:bg-black/50 transition-colors" />
        </div>

        <div className="relative p-6 h-full flex flex-col">
          <div className="flex items-center gap-2 text-white/90">
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium capitalize">
              {place.type}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mt-2">
            {place.name}
          </h2>

          <p className="text-white/80 mt-2 flex-grow">
            {isExpanded ? place.longDescription : place.description}
          </p>

          {isExpanded && (
            <div className="mt-4 space-y-4">
              {place.type === 'company' && <SocialLinks links={place.socialLinks} />}
              {place.type === 'landmark' && <TravelAgencies agencies={place.travelAgencies} />}
              
              {(place.type === 'restaurant' || place.type === 'cafe' || place.type === 'mall') && (
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-4 h-4" />
                  <span>{place.openingHours}</span>
                </div>
              )}

              {place.contact && (
                <div className="space-y-2">
                  {place.contact.phone && (
                    <div className="flex items-center gap-2 text-white/80">
                      <Phone className="w-4 h-4" />
                      <span>{place.contact.phone}</span>
                    </div>
                  )}
                  {place.contact.email && (
                    <div className="flex items-center gap-2 text-white/80">
                      <Mail className="w-4 h-4" />
                      <span>{place.contact.email}</span>
                    </div>
                  )}
                  {place.contact.address && (
                    <div className="flex items-center gap-2 text-white/80">
                      <MapPin className="w-4 h-4" />
                      <span>{place.contact.address}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2">
                <a
                  href={place.location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 text-white/90 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>View on Map</span>
                </a>
                <span className="text-white/60 text-sm">
                  {place.location.name}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}