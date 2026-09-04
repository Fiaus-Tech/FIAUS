import mongoose from 'mongoose';
import dns from 'dns';
import TeamMember from '../models/TeamMember.js';
import Project from '../models/Project.js';
import Admin from '../models/Admin.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const uri = 'mongodb+srv://fahadhossain04_db_user:oiLhxa7dwfFzHAPj@cluster0.f06enes.mongodb.net/fiaus_tech?retryWrites=true&w=majority';

async function check() {
  await mongoose.connect(uri);
  console.log('Connected to DB:', mongoose.connection.name);
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));

  const team = await TeamMember.find({});
  console.log('Team members in DB:', team.length);

  const projects = await Project.find({});
  console.log('Projects in DB:', projects.length);

  const admins = await Admin.find({});
  console.log('Admins in DB:', admins.length);

  await mongoose.disconnect();
}

check();

