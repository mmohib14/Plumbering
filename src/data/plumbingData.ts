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

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "emergency-plumbing",
    slug: "emergency-plumbing",
    title: "24/7 Emergency Plumbing Repair",
    category: "emergency",
    isEmergency: true,
    iconName: "FlameAlert",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Rapid response for burst pipes, flooding, sewer backups, and catastrophic water leaks. 45-minute average arrival time.",
    fullDesc: "Plumbing disasters don't wait for business hours. Our master technicians are equipped with rolling warehouses stocked with emergency parts to isolate leaks, shut off mains, pump out standing water, and perform immediate permanent repairs 24 hours a day, 7 days a week.",
    priceRange: "$150 - $450",
    unit: "diagnostic + immediate repair",
    commonSymptoms: [
      "Water pouring through ceilings or walls",
      "Burst or frozen frozen supply lines",
      "Raw sewage backing up into tubs, showers, or drains",
      "Sudden complete loss of domestic water pressure",
      "Water heater actively leaking or smoking",
      "Continuous toilet overflow that won't stop with shutoff valve"
    ],
    features: [
      "45-Minute Average Emergency Dispatch",
      "Fully Stocked Service Vans with Heavy Duty Equipment",
      "Upfront Flat-Rate Pricing Before Any Work Begins",
      "Emergency Water Extraction & Containment Assistance",
      "Direct Coordination with Homeowners Insurance Adjusters"
    ],
    faqs: [
      {
        question: "What should I do while waiting for your emergency plumber to arrive?",
        answer: "Immediately locate and shut off your home's main water supply valve. If the issue is near electrical outlets or breaker panels, avoid standing water and consider cutting power to that zone. Open an outside hose bibb to relieve residual line pressure."
      },
      {
        question: "Do you charge extra for nights, weekends, or holidays?",
        answer: "We believe in honest, transparent pricing. We provide a guaranteed upfront quote prior to starting any work so you are never surprised by overtime or hidden travel fees."
      }
    ]
  },
  {
    id: "drain-cleaning",
    slug: "drain-cleaning",
    title: "Hydro Jetting & Professional Drain Cleaning",
    category: "drain-sewer",
    isEmergency: true,
    iconName: "Waves",
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    shortDesc: "High-pressure 4,000 PSI hydro jetting and heavy-duty motorized snaking to clear severe clogs, grease, and tree roots.",
    fullDesc: "Store-bought chemical drain openers dissolve pipe lining and rarely fix root causes. We use industrial motorized augers and high-velocity hydro jetting to scrub pipe walls back to their original inner diameter, removing grease sludge, mineral scale, and intrusive tree roots permanently.",
    priceRange: "$129 - $380",
    unit: "per drain clearing",
    commonSymptoms: [
      "Water draining sluggishly in kitchen sinks, bathtubs, or showers",
      "Gurgling sounds coming from other plumbing fixtures when one is draining",
      "Foul sewage or rotten food odors emanating from sink drains",
      "Recurring clogs that return weeks after plunging",
      "Multiple drains backing up at the same time"
    ],
    features: [
      "4,000 PSI Hydro-Jetting Pipe Scouring",
      "High-Definition Video Camera Inspection Included",
      "Non-Corrosive, Environmentally Safe Methods",
      "Tree Root Cutting Heads for Exterior Mainlines",
      "30-Day Clog-Free Guarantee on Cleared Drains"
    ],
    faqs: [
      {
        question: "How is hydro jetting different from regular cable snaking?",
        answer: "A snake punctures a small hole through the blockage to restore flow temporarily, whereas hydro jetting blasts high-pressure water along the entire circumference of the pipe wall, completely removing grease, scale, and hair buildup."
      }
    ]
  },
  {
    id: "water-heater",
    slug: "water-heater-repair-installation",
    title: "Water Heater Repair & Tankless Replacement",
    category: "water-heater",
    isEmergency: false,
    iconName: "Flame",
    imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Fast repairs for standard gas/electric tanks and high-efficiency tankless water heater installations with energy rebates.",
    fullDesc: "From faulty thermostats and blown heating elements to sediment-flushed anode rods and high-efficiency Navien/Rheem tankless upgrades, our certified water heater specialists restore endless hot water quickly with clean installations up to local safety code.",
    priceRange: "$175 - $1,800",
    unit: "repair to full replacement",
    commonSymptoms: [
      "Water coming out lukewarm or freezing cold",
      "Popping, rumbling, or banging noises inside the water heater tank",
      "Rusty, brown, or foul-smelling hot water",
      "Puddles of water pooling around the base of the tank",
      "Pilot light repeatedly blowing out on gas units",
      "Water heater is older than 10 to 12 years"
    ],
    features: [
      "Authorized Dealer for Rheem, Bradford White, Navien, & A.O. Smith",
      "Same-Day Standard Tank Replacements (40, 50, 75 Gallons)",
      "High-Efficiency Endless Hot Water Tankless Conversions",
      "Assistance with Local Utility Rebates & Federal Tax Credits",
      "Expansion Tank & Pressure Relief Valve Code Compliance"
    ],
    faqs: [
      {
        question: "Should I repair or replace my water heater?",
        answer: "If your unit is under 8 years old and the repair cost is under 50% of a new replacement, repair is usually recommended. If it is 10+ years old or the tank body itself is leaking, replacement is the safest and most cost-effective choice."
      }
    ]
  },
  {
    id: "sewer-repair",
    slug: "sewer-line-repair-replacement",
    title: "Sewer Line Camera Inspection & Trenchless Repair",
    category: "drain-sewer",
    isEmergency: true,
    iconName: "Disc",
    imageUrl: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80",
    shortDesc: "High-resolution color sewer camera scoping and no-dig trenchless pipe lining to repair broken, cracked, or root-damaged mains.",
    fullDesc: "Avoid tearing up your driveway, front yard, or landscaping. We feed self-leveling fiber-optic cameras directly through your cleanout to pinpoint cracks, bellies, and joint separations, then use epoxy cured-in-place pipe (CIPP) lining to create a brand new pipe inside your old one.",
    priceRange: "$240 - $3,500",
    unit: "inspection to trenchless relining",
    commonSymptoms: [
      "Persistent wet, soggy patches or sinkholes in your front lawn",
      "Unexplained sewage odor in your yard or basement",
      "Toilets burping and bubbling when washing machine drains",
      "Infestation of fruit flies or drain pests coming up through floor drains",
      "Frequent whole-house sewer line backups"
    ],
    features: [
      "HD Digital Video Recording Provided on USB/Email",
      "No-Dig Trenchless CIPP (Cured-In-Place-Pipe) Relining",
      "Pipe Bursting Technology for Severely Collapsed Lines",
      "Landscape & Driveway Preservation Guarantee",
      "50-Year Structural Lifespan on Trenchless Liners"
    ],
    faqs: [
      {
        question: "What is trenchless sewer repair and how does it save money?",
        answer: "Trenchless repair creates an epoxy-saturated liner inside your existing damaged pipe that cures hard as rock. Because we don't need heavy excavators to dig a continuous trench across your lawn, driveway, and porch, you save thousands in restoration costs."
      }
    ]
  },
  {
    id: "leak-detection",
    slug: "water-leak-detection-slab-leaks",
    title: "Electronic Water Leak & Slab Leak Detection",
    category: "residential",
    isEmergency: true,
    iconName: "SearchCheck",
    imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Non-invasive ultrasonic acoustic listening, thermal imaging, and pressure testing to locate hidden leaks without tearing open walls.",
    fullDesc: "Undetected pinhole leaks under concrete foundation slabs or inside drywall cause catastrophic structural rot and toxic mold. Our technicians utilize precision acoustic ground microphones and infrared thermal scanners to pinpoint leaks to the exact inch without destructive demolition.",
    priceRange: "$195 - $550",
    unit: "complete diagnostic & location",
    commonSymptoms: [
      "Water meter spinner moving when all faucets and appliances are turned off",
      "Unexplained spikes on your monthly water bill",
      "Warm spots under carpet, hardwood, or tile flooring",
      "Damp drywall, peeling paint, or moldy baseboards",
      "Sound of running water behind walls or under floors"
    ],
    features: [
      "Non-Destructive Ultrasonic Acoustic Leak Locating",
      "Infrared FLIR Thermal Imaging Scanners",
      "Direct Foundation Slab Penetration or Overhead Bypass Options",
      "Insurance Documentation & Detailed Diagnostic Report",
      "Moisture Level Meter Readings & Containment Advice"
    ],
    faqs: [
      {
        question: "What is a slab leak and why is it dangerous?",
        answer: "A slab leak occurs when copper water pipes running underneath your home's concrete foundation develop pinhole corrosion or cracks. If left unrepaired, water erodes supporting soil, leading to foundation settling, cracked flooring, and extensive water damage."
      }
    ]
  },
  {
    id: "commercial-plumbing",
    slug: "commercial-plumbing-contractor",
    title: "Commercial Plumbing & Grease Traps",
    category: "commercial",
    isEmergency: false,
    iconName: "Building2",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Full-scale plumbing solutions for restaurants, retail, offices, and multi-family complexes. Code compliance, backflow certification, and rapid repairs.",
    fullDesc: "Plumbing downtime costs your business money every hour. Our dedicated commercial division handles grease interceptor maintenance, commercial boiler systems, flushometer repairs, ADA-compliant fixture installations, and preventive maintenance agreements designed to keep operations compliant.",
    priceRange: "$225 - $1,500+",
    unit: "commercial service calls & contracts",
    commonSymptoms: [
      "Grease trap overflowing or emitting offensive dining room odors",
      "Multiple customer restroom stalls out of order",
      "Annual municipal backflow test notice due",
      "Low water pressure affecting commercial dishwashers or sanitizers",
      "Tenant water shutoff emergency in multi-unit properties"
    ],
    features: [
      "Priority Commercial Dispatch & Dedicated Account Representative",
      "Certified Backflow Prevention Assembly Testing (RPZ & DCVA)",
      "Commercial Grease Trap Pumping & High-Heat Jetting",
      "Preventive Maintenance Service Agreements (Quarterly / Biannual)",
      "OSHA Compliant, Certified & Insured Commercial Technicians"
    ],
    faqs: [
      {
        question: "Do you offer after-hours work for restaurants and retail stores?",
        answer: "Yes! We frequently perform water shutdowns, line cleanings, and fixture replacements during off-hours or overnight to ensure zero disruption to your paying customers."
      }
    ]
  },
  {
    id: "repiping",
    slug: "pipe-repair-whole-house-repiping",
    title: "Pipe Repair & Whole-House Repiping",
    category: "residential",
    isEmergency: false,
    iconName: "Wrench",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Replace aging, corroded galvanized iron or polybutylene pipes with durable, corrosion-proof Uponor PEX-a or Type-L copper.",
    fullDesc: "If your home was built before the late 1990s, your plumbing may be suffering from internal corrosion, pinhole leaks, and restricted flow. Our whole-house repiping teams replace defective piping with flexible PEX-a in as little as 1 to 2 days with minimal drywall intrusion.",
    priceRange: "$1,800 - $6,500",
    unit: "partial repair to whole-home repiping",
    commonSymptoms: [
      "Low water pressure when multiple faucets or showers run",
      "Rusty, discolored water appearing when faucets first turn on",
      "Recurring pinhole leaks in different sections of your plumbing",
      "Presence of old Polybutylene or Galvanized Iron pipes",
      "Metallic taste in drinking water"
    ],
    features: [
      "Uponor ProPEX Expansion Technology (25-Year Manufacturer Warranty)",
      "Surgical Wall Openings with Professional Drywall Patching Available",
      "Water Turned Back On at the End of Every Workday",
      "Increased Domestic Water Pressure & Clean Water Guarantee",
      "Fully Permitted & Inspected by Local Municipalities"
    ],
    faqs: [
      {
        question: "How long does a whole-house repipe take?",
        answer: "Most single-family homes (up to 3 bathrooms) are repiped in 1 to 3 days. We ensure your domestic water is turned back on each evening so your family never has to leave home."
      }
    ]
  },
  {
    id: "fixture-repair",
    slug: "toilet-faucet-garbage-disposal",
    title: "Toilet, Faucet & Garbage Disposal Repair",
    category: "residential",
    isEmergency: false,
    iconName: "Droplet",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Prompt repair and installation for running toilets, dripping faucets, jammed garbage disposals, and shower valves.",
    fullDesc: "A running toilet or leaking faucet wastes up to 3,000 gallons of clean water every year. We install and rebuild top brands including Kohler, Moen, Delta, TOTO, and InSinkErator, resolving leaks, weak flushes, and irritating rattles.",
    priceRange: "$95 - $285",
    unit: "per fixture repair or install",
    commonSymptoms: [
      "Toilet running continuously after flushing, wasting water",
      "Faucet dripping or leaking from under sink base cabinet",
      "Garbage disposal humming without spinning, or leaking below motor",
      "Shower valve fluctuating suddenly from scalding to freezing",
      "Low water flow from aerators or showerheads"
    ],
    features: [
      "Genuine OEM Replacement Cartridges, Flappers & Fill Valves",
      "Quiet 3/4 HP & 1 HP InSinkErator Garbage Disposal Installs",
      "Water-Sense High Efficiency Toilet Upgrades",
      "Pressure Regulating Valve (PRV) Calibration",
      "Fixed Upfront Pricing per Fixture"
    ],
    faqs: [
      {
        question: "Can you install fixtures that I already purchased myself?",
        answer: "Yes! We are happy to professionally install homeowner-provided sinks, faucets, toilets, and disposals, ensuring they are mounted securely and tested for leaks."
      }
    ]
  }
];

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
