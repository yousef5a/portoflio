/**
 * Firestore Seed Script
 * Run this ONCE to populate Firestore with initial experience and education data.
 * 
 * Usage:
 *   node scripts/seed-firestore.mjs
 * 
 * Requirements:
 *   - Your .env.local must have VITE_FIREBASE_* keys set
 *   - npm install dotenv
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { readFileSync } from "fs";

// Read env
const envContent = readFileSync(".env.local", "utf-8");
const env = {};
envContent.split("\n").forEach(line => {
  const [k, v] = line.split("=");
  if (k && v && !k.startsWith("#")) env[k.trim()] = v.trim();
});

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const experienceData = [
  {
    role: "Data Analyst Intern",
    company: "TechMind",
    duration: "Oct 2025 - Feb 2026",
    points: [
      "Performed data cleaning, analysis, and visualization for internal reporting.",
      "Built interactive dashboards in Power BI and Excel.",
      "Generated insights to support business decision-making.",
    ],
  },
];

const educationData = [
  {
    school: "Benha University",
    degree: "Bachelor's degree in Commerce (English Section - Accounting)",
    year: "2025",
    tags: ["English Section", "Specialized in Accounting"],
  },
];

async function seed() {
  console.log("🌱 Seeding Firestore...");
  
  for (const [index, exp] of experienceData.entries()) {
    const id = `exp_${Date.now()}_${index}`;
    await setDoc(doc(db, "experience", id), exp);
    console.log(`✅ Experience added: ${exp.role} @ ${exp.company}`);
  }
  
  for (const [index, edu] of educationData.entries()) {
    const id = `edu_${Date.now()}_${index}`;
    await setDoc(doc(db, "education", id), edu);
    console.log(`✅ Education added: ${edu.school}`);
  }

  console.log("🎉 Seeding complete!");
  process.exit(0);
}

seed().catch(e => {
  console.error("❌ Error seeding:", e);
  process.exit(1);
});
