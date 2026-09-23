export interface VitalStats {
  diameterKm: number;
  diameterComparisonGu: string;
  moonsCount: number;
  dayLengthGu: string;
  yearLengthGu: string;
  avgTempGu: string;
  typeGu: string; // દા.ત. 'પથ્થરીય ગ્રહ' (Terrestrial), 'વાયુનો રાક્ષસ' (Gas Giant), 'બરફનો રાક્ષસ' (Ice Giant), 'તારો' (Star)
}

export interface CelestialBody {
  id: string;
  nameGu: string;
  nameEn: string;
  taglineGu: string;
  category: 'star' | 'terrestrial' | 'gas_giant' | 'ice_giant' | 'dwarf';
  distanceFromSun: {
    kmFormattedGu: string;
    kmValue: number; // in km
    au: string;
    lightTravelTimeGu: string;
    carTravelYearsGu: string;
    analogyGu: string;
  };
  weightAndMass: {
    massGu: string;
    gravity: number; // m/s2
    gravityRatio: number; // relative to Earth (Earth = 1.0)
    kidWeightExampleGu: string;
    jumpHeightGu: string; // e.g. "તમે પૃથ્વી કરતાં 2.6 ગણો ઊંચો કૂદકો મારી શકો!"
  };
  color: {
    primaryNameGu: string;
    accentHex: string;
    colorReasonGu: string;
    palette: string[];
    surfaceTextureType: 'sun' | 'mercury' | 'venus' | 'earth' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto';
  };
  khasiyat: string[]; // 4-5 child-friendly bullet points in Gujarati
  vitalStats: VitalStats;
  audioNarrationTextGu: string;
  
  // 3D visual parameters
  three: {
    radius: number; // scaled for 3D view
    orbitRadius: number;
    orbitSpeed: number;
    rotationSpeed: number;
    hasRings?: boolean;
    ringInner?: number;
    ringOuter?: number;
    ringColor?: string;
    tiltAngle?: number; // radians
  };
}

export interface QuizQuestion {
  id: number;
  questionGu: string;
  questionEn: string;
  options: {
    id: string;
    textGu: string;
    textEn: string;
  }[];
  correctAnswerId: string;
  funFactGu: string;
  relatedPlanetId: string;
}
