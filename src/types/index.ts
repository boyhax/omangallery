export interface SocialLinks {
  website?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

export interface TravelAgency {
  name: string;
  avatar: string;
  website: string;
}

export interface Location {
  name: string;
  lat: number;
  lng: number;
  mapUrl: string;
  state: string;
  city: string;
}

export interface Place {
  id: number;
  name: string;
  type: 'landmark' | 'company' | 'restaurant' | 'cafe' | 'mall' | 'park' | 'hospital' | 'museum';
  description: string;
  longDescription: string;
  image: string;
  location: Location;
  socialLinks?: SocialLinks;
  travelAgencies?: TravelAgency[];
  cuisine?: string;
  priceRange?: string;
  openingHours?: string;
  contact?: {
    phone?: string;
    email?: string;
    address: string;
  };
  slug?: string;
}

export type FilterType = 'all' | Place['type'];
export type LocationFilter = {
  state: string | null;
  city: string | null;
};