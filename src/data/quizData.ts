import { QuizQuestion } from '../types/solar';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionGu: 'સૂર્યમંડળનો સૌથી મોટો ગ્રહ કયો છે, જેની અંદર ૧,૩૦૦ પૃથ્વીઓ સમાઈ શકે?',
    questionEn: 'Which is the largest planet in the solar system?',
    options: [
      { id: 'a', textGu: 'મંગળ (Mars)', textEn: 'Mars' },
      { id: 'b', textGu: 'ગુરુ (Jupiter)', textEn: 'Jupiter' },
      { id: 'c', textGu: 'શનિ (Saturn)', textEn: 'Saturn' },
      { id: 'd', textGu: 'શુક્ર (Venus)', textEn: 'Venus' }
    ],
    correctAnswerId: 'b',
    funFactGu: 'શાબાશ! ગુરુ ગ્રહ એટલો વિશાળ છે કે બધા ગ્રહો ભેગા કરો તોય તેના કરતાં મોટો છે. તેના પર લાલ વાવાઝોડું પણ છે!',
    relatedPlanetId: 'jupiter'
  },
  {
    id: 2,
    questionGu: 'કયા ગ્રહને સુંદર બરફ અને પથ્થરોના વલયો (રિંગ્સ) આવેલા છે?',
    questionEn: 'Which planet is famous for its beautiful rings?',
    options: [
      { id: 'a', textGu: 'બુધ (Mercury)', textEn: 'Mercury' },
      { id: 'b', textGu: 'પૃથ્વી (Earth)', textEn: 'Earth' },
      { id: 'c', textGu: 'શનિ (Saturn)', textEn: 'Saturn' },
      { id: 'd', textGu: 'મંગળ (Mars)', textEn: 'Mars' }
    ],
    correctAnswerId: 'c',
    funFactGu: 'ખૂબ સરસ! શનિના વલયો (રિંગ્સ) અંતરીક્ષમાં સૌથી સુંદર દેખાય છે અને શનિ પાણીમાં પણ તરી શકે એટલો હળવો છે!',
    relatedPlanetId: 'saturn'
  },
  {
    id: 3,
    questionGu: 'મંગળ ગ્રહ કેમ "લાલ ગ્રહ" (Red Planet) તરીકે ઓળખાય છે?',
    questionEn: 'Why is Mars called the Red Planet?',
    options: [
      { id: 'a', textGu: 'તેના પર લાલ રંગની આગ લાગેલી છે', textEn: 'It is covered in red fire' },
      { id: 'b', textGu: 'તેની માટીમાં લોખંડનો કાટ (Iron Oxide) છે', textEn: 'Its soil is rich in iron rust' },
      { id: 'c', textGu: 'તે સૂર્યની સૌથી નજીક છે', textEn: 'It is closest to the Sun' },
      { id: 'd', textGu: 'તે લાલ કાચનો બનેલો છે', textEn: 'It is made of red glass' }
    ],
    correctAnswerId: 'b',
    funFactGu: 'સાચો જવાબ! મંગળની સપાટી પર કાટવાળી માટી હોવાથી તે લાલ દેખાય છે. ભારતનું મંગળયાન પણ અહીં પહોંચ્યું હતું!',
    relatedPlanetId: 'mars'
  },
  {
    id: 4,
    questionGu: 'જો પૃથ્વી પર તમારું વજન ૩૦ કિલો હોય, તો કયા ગ્રહ પર તમારું વજન સૌથી વધારે (લગભગ ૭૬ કિલો) થઈ જશે?',
    questionEn: 'On which planet would your weight be heaviest due to strong gravity?',
    options: [
      { id: 'a', textGu: 'બુધ (Mercury)', textEn: 'Mercury' },
      { id: 'b', textGu: 'ગુરુ (Jupiter)', textEn: 'Jupiter' },
      { id: 'c', textGu: 'પ્લુટો (Pluto)', textEn: 'Pluto' },
      { id: 'd', textGu: 'યુરેનસ (Uranus)', textEn: 'Uranus' }
    ],
    correctAnswerId: 'b',
    funFactGu: 'એકદમ સાચું! ગુરુનું ગુરુત્વાકર્ષણ પ્રચંડ છે, તેથી ત્યાં તમારું વજન પૃથ્વી કરતાં અઢી ગણું વધી જાય!',
    relatedPlanetId: 'jupiter'
  },
  {
    id: 5,
    questionGu: 'આપણી પૃથ્વી સૂર્યથી કેટલા અંતરે (કિલોમીટર) આવેલી છે?',
    questionEn: 'How far is Earth from the Sun?',
    options: [
      { id: 'a', textGu: 'આશરે ૧૫ કરોડ કિલોમીટર', textEn: 'About 15 Crore km' },
      { id: 'b', textGu: 'માત્ર ૧ લાખ કિલોમીટર', textEn: 'Only 1 Lakh km' },
      { id: 'c', textGu: '૭૦ કરોડ કિલોમીટર', textEn: '70 Crore km' },
      { id: 'd', textGu: '૫ કરોડ કિલોમીટર', textEn: '5 Crore km' }
    ],
    correctAnswerId: 'a',
    funFactGu: 'ઉત્તમ! પૃથ્વી સૂર્યથી લગભગ ૧૪.૯૬ કરોડ કિમી (૧૫ કરોડ કિમી) દૂર છે, અને સૂર્યના કિરણોને અહીં પહોંચતા ૮ મિનિટ ૨૦ સેકન્ડ લાગે છે.',
    relatedPlanetId: 'earth'
  },
  {
    id: 6,
    questionGu: 'સૂર્યમંડળનો કયો ગ્રહ સૌથી ગરમ (Hot) છે, જેને સવારનો કે સાંજનો તારો પણ કહેવાય છે?',
    questionEn: 'Which is the hottest planet in the solar system?',
    options: [
      { id: 'a', textGu: 'શનિ (Saturn)', textEn: 'Saturn' },
      { id: 'b', textGu: 'નેપ્ચ્યુન (Neptune)', textEn: 'Neptune' },
      { id: 'c', textGu: 'શુક્ર (Venus)', textEn: 'Venus' },
      { id: 'd', textGu: 'મંગળ (Mars)', textEn: 'Mars' }
    ],
    correctAnswerId: 'c',
    funFactGu: 'અદ્ભુત! શુક્ર ગ્રહના જાડા વાદળો ગરમીને પકડી રાખે છે, જેથી તેનું તાપમાન ૪૬૫ ડિગ્રી સેલ્સિયસ સુધી પહોંચી જાય છે!',
    relatedPlanetId: 'venus'
  },
  {
    id: 7,
    questionGu: 'કયો ગ્રહ પોતાની ધરી પર આડો સૂઈને (૯૮ ડિગ્રી નમીને) ગબડતો ગબડતો સૂર્યની પરિક્રમા કરે છે?',
    questionEn: 'Which tilted planet rolls on its side around the Sun?',
    options: [
      { id: 'a', textGu: 'યુરેનસ (Uranus)', textEn: 'Uranus' },
      { id: 'b', textGu: 'બુધ (Mercury)', textEn: 'Mercury' },
      { id: 'c', textGu: 'પૃથ્વી (Earth)', textEn: 'Earth' },
      { id: 'd', textGu: 'ગુરુ (Jupiter)', textEn: 'Jupiter' }
    ],
    correctAnswerId: 'a',
    funFactGu: 'સાચું! યુરેનસ આડો નમીને ગબડે છે અને તે સૂર્યમંડળનો સૌથી ઠંડો ગ્રહ (-૨૨૪°C) પણ ગણાય છે!',
    relatedPlanetId: 'uranus'
  },
  {
    id: 8,
    questionGu: 'સૂર્યની સૌથી નજીકનો અને સૌથી ઝડપી દોડતો (માત્ર ૮૮ દિવસમાં વર્ષ પૂરું કરતો) ગ્રહ કયો છે?',
    questionEn: 'Which planet is closest to the Sun and has the fastest orbit?',
    options: [
      { id: 'a', textGu: 'નેપ્ચ્યુન (Neptune)', textEn: 'Neptune' },
      { id: 'b', textGu: 'બુધ (Mercury)', textEn: 'Mercury' },
      { id: 'c', textGu: 'મંગળ (Mars)', textEn: 'Mars' },
      { id: 'd', textGu: 'શુક્ર (Venus)', textEn: 'Venus' }
    ],
    correctAnswerId: 'b',
    funFactGu: 'ખૂબ સરસ! બુધ સૂર્યનો સૌથી નજીકનો પડોશી છે અને માત્ર ૮૮ દિવસમાં જ સૂર્યની આખી પ્રદક્ષિણા કરી લે છે!',
    relatedPlanetId: 'mercury'
  }
];
