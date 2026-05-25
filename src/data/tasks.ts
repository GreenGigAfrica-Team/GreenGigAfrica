import wasteIcon from '../assets/images/iconpack/waste collection icon.svg';
import recycleIcon from '../assets/images/iconpack/recycle icon.svg';
import communityIcon from '../assets/images/iconpack/community icon.svg';

export interface Task {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  type: string;
  org: string;
  spotsLeft: number;
  totalSpots: number;
  pay: number;
  icon: string;
  neighborhood: string;
  description: string;
  proofOfWork: string[];
}

const ICON: Record<string, string> = {
  'Waste Collection': wasteIcon,
  'Recycling': recycleIcon,
  'Community Education': communityIcon,
};

const PROOF: Record<string, string[]> = {
  'Waste Collection': [
    'Photo at your task start location — GPS and timestamp captured automatically',
    'Photo during the task — show waste being sorted or collected',
    'Photo at task completion — show the final result of your work',
  ],
  'Recycling': [
    'Photo at your task start location — GPS and timestamp captured automatically',
    'Photo of recyclable materials collected and sorted',
    'Photo at task completion — show the sorted recyclables ready for pickup',
  ],
  'Community Education': [
    'Photo at your task start location — GPS and timestamp captured automatically',
    'Photo during the session — show participants engaging with the content',
    'Photo at task completion — show attendance register or group photo',
  ],
};

export const ALL_TASKS: Task[] = [
  {
    id: 1,
    title: 'Community Waste Collection',
    location: 'Iyana-Ipaja Market, Alimosho LGA',
    date: 'May 8, 2026',
    time: '8:00am – 12:00pm',
    type: 'Waste Collection',
    org: 'LAWMA',
    spotsLeft: 2,
    totalSpots: 10,
    pay: 5000,
    icon: ICON['Waste Collection'],
    neighborhood: 'Iyana-Ipaja',
    description: 'Collect and sort household waste from designated streets in the Iyana-Ipaja area. Separate recyclables from general waste at the collection point. Equipment and gloves will be provided by LAWMA on the day.',
    proofOfWork: PROOF['Waste Collection'],
  },
  {
    id: 2,
    title: 'Public Space Waste Removal',
    location: 'Ayoba, Alimosho LGA',
    date: 'May 13, 2026',
    time: '9:00am – 1:00pm',
    type: 'Waste Collection',
    org: 'LAWMA',
    spotsLeft: 3,
    totalSpots: 8,
    pay: 6200,
    icon: ICON['Waste Collection'],
    neighborhood: 'Ayoba',
    description: 'Clear waste from public spaces and roadside areas in Ayoba. Bag and transport to the nearest LAWMA collection point. Protective gear provided.',
    proofOfWork: PROOF['Waste Collection'],
  },
  {
    id: 3,
    title: 'Community Street Cleanup',
    location: 'Aboru, Alimosho LGA',
    date: 'May 10, 2026',
    time: '8:00am – 11:00am',
    type: 'Waste Collection',
    org: 'LAWMA',
    spotsLeft: 7,
    totalSpots: 15,
    pay: 5500,
    icon: ICON['Waste Collection'],
    neighborhood: 'Iyana-Ipaja',
    description: 'Street cleanup exercise covering key roads in Aboru. Workers will sweep, bag, and clear refuse from streets and drainage channels.',
    proofOfWork: PROOF['Waste Collection'],
  },
  {
    id: 4,
    title: 'Neighborhood Waste Bagging',
    location: 'Egbeda, Alimosho LGA',
    date: 'May 11, 2026',
    time: '7:30am – 10:30am',
    type: 'Waste Collection',
    org: 'LAWMA',
    spotsLeft: 4,
    totalSpots: 10,
    pay: 5800,
    icon: ICON['Waste Collection'],
    neighborhood: 'Egbeda',
    description: 'Door-to-door waste bagging exercise in the Egbeda residential area. Workers will assist residents in properly bagging and labelling waste for pickup.',
    proofOfWork: PROOF['Waste Collection'],
  },
  {
    id: 5,
    title: 'Market Waste Sorting',
    location: 'Alaguntan, Alimosho LGA',
    date: 'May 14, 2026',
    time: '8:00am – 12:00pm',
    type: 'Waste Collection',
    org: 'LAWMA',
    spotsLeft: 4,
    totalSpots: 12,
    pay: 6000,
    icon: ICON['Waste Collection'],
    neighborhood: 'Alagbado',
    description: 'Sort and separate waste at Alaguntan market. Organic, plastic, and general waste will be separated for appropriate disposal and recycling.',
    proofOfWork: PROOF['Waste Collection'],
  },
  {
    id: 6,
    title: 'Neighbourhood Recycling Drive',
    location: 'Aboru Residential Area, Alimosho LGA',
    date: 'May 15, 2026',
    time: '9:00am – 1:00pm',
    type: 'Recycling',
    org: 'RecyclePoints',
    spotsLeft: 3,
    totalSpots: 8,
    pay: 5500,
    icon: ICON['Recycling'],
    neighborhood: 'Iyana-Ipaja',
    description: 'Go door to door collecting recyclable materials (plastics, paper, cans) from residents in the Aboru area. Sorted materials will be weighed and taken to the RecyclePoints depot.',
    proofOfWork: PROOF['Recycling'],
  },
  {
    id: 7,
    title: 'Estate Recycling Collection',
    location: 'Egbeda Housing Estate, Alimosho LGA',
    date: 'May 16, 2026',
    time: '8:00am – 12:00pm',
    type: 'Recycling',
    org: 'RecyclePoints',
    spotsLeft: 5,
    totalSpots: 10,
    pay: 4800,
    icon: ICON['Recycling'],
    neighborhood: 'Egbeda',
    description: 'Collect and sort recyclable waste from Egbeda Housing Estate. Focus on plastics and metals. Materials will be transported to the RecyclePoints facility for processing.',
    proofOfWork: PROOF['Recycling'],
  },
  {
    id: 8,
    title: 'Climate Awareness Outreach',
    location: 'Ikotun Community Centre, Alimosho LGA',
    date: 'May 17, 2026',
    time: '10:00am – 2:00pm',
    type: 'Community Education',
    org: 'GreenWatch',
    spotsLeft: 6,
    totalSpots: 10,
    pay: 4500,
    icon: ICON['Community Education'],
    neighborhood: 'Ikotun',
    description: 'Lead climate awareness sessions for community members at Ikotun Community Centre. Topics include waste management, climate change effects, and sustainable habits. Materials provided.',
    proofOfWork: PROOF['Community Education'],
  },
  {
    id: 9,
    title: 'Waste Management Workshop',
    location: 'Alagbado Town Hall, Alimosho LGA',
    date: 'May 18, 2026',
    time: '9:00am – 12:00pm',
    type: 'Community Education',
    org: 'GreenWatch',
    spotsLeft: 8,
    totalSpots: 12,
    pay: 4200,
    icon: ICON['Community Education'],
    neighborhood: 'Alagbado',
    description: 'Facilitate a waste management workshop at Alagbado Town Hall. Educate residents on proper waste disposal, composting basics, and the importance of recycling.',
    proofOfWork: PROOF['Community Education'],
  },
];
