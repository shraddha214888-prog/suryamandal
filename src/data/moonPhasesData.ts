export interface MoonPhaseInfo {
  id: string;
  nameGu: string;
  nameEn: string;
  tithiGu: string;
  pakshaGu: 'સુદ (શુક્લ પક્ષ)' | 'વદ (કૃષ્ણ પક્ષ)' | 'અમાસ / પૂનમ';
  dayRange: string;
  cycleDay: number; // 0 to 29.5
  illuminationPercent: number; // 0 to 100
  photoUrl: string;
  shortDescGu: string;
  kidExplanationGu: string;
  whereToLookGu: string;
}

// Generated real photos
import fullMoonPhoto from '../assets/images/full_moon_photo_1790147195704.jpg';
import crescentMoonPhoto from '../assets/images/crescent_moon_photo_1790147219671.jpg';
import halfMoonPhoto from '../assets/images/half_moon_photo_1790147240577.jpg';

export const MOON_PHASES_DATA: MoonPhaseInfo[] = [
  {
    id: 'new-moon',
    nameGu: 'અમાસ (નવો ચંદ્ર)',
    nameEn: 'New Moon',
    tithiGu: 'અમાસ (વદ અમાસ)',
    pakshaGu: 'અમાસ / પૂનમ',
    dayRange: 'દિવસ ૦ (શરૂઆત)',
    cycleDay: 0,
    illuminationPercent: 0,
    photoUrl: fullMoonPhoto, // rendered with total shadow mask
    shortDescGu: 'ચંદ્ર આકાશમાં બિલકુલ દેખાતો નથી.',
    kidExplanationGu: 'આ દિવસે ચંદ્ર સૂર્ય અને પૃથ્વીની વચ્ચે હોય છે. સૂર્યનો પ્રકાશ ચંદ્રની પાછળની બાજુ પડે છે, તેથી પૃથ્વી તરફનો ભાગ સાવ અંધારામાં રહે છે અને ચંદ્ર દેખાતો નથી.',
    whereToLookGu: 'ચંદ્ર સૂર્યની સાથે સવારે ઊગે છે અને સાંજે આથમે છે, તેથી દિવસે સૂર્યના તેજમાં અદ્રશ્ય રહે છે.'
  },
  {
    id: 'waxing-crescent',
    nameGu: 'વધતો બીજનો ચંદ્ર (સુદ બીજ)',
    nameEn: 'Waxing Crescent',
    tithiGu: 'સુદ એકમ થી સુદ છઠ્ઠ',
    pakshaGu: 'સુદ (શુક્લ પક્ષ)',
    dayRange: 'દિવસ ૧ થી ૬',
    cycleDay: 3.7,
    illuminationPercent: 20,
    photoUrl: crescentMoonPhoto,
    shortDescGu: 'પાતળી ચાંદી જેવી સુંદર વાંકી કોર દેખાય છે.',
    kidExplanationGu: 'અમાસ પછી ચંદ્ર ધીમે ધીમે આગળ વધે છે, જેથી સૂર્યપ્રકાશનો એક નાનો હિસ્સો જમણી બાજુ વળાંકવાળી સુંદર પટ્ટી રૂપે દેખાવા લાગે છે. તેને આપણે બીજનો ચાંદ કહીએ છીએ!',
    whereToLookGu: 'સાંજે સૂર્યાસ્ત પછી પશ્ચિમ આકાશમાં થોડો સમય ક્ષિતિજ પાસે જોવા મળે છે.'
  },
  {
    id: 'first-quarter',
    nameGu: 'સુદ આઠમ (પ્રથમ અર્ધચંદ્ર)',
    nameEn: 'First Quarter',
    tithiGu: 'સુદ સાતમ / આઠમ',
    pakshaGu: 'સુદ (શુક્લ પક્ષ)',
    dayRange: 'દિવસ ૭.૪',
    cycleDay: 7.4,
    illuminationPercent: 50,
    photoUrl: halfMoonPhoto,
    shortDescGu: 'ચંદ્ર બરાબર અડધો ચમકતો ગોળ દેખાય છે (જમણો ભાગ પ્રકાશિત).',
    kidExplanationGu: 'ચંદ્ર પૃથ્વીની આસપાસ તેની ભ્રમણકક્ષાનો ૧/૪ ભાગ પૂરો કરી લે છે. પૃથ્વી પરથી જોતાં તેનો અડધો ભાગ સૂર્યના પ્રકાશથી ઉજળો અને અડધો ભાગ પડછાયામાં દેખાય છે.',
    whereToLookGu: 'બપોરે ઊગે છે અને મધ્યરાત્રિ સુધી માથા પર આકાશમાં ચમકે છે.'
  },
  {
    id: 'waxing-gibbous',
    nameGu: 'વધતો અલ્પાધિક ચંદ્ર (સુદ અગિયારસ)',
    nameEn: 'Waxing Gibbous',
    tithiGu: 'સુદ નોમ થી ચૌદશ',
    pakshaGu: 'સુદ (શુક્લ પક્ષ)',
    dayRange: 'દિવસ ૮ થી ૧૩',
    cycleDay: 11,
    illuminationPercent: 78,
    photoUrl: fullMoonPhoto,
    shortDescGu: 'અડધા કરતાં ઘણો વધારે મોટો ફૂલેલો ચંદ્ર.',
    kidExplanationGu: 'ચંદ્ર પૂનમ તરફ આગળ વધી રહ્યો છે! તેનો મોટાભાગનો હિસ્સો સૂર્યના સીધા પ્રકાશમાં ચમકી રહ્યો છે, માત્ર ડાબી બાજુ સહેજ અંધારું બાકી રહે છે.',
    whereToLookGu: 'સાંજના સમયથી શરૂ કરીને મોડી રાત સુધી આકાશમાં મોટો અને તેજસ્વી દેખાય છે.'
  },
  {
    id: 'full-moon',
    nameGu: 'પૂનમ (પૂર્ણ ચંદ્ર)',
    nameEn: 'Full Moon',
    tithiGu: 'પૂનમ (શરદ પૂનમ, વગેરે)',
    pakshaGu: 'અમાસ / પૂનમ',
    dayRange: 'દિવસ ૧૪.૮',
    cycleDay: 14.8,
    illuminationPercent: 100,
    photoUrl: fullMoonPhoto,
    shortDescGu: 'સોળે કળાએ ખીલેલો દૂધ જેવો ઉજળો સંપૂર્ણ ગોળાકાર ચાંદ.',
    kidExplanationGu: 'પૃથ્વી સૂર્ય અને ચંદ્રની લગભગ વચ્ચે હોય છે. સૂર્યનો આખો પ્રકાશ ચંદ્રના પૃથ્વી તરફના મોં પર સીધો પડે છે, તેથી આખી રાત અજવાળું રેલાય છે!',
    whereToLookGu: 'સાંજે સૂર્યાસ્ત થતાં જ પૂર્વ દિશામાંથી આખો ઊગે છે અને આખી રાત આકાશમાં ઝગમગે છે.'
  },
  {
    id: 'waning-gibbous',
    nameGu: 'ઘટતો અલ્પાધિક ચંદ્ર (વદ પડવો/બીજ)',
    nameEn: 'Waning Gibbous',
    tithiGu: 'વદ એકમ થી વદ છઠ્ઠ',
    pakshaGu: 'વદ (કૃષ્ણ પક્ષ)',
    dayRange: 'દિવસ ૧૬ થી ૨૧',
    cycleDay: 18.5,
    illuminationPercent: 78,
    photoUrl: fullMoonPhoto,
    shortDescGu: 'પૂનમ પછી ચંદ્ર જમણી બાજુથી ધીમે ધીમે ઘટવા લાગે છે.',
    kidExplanationGu: 'પૂનમ પતી ગઈ! હવે ચંદ્ર અમાસ તરફ વળી રહ્યો છે. જમણી બાજુ સહેજ અંધારું શરૂ થાય છે જ્યારે ડાબી બાજુ મોટા ભાગે પ્રકાશિત રહે છે.',
    whereToLookGu: 'મોડી રાત્રે ઊગે છે અને સવારે પણ પશ્ચિમ આકાશમાં થોડો સમય દેખાય છે.'
  },
  {
    id: 'third-quarter',
    nameGu: 'વદ આઠમ (છેલ્લો અર્ધચંદ્ર)',
    nameEn: 'Third / Last Quarter',
    tithiGu: 'વદ સાતમ / આઠમ',
    pakshaGu: 'વદ (કૃષ્ણ પક્ષ)',
    dayRange: 'દિવસ ૨૨.૧',
    cycleDay: 22.1,
    illuminationPercent: 50,
    photoUrl: halfMoonPhoto,
    shortDescGu: 'ડાબી બાજુનો અડધો ચંદ્ર પ્રકાશિત દેખાય છે.',
    kidExplanationGu: 'ચંદ્ર પોતાની કક્ષાનો ૩/૪ ભાગ પૂરો કરે છે. સુદ આઠમ કરતાં બિલકુલ ઊંધું, હવે ડાબી બાજુનો અડધો ભાગ પ્રકાશિત અને જમણો ભાગ અંધારામાં દેખાય છે.',
    whereToLookGu: 'મધ્યરાત્રિએ (૧૨ વાગ્યે) ઊગે છે અને બપોર સુધી આકાશમાં જોઈ શકાય છે.'
  },
  {
    id: 'waning-crescent',
    nameGu: 'ઘટતો છેલ્લો બીજનો ચંદ્ર (વદ તેરસ/ચૌદશ)',
    nameEn: 'Waning Crescent',
    tithiGu: 'વદ અગિયારસ થી ચૌદશ',
    pakshaGu: 'વદ (કૃષ્ણ પક્ષ)',
    dayRange: 'દિવસ ૨૩ થી ૨૮',
    cycleDay: 25.8,
    illuminationPercent: 20,
    photoUrl: crescentMoonPhoto,
    shortDescGu: 'સવારના આકાશમાં ડાબી બાજુ દેખાતી પાતળી રૂપેરી કોર.',
    kidExplanationGu: 'અમાસ નજીક આવી ગઈ છે! ચંદ્રનો માત્ર એક નાનકડો પાતળો અંશ ડાબી બાજુ ચમકે છે. પછીના દિવસે અમાસ આવતા તે સાવ અદ્રશ્ય થઈ જશે.',
    whereToLookGu: 'વહેલી સવારે સૂર્યોદય પહેલાં પૂર્વ દિશામાં જોવા મળે છે.'
  }
];
