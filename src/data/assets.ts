import smartClassroomImg from '../assets/images/smart_classroom_ict_1792911690664.jpg';
import libraryReadingImg from '../assets/images/school_library_reading_1792911691547.jpg';
import greenCampusImg from '../assets/images/green_campus_valley_1792911692015.jpg';

export const SCHOOL_IMAGES = {
  // Official uploaded photograph of the school building and campus
  hero: "/assets/aistudio/Vibrant_Smart_Campus_in_the_Mountains_848daa73.png",
  actualCampus: "/assets/aistudio/Vibrant_Smart_Campus_in_the_Mountains_848daa73.png",
  // Official uploaded photograph of the Morning Assembly in the Highlands
  morningAssembly: "/assets/aistudio/Mountain_School_Assembly_in_the_Highlands__1__e0e8233f.png",
  // Official uploaded photograph of the Headmaster
  headmaster: "/assets/aistudio/Headmaster_s_Formal_School_Office_Portrait_43a7726c.png",
  // Official uploaded photograph of the Exposure Visit to IIT / ITI Anantnag
  exposureVisitIitAnantnag: "/assets/aistudio/WhatsApp_Image_2026-11-15_at_6.13.03_PM__1__40808ebe.jpeg",
  // Official uploaded photographs of the Agaaz Space & Science Lab
  agaazLab1: "/assets/aistudio/IMG20240423153129_f11261fa.jpg",
  agaazLab2: "/assets/aistudio/WhatsApp_Image_2026-11-18_at_6.08.26_PM_d412d812.jpeg",
  smartClassroom: smartClassroomImg,
  library: libraryReadingImg,
  greenCampus: greenCampusImg,
  valleyScenery: "/assets/aistudio/Vibrant_Smart_Campus_in_the_Mountains_848daa73.png",
};

export const GALLERY_ITEMS = [
  {
    id: "gal-agaaz-1",
    title: "Agaaz Space & Science Lab — Orbital Apparatus & Practical Session",
    category: "Agaaz Lab & STEM",
    image: "/assets/aistudio/IMG20240423153129_f11261fa.jpg",
    caption: "Students and teachers inside the Agaaz Lab (In-charge: Mr. Muzaffer Rasool Malik) exploring Earth-Moon-Sun orbital apparatus, rocket models, globes, and astronomy wall murals."
  },
  {
    id: "gal-agaaz-2",
    title: "Agaaz Lab — Astronomical Telescope & Planetary Instruments",
    category: "Agaaz Lab & STEM",
    image: "/assets/aistudio/WhatsApp_Image_2026-11-18_at_6.08.26_PM_d412d812.jpeg",
    caption: "Hands-on astronomy and science demonstration in the Agaaz Lab featuring the reflector telescope, illuminated Sun-Earth model, ISRO/Satish Dhawan displays, and complete lab instrument kits."
  },
  {
    id: "gal-exposure-iit-anantnag",
    title: "Exposure Visit to IIT / ITI Anantnag (Ashajipora, J&K)",
    category: "Exposure Visits",
    image: "/assets/aistudio/WhatsApp_Image_2026-11-15_at_6.13.03_PM__1__40808ebe.jpeg",
    caption: "Students and faculty members of PM SHRI Govt High School Chowgam during the educational and skill-exposure visit to Industrial Training Institute (IIT / ITI) Anantnag, Ashajipora, J&K."
  },
  {
    id: "gal-assembly",
    title: "Daily Morning Assembly in the Highlands — PM SHRI GHS Chowgam",
    category: "Campus & Landscape",
    image: "/assets/aistudio/Mountain_School_Assembly_in_the_Highlands__1__e0e8233f.png",
    caption: "Authentic view of the morning assembly at PM SHRI Govt High School Chowgam, nestled against the pine-clad Himalayan slopes, with students and teachers gathered for daily prayer, moral assembly, and national anthem."
  },
  {
    id: "gal-official",
    title: "Official Campus & Two-Story Building — PM SHRI GHS Chowgam",
    category: "Campus & Landscape",
    image: SCHOOL_IMAGES.actualCampus,
    caption: "Authentic view of PM SHRI Govt High School Chowgam (Zone Shangus, Dist. Anantnag) featuring the two-story red-brick building, manicured gardens, and mountain backdrop."
  },
  {
    id: "gal-headmaster",
    title: "Office of the Headmaster — Mr. Shareef Ahmad Khan",
    category: "Leadership",
    image: SCHOOL_IMAGES.headmaster,
    caption: "Headmaster Mr. Shareef Ahmad Khan (M.A., B.Ed.) at the institutional desk with official Roll of Honour board."
  },
  {
    id: "gal-1",
    title: "Chowgam School Campus & Scenic Mountain Range",
    category: "Campus & Landscape",
    image: SCHOOL_IMAGES.actualCampus,
    caption: "Authentic photograph of PM SHRI Govt High School Chowgam nestled at the foot of lush pine-clad Himalayan foothills in Zone Shangus."
  },
  {
    id: "gal-2",
    title: "Smart Classroom & ICT Computer Laboratory",
    category: "Digital Learning",
    image: SCHOOL_IMAGES.smartClassroom,
    caption: "Modern interactive smart classroom equipped with digital boards and student computing systems."
  },
  {
    id: "gal-3",
    title: "Dedicated School Library & Reading Space",
    category: "Academics",
    image: SCHOOL_IMAGES.library,
    caption: "Peaceful book sanctuary with literature, reference materials, and quiet reading desks."
  },
  {
    id: "gal-4",
    title: "Green Campus & Plantation Initiative",
    category: "Environment",
    image: SCHOOL_IMAGES.greenCampus,
    caption: "Student Eco-Club campus garden, sapling plantation, and outdoor experiential pathways."
  }
];
