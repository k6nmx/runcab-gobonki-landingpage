export type Audience = 'customer' | 'business';

export interface ParsedHash {
  audience: Audience;
  section: string | null;
}

export function parseHash(hash: string): ParsedHash {
  const cleaned = hash.startsWith('#') ? hash.substring(1) : hash;

  if (!cleaned) {
    return { audience: 'customer', section: null };
  }

  const parts = cleaned.split(':');
  
  let audience: Audience = 'customer';
  let section: string | null = null;

  if (parts.length === 1) {
    const part = parts[0];
    if (part === 'business') {
      audience = 'business';
    } else if (part === 'customer') {
      audience = 'customer';
    } else {
      section = part;
    }
  } else if (parts.length >= 2) {
    const audiencePart = parts[0];
    if (audiencePart === 'business') {
      audience = 'business';
    }
    section = parts[1];
  }

  return { audience, section };
}