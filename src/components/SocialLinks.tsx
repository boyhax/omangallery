import React from 'react';
import { Globe, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Place } from '../types';

interface SocialLinksProps {
  links: Place['socialLinks'];
}

export function SocialLinks({ links }: SocialLinksProps) {
  if (!links) return null;
  
  return (
    <div className="flex gap-3 mt-4">
      {links.website && (
        <a href={links.website} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
          <Globe className="w-5 h-5" />
        </a>
      )}
      {links.facebook && (
        <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
          <Facebook className="w-5 h-5" />
        </a>
      )}
      {links.twitter && (
        <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
          <Twitter className="w-5 h-5" />
        </a>
      )}
      {links.linkedin && (
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
          <Linkedin className="w-5 h-5" />
        </a>
      )}
      {links.instagram && (
        <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
          <Instagram className="w-5 h-5" />
        </a>
      )}
    </div>
  );
}