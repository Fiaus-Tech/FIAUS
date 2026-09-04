import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import dns from 'dns';
import cloudinary from '../config/cloudinary.js';
import TeamMember from '../models/TeamMember.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

dotenv.config({ path: path.resolve('server/.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://fahadhossain04_db_user:oiLhxa7dwfFzHAPj@cluster0.f06enes.mongodb.net/fiaus_tech?retryWrites=true&w=majority';

async function setupTeamAndCloudinary() {
  console.log('=== SETTING UP MONGODB & CLOUDINARY TEAM DATA ===');

  let founderUrl = 'https://res.cloudinary.com/n5yq0whs/image/upload/v1788520752/FIAUS/team/founder_fahad_hossain.jpg';
  let coFounderUrl = 'https://res.cloudinary.com/n5yq0whs/image/upload/v1788520753/FIAUS/team/cofounder_toufiq_hasan_kiron.jpg';
  let directorUrl = 'https://res.cloudinary.com/n5yq0whs/image/upload/v1788520776/FIAUS/team/director_nahid_hassan_bulbul.png';

  const teamMembers = [
    {
      name: 'Fahad Hossain',
      nameAr: 'فهد حسين',
      position: 'Founder & CEO',
      positionAr: 'المؤسس والرئيس التنفيذي',
      bio: 'Professional Full-Stack Web Developer and Technical Architect specializing in modern React, Node.js ecosystems, cloud solutions, and structured digital product delivery.',
      bioAr: 'مطور ويب متكامل ومهندس معماري تقني متخصص في منظومة React و Node.js والحلول السحابية وتطوير المنتجات الرقمية الحديثة.',
      photo: founderUrl,
      socialLinks: {
        portfolio: 'https://fahaddev0.vercel.app/',
        github: 'https://github.com/fahad1420'
      },
      displayOrder: 1,
      status: 'active'
    },
    {
      name: 'Toufiq Hasan Kiron',
      nameAr: 'توفيق حسن كيرون',
      position: 'Co-Founder',
      positionAr: 'الشريك المؤسس',
      bio: 'Frontend-focused Full-Stack Developer specializing in modern JavaScript, TypeScript, React, Next.js web applications, performance engineering, and scalable interface design.',
      bioAr: 'مطور متكامل متخصص في هندسة الواجهات الأمامية الحديثة باستخدام JavaScript و TypeScript و React و Next.js وتحسين الأداء الرقمي.',
      photo: coFounderUrl,
      socialLinks: {
        portfolio: 'https://kiron.dev'
      },
      displayOrder: 2,
      status: 'active'
    },
    {
      name: 'Nahid Hassan Bulbul',
      nameAr: 'ناهد حسن بلبل',
      position: 'Director',
      positionAr: 'المدير',
      bio: 'Professional Full-Stack Developer focused on robust backend architectures, application engineering, system scalability, and client project execution.',
      bioAr: 'مطور متكامل متخصص في البنى التحتية الخلفية وهندسة التطبيقات وقابلية توسع الأنظمة وتنفيذ مشاريع العملاء.',
      photo: directorUrl,
      socialLinks: {
        portfolio: ''
      },
      displayOrder: 3,
      status: 'active'
    }
  ];

  // Update local JSON store
  const dataDir = path.resolve('server/data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, 'team.json'), JSON.stringify(teamMembers, null, 2));
  console.log('✔ Updated server/data/team.json');

  // Connect and sync with MongoDB Atlas
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
    console.log('✔ MongoDB Atlas Connected Successfully!');

    for (const member of teamMembers) {
      await TeamMember.findOneAndUpdate(
        { name: member.name },
        member,
        { upsert: true, new: true }
      );
      console.log(`✔ Synced in MongoDB: ${member.name} (${member.position})`);
    }

    const allMembers = await TeamMember.find({ status: 'active' }).sort({ displayOrder: 1 });
    console.log(`✔ Active Team Members in MongoDB: ${allMembers.length}`);
    allMembers.forEach(m => console.log(`   - [${m.displayOrder}] ${m.name} | ${m.position} | Photo: ${m.photo.substring(0, 50)}...`));

    await mongoose.disconnect();
    console.log('✔ MongoDB disconnected cleanly.');
  } catch (dbErr) {
    console.error('MongoDB Atlas sync error:', dbErr.message);
  }

  console.log('=== SETUP COMPLETED SUCCESSFULLY ===');
}

setupTeamAndCloudinary();
