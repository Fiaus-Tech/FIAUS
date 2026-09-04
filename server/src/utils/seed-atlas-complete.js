import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dns from 'dns';
import Admin from '../models/Admin.js';
import TeamMember from '../models/TeamMember.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const MONGODB_URI = 'mongodb+srv://fahadhossain04_db_user:oiLhxa7dwfFzHAPj@cluster0.f06enes.mongodb.net/fiaus_tech?retryWrites=true&w=majority';

async function seedAtlas() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
  console.log('MongoDB Atlas Connected.');

  // 1. Sync Admin User
  const adminEmail = 'fiaustech@hotmail.com';
  const adminPassword = 'Fahad14113@#';

  let admin = await Admin.findOne({ email: adminEmail });
  if (admin) {
    admin.password = adminPassword; // pre-save hook will hash it
    await admin.save();
    console.log(`✓ Admin user ${adminEmail} password updated.`);
  } else {
    admin = await Admin.create({
      name: 'FIAUS Tech Super Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'super_admin'
    });
    console.log(`✓ Admin user ${adminEmail} created.`);
  }

  // Also remove old default admin if present
  await Admin.deleteMany({ email: 'admin@fiaus.tech' });

  // 2. Sync 3 Team Members
  const teamData = [
    {
      name: 'Fahad Hossain',
      nameAr: 'فهد حسين',
      position: 'Founder & CEO',
      positionAr: 'المؤسس والرئيس التنفيذي',
      bio: 'Professional Full-Stack Web Developer and Technical Architect specializing in modern React, Node.js ecosystems, cloud solutions, and structured digital product delivery.',
      bioAr: 'مطور ويب متكامل ومهندس معماري تقني متخصص في منظومة React و Node.js والحلول السحابية وتطوير المنتجات الرقمية الحديثة.',
      photo: 'https://res.cloudinary.com/n5yq0whs/image/upload/v1788520752/FIAUS/team/founder_fahad_hossain.jpg',
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
      photo: 'https://res.cloudinary.com/n5yq0whs/image/upload/v1788520753/FIAUS/team/cofounder_toufiq_hasan_kiron.jpg',
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
      photo: 'https://res.cloudinary.com/n5yq0whs/image/upload/v1788520776/FIAUS/team/director_nahid_hassan_bulbul.png',
      socialLinks: {
        portfolio: ''
      },
      displayOrder: 3,
      status: 'active'
    }
  ];

  await TeamMember.deleteMany({});
  for (const m of teamData) {
    await TeamMember.create(m);
    console.log(`✓ Team member inserted: ${m.name} (${m.position})`);
  }

  const all = await TeamMember.find({ status: 'active' }).sort({ displayOrder: 1 });
  console.log(`Total active team members in Atlas: ${all.length}`);

  await mongoose.disconnect();
  console.log('Seed completed cleanly.');
}

seedAtlas().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});

