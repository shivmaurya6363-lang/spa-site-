export interface Spa {
  id: string;
  name: string;
  area: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  email: string;
  description: string;
  rating: number;
  reviewCount: number;
  openingTime: string;
  closingTime: string;
  photos: string[];
  lat: number;
  lng: number;
  priceFrom: number;
  services: SpaService[];
  status: 'pending' | 'active' | 'suspended';
}

export interface SpaService {
  id: string;
  name: string;
  price: number;
  duration: number;
  isActive: boolean;
}

export interface Booking {
  id: string;
  spaId: string;
  spaName: string;
  serviceName: string;
  date: string;
  time: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentType: 'full' | 'token';
}

export const DELHI_NCR_AREAS = [
  "Connaught Place", "Karol Bagh", "Lajpat Nagar", "Saket", "Vasant Kunj",
  "Hauz Khas", "Dwarka", "Rohini", "Pitampura", "Noida Sector 18",
  "Noida Sector 62", "Gurgaon Cyber City", "Gurgaon MG Road", "Faridabad", "Greater Noida"
];

export const SERVICE_TYPES = [
  "Dry Massage", "Oil Massage", "Couple Massage", "Four Hand Massage",
  "Jacuzzi Massage", "Hot Stone Massage", "Potli Massage", "Hammam Massage",
  "Deep Tissue Massage", "Swedish Massage", "Facial", "Body Wrap",
  "Foot Massage", "Head Massage"
];

export const MOCK_SPAS: Spa[] = [
  {
    id: "1",
    name: "Serenity Spa & Wellness",
    area: "Hauz Khas",
    city: "New Delhi",
    address: "B-12, Hauz Khas Village, New Delhi 110016",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    instagram: "@serenityspa_hk",
    email: "info@serenityspa.in",
    description: "Experience tranquility at Serenity Spa, nestled in the heart of Hauz Khas Village. Our expert therapists use premium products and time-tested techniques to rejuvenate your body and mind.",
    rating: 4.8,
    reviewCount: 124,
    openingTime: "11:00",
    closingTime: "22:00",
    photos: [],
    lat: 28.5494,
    lng: 77.2001,
    priceFrom: 1499,
    services: [
      { id: "s1", name: "Swedish Massage", price: 1999, duration: 60, isActive: true },
      { id: "s2", name: "Deep Tissue Massage", price: 2499, duration: 60, isActive: true },
      { id: "s3", name: "Couple Massage", price: 3999, duration: 90, isActive: true },
      { id: "s4", name: "Jacuzzi Massage", price: 2999, duration: 75, isActive: true },
      { id: "s5", name: "Head Massage", price: 799, duration: 30, isActive: true },
      { id: "s6", name: "Foot Massage", price: 999, duration: 45, isActive: true },
    ],
    status: 'active',
  },
  {
    id: "2",
    name: "Royal Thai Spa",
    area: "Connaught Place",
    city: "New Delhi",
    address: "N-34, Connaught Place, New Delhi 110001",
    phone: "+91 98765 12345",
    whatsapp: "+91 98765 12345",
    instagram: "@royalthaispa_cp",
    email: "book@royalthaispa.in",
    description: "Bring the essence of Thailand to Delhi. Our trained Thai therapists deliver authentic massage experiences using traditional herbs and techniques.",
    rating: 4.6,
    reviewCount: 89,
    openingTime: "10:00",
    closingTime: "21:00",
    photos: [],
    lat: 28.6315,
    lng: 77.2167,
    priceFrom: 1299,
    services: [
      { id: "s7", name: "Oil Massage", price: 1499, duration: 60, isActive: true },
      { id: "s8", name: "Hot Stone Massage", price: 2799, duration: 75, isActive: true },
      { id: "s9", name: "Potli Massage", price: 2299, duration: 60, isActive: true },
      { id: "s10", name: "Hammam Massage", price: 3499, duration: 90, isActive: true },
      { id: "s11", name: "Facial", price: 1299, duration: 45, isActive: true },
    ],
    status: 'active',
  },
  {
    id: "3",
    name: "Zen Body Works",
    area: "Saket",
    city: "New Delhi",
    address: "Select Citywalk Mall, Saket, New Delhi 110017",
    phone: "+91 99887 76543",
    whatsapp: "+91 99887 76543",
    instagram: "@zenbodyworks",
    email: "hello@zenbodyworks.in",
    description: "A contemporary urban spa in the heart of Saket. We blend modern wellness science with ancient healing practices for a transformative experience.",
    rating: 4.9,
    reviewCount: 201,
    openingTime: "11:00",
    closingTime: "22:00",
    photos: [],
    lat: 28.5275,
    lng: 77.2190,
    priceFrom: 1799,
    services: [
      { id: "s12", name: "Swedish Massage", price: 2199, duration: 60, isActive: true },
      { id: "s13", name: "Four Hand Massage", price: 4499, duration: 90, isActive: true },
      { id: "s14", name: "Body Wrap", price: 3299, duration: 75, isActive: true },
      { id: "s15", name: "Couple Massage", price: 4999, duration: 90, isActive: true },
      { id: "s16", name: "Dry Massage", price: 1799, duration: 60, isActive: true },
    ],
    status: 'active',
  },
  {
    id: "4",
    name: "Aroma Bliss Spa",
    area: "Gurgaon MG Road",
    city: "Gurgaon",
    address: "DLF Mega Mall, MG Road, Gurgaon 122002",
    phone: "+91 88776 65544",
    whatsapp: "+91 88776 65544",
    instagram: "@aromablissspa",
    email: "care@aromabliss.in",
    description: "Escape into a world of aromatic bliss. Our signature treatments use essential oils sourced from Kerala and Thailand for deep relaxation.",
    rating: 4.5,
    reviewCount: 67,
    openingTime: "10:00",
    closingTime: "21:00",
    photos: [],
    lat: 28.4789,
    lng: 77.0266,
    priceFrom: 1199,
    services: [
      { id: "s17", name: "Oil Massage", price: 1499, duration: 60, isActive: true },
      { id: "s18", name: "Deep Tissue Massage", price: 2199, duration: 60, isActive: true },
      { id: "s19", name: "Head Massage", price: 699, duration: 30, isActive: true },
      { id: "s20", name: "Foot Massage", price: 899, duration: 40, isActive: true },
      { id: "s21", name: "Jacuzzi Massage", price: 2799, duration: 75, isActive: true },
    ],
    status: 'active',
  },
  {
    id: "5",
    name: "Nirvana Wellness Center",
    area: "Noida Sector 18",
    city: "Noida",
    address: "Atta Market, Sector 18, Noida 201301",
    phone: "+91 77665 54433",
    whatsapp: "+91 77665 54433",
    instagram: "@nirvanawellness",
    email: "info@nirvanawellness.in",
    description: "Find your nirvana with our holistic wellness treatments. From therapeutic massages to rejuvenating facials, we've got your self-care covered.",
    rating: 4.7,
    reviewCount: 156,
    openingTime: "10:00",
    closingTime: "22:00",
    photos: [],
    lat: 28.5706,
    lng: 77.3262,
    priceFrom: 999,
    services: [
      { id: "s22", name: "Dry Massage", price: 999, duration: 45, isActive: true },
      { id: "s23", name: "Swedish Massage", price: 1799, duration: 60, isActive: true },
      { id: "s24", name: "Hot Stone Massage", price: 2599, duration: 75, isActive: true },
      { id: "s25", name: "Facial", price: 1199, duration: 45, isActive: true },
      { id: "s26", name: "Couple Massage", price: 3499, duration: 90, isActive: true },
    ],
    status: 'active',
  },
  {
    id: "6",
    name: "The Healing Touch",
    area: "Vasant Kunj",
    city: "New Delhi",
    address: "Ambience Mall, Vasant Kunj, New Delhi 110070",
    phone: "+91 99001 12233",
    whatsapp: "+91 99001 12233",
    instagram: "@healingtouch_vk",
    email: "book@healingtouch.in",
    description: "Premium spa experience with certified therapists. Our signature treatments combine Ayurveda with modern spa techniques.",
    rating: 4.4,
    reviewCount: 45,
    openingTime: "11:00",
    closingTime: "21:00",
    photos: [],
    lat: 28.5200,
    lng: 77.1558,
    priceFrom: 1399,
    services: [
      { id: "s27", name: "Oil Massage", price: 1599, duration: 60, isActive: true },
      { id: "s28", name: "Potli Massage", price: 2099, duration: 60, isActive: true },
      { id: "s29", name: "Body Wrap", price: 2999, duration: 75, isActive: true },
      { id: "s30", name: "Hammam Massage", price: 3199, duration: 90, isActive: true },
    ],
    status: 'active',
  },
];

export const MOCK_REVIEWS = [
  { id: "r1", userName: "Priya S.", rating: 5, comment: "Absolutely amazing experience! The therapists are so skilled and the ambiance is perfect. Will definitely come back.", date: "2024-12-15" },
  { id: "r2", userName: "Rahul M.", rating: 4, comment: "Great massage, very relaxing. The jacuzzi was the highlight. Slightly pricey but worth it.", date: "2024-12-10" },
  { id: "r3", userName: "Ananya K.", rating: 5, comment: "Best spa in Delhi NCR! The couple massage was a wonderful anniversary treat. Highly recommend!", date: "2024-11-28" },
  { id: "r4", userName: "Vikram T.", rating: 4, comment: "Professional service and clean facilities. The deep tissue massage really helped with my back pain.", date: "2024-11-20" },
];
