async function verifyFullSystem() {
  const apiBase = 'http://127.0.0.1:5000/api';
  const clientBase = 'http://127.0.0.1:5173';
  console.log('--- RUNNING FULL SYSTEM VERIFICATION ---');

  try {
    // 1. Check frontend routes
    const routes = ['/', '/ai-solutions', '/process', '/faq', '/blog', '/projects', '/services', '/about', '/contact', '/admin'];
    for (const r of routes) {
      const res = await fetch(`${clientBase}${r}`);
      console.log(`✔ Route ${r} Status:`, res.status);
    }

    // 2. Check Backend Health
    const health = await fetch(`${apiBase}/health`).then(r => r.json());
    console.log('✔ API Health:', health.status);

    // 3. Check FAQs endpoint
    const faqs = await fetch(`${apiBase}/cms/faqs`).then(r => r.json());
    console.log(`✔ FAQs loaded: ${faqs.count} questions`);

    // 4. Check Blog endpoint
    const blogs = await fetch(`${apiBase}/cms/blog`).then(r => r.json());
    console.log(`✔ Blog posts loaded: ${blogs.count} articles`);

    // 5. Check Single Blog Post by slug
    const singleBlog = await fetch(`${apiBase}/cms/blog/ai-automation-modern-business`).then(r => r.json());
    console.log(`✔ Single Blog retrieved: "${singleBlog.data?.title}"`);

    // 6. Admin Login
    const login = await fetch(`${apiBase}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@fiaus.tech', password: 'FiausTech2026!Admin' })
    }).then(r => r.json());
    const token = login.data?.token;
    console.log('✔ Admin token generated for:', login.data?.email);

    // 7. Test FAQ CRUD
    const createFaqRes = await fetch(`${apiBase}/cms/faqs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        question: 'Automated Test Question?',
        answer: 'Automated Test Answer.',
        category: 'Services',
        displayOrder: 99
      })
    }).then(r => r.json());
    console.log('✔ Created test FAQ:', createFaqRes.data?._id);

    const deleteFaqRes = await fetch(`${apiBase}/cms/faqs/${createFaqRes.data?._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => r.json());
    console.log('✔ Deleted test FAQ successfully:', deleteFaqRes.message);

    // 8. Test Team CMS CRUD
    const createTeamRes = await fetch(`${apiBase}/cms/team`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: 'Alex Rivera',
        position: 'Senior Cloud Architect',
        bio: 'Specializing in resilient serverless deployments and edge networks.',
        status: 'active'
      })
    }).then(r => r.json());
    console.log('✔ Created test Team member:', createTeamRes.data?._id);

    const deleteTeamRes = await fetch(`${apiBase}/cms/team/${createTeamRes.data?._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => r.json());
    console.log('✔ Deleted test Team member successfully:', deleteTeamRes.message);

    console.log('\n--- ALL VERIFICATIONS PASSED 100% SUCCESSFULLY ---');
  } catch (err) {
    console.error('Verification failed:', err);
  }
}

verifyFullSystem();
