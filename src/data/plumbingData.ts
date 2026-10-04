import servicesJson from './services.json';
import { ServiceItem, ReviewItem, BlogPost, ServiceArea, BookingRequest } from '../types';

export const COMPANY_INFO = {
  name: "USA Pro Plumbing & Rooter Services",
  brandShort: "USA Pro Plumbing",
  license: "Master Plumber Lic #MP-849204",
  insurance: "Fully Licensed, Bonded & $2M Insured",
  phone: "(800) 555-7473",
  phoneRaw: "8005557473",
  localPhone: "(214) 555-0199",
  email: "dispatch@usaproplumbing.com",
  hqAddress: "1200 Industrial Parkway, Suite 400, Dallas, TX 75201",
  establishedYear: 2008,
  googleRating: 4.9,
  totalReviewsCount: 684,
  jobsCompleted: "14,800+",
  activeTechnicians: 18,
  averageResponseMins: 42,
  guarantee: "100% Satisfaction Guarantee & 1-Year Parts & Labor Warranty",
  emergencyAvailability: "24/7/365 - Including Holidays & Weekends"
};

export const SERVICES_DATA: ServiceItem[] = servicesJson as ServiceItem[];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Marcus Vance",
    location: "Dallas, TX",
    rating: 5,
    date: "2 days ago",
    serviceType: "24/7 Emergency Plumbing Repair",
    review: "Had a massive supply line burst under our master bath vanity at 11:30 PM on a Sunday. Water was gushing through the baseboards. USA Pro Plumbing had technician Derek at our front door in 38 minutes. He shut down the main, replaced the failed section, and tested everything before 1:00 AM. Incredible lifesavers!",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "rev-2",
    author: "Jennifer Holloway",
    location: "Austin, TX",
    rating: 5,
    date: "1 week ago",
    serviceType: "Water Heater Replacement",
    review: "Our 12-year-old water heater started leaking from the bottom seam. Called USA Pro at 8:00 AM, had a clear flat quote by 9:15 AM, and by 2:00 PM we had a brand-new Navien tankless system installed. The plumber even swept the utility closet spotlessly. True professionals.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "rev-3",
    author: "Robert Chen",
    location: "Houston, TX",
    rating: 5,
    date: "2 weeks ago",
    serviceType: "Hydro Jetting & Sewer Line",
    review: "Two other local plumbing companies told me I needed to dig up my entire paved driveway for $9,000 because of root blockages. USA Pro came out, ran a high-def camera, and cleared the root intrusion cleanly with 4,000 PSI hydro jetting for a fraction of that cost. Highly honest company.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "rev-4",
    author: "Angela Ramirez",
    location: "Phoenix, AZ",
    rating: 5,
    date: "3 weeks ago",
    serviceType: "Electronic Slab Leak Detection",
    review: "Noticed warm tile in the hallway and our water bill jumped $200. The technician brought acoustic listening gear and located the copper pinhole leak within 2 inches under the slab without breaking our floor. The bypass repair was flawless. Five stars all day.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "rev-5",
    author: "David Sterling",
    location: "Atlanta, GA",
    rating: 5,
    date: "1 month ago",
    serviceType: "Commercial Plumbing & Backflow",
    review: "Manage 3 casual dining restaurants in the metro area. USA Pro handles all our quarterly grease trap jetting and annual backflow certifications. Their technicians show up on time during 6:00 AM prep shifts and never leave a mess. Outstanding commercial partner.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
  }
];

export const SERVICE_AREAS_DATA: ServiceArea[] = [
  {
    id: "tx-dfw",
    city: "Dallas - Fort Worth Metro",
    state: "TX",
    metroArea: "Greater DFW, Arlington, Plano, Frisco, Irving",
    zipCodes: ["75201", "75202", "75001", "75024", "76011", "76102", "75080", "75093"],
    activeHub: true,
    techniciansAvailable: 8,
    averageResponseMinutes: 38,
    phone: "(214) 555-0199",
    hubAddress: "1200 Industrial Pkwy, Dallas, TX 75201"
  },
  {
    id: "tx-austin",
    city: "Austin & Central Texas",
    state: "TX",
    metroArea: "Austin, Round Rock, Cedar Park, Buda, Kyle",
    zipCodes: ["78701", "78702", "78704", "78745", "78664", "78613", "78759"],
    activeHub: true,
    techniciansAvailable: 5,
    averageResponseMinutes: 42,
    phone: "(512) 555-0188",
    hubAddress: "400 W Cesar Chavez, Austin, TX 78701"
  },
  {
    id: "tx-houston",
    city: "Houston Metropolitan",
    state: "TX",
    metroArea: "Houston, The Woodlands, Sugar Land, Katy, Pearland",
    zipCodes: ["77002", "77008", "77019", "77024", "77380", "77478", "77494"],
    activeHub: true,
    techniciansAvailable: 6,
    averageResponseMinutes: 45,
    phone: "(713) 555-0177",
    hubAddress: "2200 Post Oak Blvd, Houston, TX 77056"
  },
  {
    id: "az-phoenix",
    city: "Phoenix Valley & Scottsdale",
    state: "AZ",
    metroArea: "Phoenix, Scottsdale, Mesa, Chandler, Gilbert, Glendale",
    zipCodes: ["85001", "85004", "85251", "85281", "85201", "85224", "85301"],
    activeHub: true,
    techniciansAvailable: 5,
    averageResponseMinutes: 40,
    phone: "(602) 555-0166",
    hubAddress: "100 E Washington St, Phoenix, AZ 85004"
  },
  {
    id: "co-denver",
    city: "Denver & Front Range",
    state: "CO",
    metroArea: "Denver, Aurora, Lakewood, Centennial, Boulder",
    zipCodes: ["80202", "80205", "80014", "80226", "80112", "80301", "80210"],
    activeHub: true,
    techniciansAvailable: 4,
    averageResponseMinutes: 44,
    phone: "(303) 555-0155",
    hubAddress: "1700 Lincoln St, Denver, CO 80203"
  },
  {
    id: "ga-atlanta",
    city: "Metro Atlanta",
    state: "GA",
    metroArea: "Atlanta, Marietta, Alpharetta, Roswell, Sandy Springs",
    zipCodes: ["30303", "30309", "30062", "30004", "30075", "30328", "30318"],
    activeHub: true,
    techniciansAvailable: 5,
    averageResponseMinutes: 41,
    phone: "(404) 555-0144",
    hubAddress: "3344 Peachtree Rd NE, Atlanta, GA 30326"
  },
  {
    id: "fl-orlando-tampa",
    city: "Central Florida (Orlando & Tampa)",
    state: "FL",
    metroArea: "Orlando, Tampa, St. Petersburg, Winter Park, Clearwater",
    zipCodes: ["32801", "32819", "33602", "33701", "32789", "33607", "32803"],
    activeHub: true,
    techniciansAvailable: 4,
    averageResponseMinutes: 43,
    phone: "(407) 555-0133",
    hubAddress: "200 S Orange Ave, Orlando, FL 32801"
  },
  {
    id: "nc-charlotte",
    city: "Charlotte Metro",
    state: "NC",
    metroArea: "Charlotte, Huntersville, Matthews, Concord, Rock Hill",
    zipCodes: ["28202", "28209", "28078", "28105", "28025", "28277", "28211"],
    activeHub: true,
    techniciansAvailable: 4,
    averageResponseMinutes: 46,
    phone: "(704) 555-0122",
    hubAddress: "500 S Tryon St, Charlotte, NC 28202"
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: "blog-1",
    slug: "how-to-shut-off-main-water-valve-emergency",
    title: "How to Locate and Shut Off Your Home's Main Water Valve in an Emergency",
    category: "Emergency Plumbing",
    readTime: "4 min read",
    date: "September 18, 2026",
    author: {
      name: "Jack Callahan",
      role: "Master Plumber & Technical Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    excerpt: "Every homeowner should know where their main water shutoff is located before a catastrophic pipe burst occurs. Here is a step-by-step visual guide.",
    content: [
      "In a major plumbing emergency — such as a split frozen pipe, a failed washing machine hose, or an uncontrollable toilet overflow — the single most important action you can take to prevent tens of thousands in structural water damage is shutting down the domestic water main immediately.",
      "Where is the main shutoff valve located in typical American homes? In warmer southern climates (Texas, Florida, Arizona), the valve is usually located outside near an exterior hose bibb or inside an in-ground utility box near the curb. In northern states, it is almost always in the basement or crawlspace along the front foundation wall where the municipal pipe enters.",
      "Gate Valves vs. Ball Valves: Older homes have brass gate valves with round wheel handles that require several clockwise rotations to seal. Newer homes have brass ball valves with a straight lever handle. Simply rotate the lever 90 degrees perpendicular to the pipe until it stops.",
      "Pro Tip: Once the main valve is shut off, walk to the lowest sink or garden hose bibb and open the faucet fully. This relieves residual line pressure and drains remaining water harmlessly out of the plumbing system."
    ],
    coverImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    tags: ["Emergency", "Water Valve", "DIY Safety", "Home Maintenance"]
  },
  {
    id: "blog-2",
    slug: "repair-or-replace-water-heater-guide",
    title: "Repair or Replace: How to Decide on Your Aging Water Heater",
    category: "Water Heaters",
    readTime: "6 min read",
    date: "September 10, 2026",
    author: {
      name: "Marcus Vance",
      role: "Senior Water Systems Specialist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
    },
    excerpt: "Learn the 5 critical warning signs that tell you when a quick fix makes sense versus when investing in a high-efficiency replacement saves thousands in energy bills.",
    content: [
      "The average lifespan of a traditional storage tank water heater is 8 to 12 years. If your unit is making popping noises, taking longer to heat water, or showing corrosion at the fittings, you are probably asking yourself whether to repair or replace.",
      "The 50% Rule: A trusted plumbing industry rule of thumb is the 50% rule. If your water heater is more than 8 years old and the estimated repair quote exceeds 50% of the cost of a new replacement unit, replacing it is almost always the smarter financial investment.",
      "Warning Signs of Tank Failure: If water is weeping or actively pooling around the base of the tank cylinder itself, the inner glass lining has cracked due to thermal expansion. This cannot be patched or welded; the tank must be replaced immediately before a catastrophic flood occurs.",
      "The Tankless Advantage: Modern tankless water heaters (such as Navien or Rheem) offer a 20+ year expected lifespan, 30% reduction in gas consumption, and endless hot water that never runs cold during back-to-back family showers."
    ],
    coverImage: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80",
    tags: ["Water Heater", "Tankless", "Energy Savings", "Cost Guide"]
  },
  {
    id: "blog-3",
    slug: "why-chemical-drain-cleaners-damage-pipes",
    title: "Why Chemical Drain Cleaners Ruin Your Pipes (And What to Do Instead)",
    category: "Drain Cleaning",
    readTime: "5 min read",
    date: "August 28, 2026",
    author: {
      name: "Jack Callahan",
      role: "Master Plumber & Technical Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    excerpt: "Caustic supermarket drain cleaners eat through pipe adhesives, warp PVC, and generate hazardous fumes. Here is what professional plumbers use instead.",
    content: [
      "When a bathroom or kitchen sink starts backing up, many homeowners reflexively reach for a $10 bottle of sulfuric acid or lye drain cleaner. While it may dissolve some hair temporarily, chemical drain cleaners cause severe damage to modern plumbing infrastructure.",
      "Exothermic Chemical Heat: Liquid drain openers work by generating violent heat (up to 200°F) via chemical reaction. This extreme heat softens thin-walled PVC pipes, breaks glue welds at P-traps, and accelerates galvanic corrosion in older cast iron or galvanized lines.",
      "What To Do Instead: First, try a standard cup-style plunger on flat drains or an accordion plunger on toilets. Second, remove and manually inspect the sink P-trap under the cabinet with a bucket beneath. If the clog is deeper down the waste arm, motorized mechanical snaking or hydro jetting safely removes the blockage without corrosive chemicals."
    ],
    coverImage: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    tags: ["Drain Cleaning", "Plumbing Tips", "Clogged Sink", "DIY Prevention"]
  }
];

export const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: "USA-9182",
    createdAt: "2026-09-23 09:15 AM",
    customerName: "Eleanor Bennett",
    phone: "(214) 555-8392",
    email: "eleanor.b@gmail.com",
    address: "4821 Lakewood Blvd",
    city: "Dallas",
    state: "TX",
    zip: "75214",
    propertyType: "residential",
    serviceId: "emergency-plumbing",
    serviceName: "24/7 Emergency Plumbing Repair",
    urgency: "emergency",
    preferredDate: "Today (Immediate)",
    preferredTimeSlot: "Next Available (Emergency)",
    description: "Water pipe cracked behind laundry wall, water shut off at main. Need immediate pipe replacement and wall inspection.",
    status: "dispatched",
    assignedTechnician: "Derek Morris (Tech #104)",
    estimatedCost: "$350 - $480",
    notes: "Tech en route, ETA 18 mins. Homeowner advised to keep main closed."
  },
  {
    id: "USA-9183",
    createdAt: "2026-09-23 08:30 AM",
    customerName: "The Rustic Table Bistro (Mgr: Jason)",
    phone: "(512) 555-4921",
    email: "kitchen@rustictablebistro.com",
    address: "1402 S Congress Ave",
    city: "Austin",
    state: "TX",
    zip: "78704",
    propertyType: "commercial",
    serviceId: "commercial-plumbing",
    serviceName: "Commercial Plumbing & Grease Traps",
    urgency: "same_day",
    preferredDate: "Today",
    preferredTimeSlot: "11:00 AM - 1:00 PM",
    description: "Prep sink drain backing up during morning shift. Need commercial hydro-jetting before lunch rush.",
    status: "in_progress",
    assignedTechnician: "Carlos Mendez (Tech #112)",
    estimatedCost: "$425",
    notes: "Commercial van #3 dispatched. Heavy grease cutter head prepared."
  },
  {
    id: "USA-9184",
    createdAt: "2026-09-22 04:45 PM",
    customerName: "Thomas Wright",
    phone: "(713) 555-1944",
    email: "twright82@yahoo.com",
    address: "812 Heights Blvd",
    city: "Houston",
    state: "TX",
    zip: "77007",
    propertyType: "residential",
    serviceId: "water-heater",
    serviceName: "Water Heater Repair & Tankless Replacement",
    urgency: "next_day",
    preferredDate: "Tomorrow",
    preferredTimeSlot: "Morning (8:00 AM - 12:00 PM)",
    description: "50 Gallon Bradford White heater not staying lit, pilot blows out every few hours.",
    status: "new",
    assignedTechnician: "Unassigned",
    estimatedCost: "$180 - $260",
    notes: "Needs thermocouple or gas control valve replacement."
  }
];

export const COST_ESTIMATOR_BENCHMARKS = [
  {
    category: "Drain Cleaning & Clogs",
    options: [
      { id: "sink-clog", name: "Single Sink or Tub Drain Clearing", min: 110, max: 195, time: "45 - 60 min" },
      { id: "main-sewer-cable", name: "Main Line Cable Snaking (Rooter)", min: 185, max: 320, time: "1 - 2 hours" },
      { id: "hydro-jetting", name: "High-Pressure Hydro Jetting (Whole Line)", min: 380, max: 680, time: "2 - 3 hours" },
      { id: "camera-inspection", name: "HD Video Camera Pipe Inspection", min: 175, max: 275, time: "1 hour" }
    ]
  },
  {
    category: "Water Heaters",
    options: [
      { id: "wh-diagnostic-tuneup", name: "Water Heater Diagnostic & Element Repair", min: 140, max: 280, time: "1 - 2 hours" },
      { id: "wh-standard-replace", name: "Standard 40/50 Gallon Tank Replacement", min: 1100, max: 1850, time: "3 - 4 hours" },
      { id: "wh-tankless-convert", name: "High-Efficiency Tankless Conversion", min: 2400, max: 4200, time: "1 day" }
    ]
  },
  {
    category: "Water Leaks & Slab",
    options: [
      { id: "leak-detection-acoustic", name: "Ultrasonic / Thermal Leak Detection", min: 195, max: 395, time: "1 - 2 hours" },
      { id: "slab-leak-direct-repair", name: "Concrete Slab Pinhole Pipe Repair", min: 850, max: 1900, time: "4 - 8 hours" },
      { id: "pipe-burst-emergency", name: "Emergency Burst Pipe Isolation & Patch", min: 220, max: 450, time: "1 - 2 hours" }
    ]
  },
  {
    category: "Fixtures & Restrooms",
    options: [
      { id: "toilet-rebuild", name: "Toilet Rebuild (Flapper, Fill Valve, Wax Ring)", min: 125, max: 210, time: "1 hour" },
      { id: "toilet-install-new", name: "New Toilet Installation & Haul Away", min: 175, max: 295, time: "1.5 hours" },
      { id: "faucet-repair", name: "Kitchen / Bathroom Faucet Cartridge Repair", min: 115, max: 195, time: "1 hour" },
      { id: "garbage-disposal-new", name: "Garbage Disposal Installation (3/4 HP)", min: 220, max: 380, time: "1.5 hours" }
    ]
  }
];
