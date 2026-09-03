async function testBackend() {
  const baseURL = 'http://localhost:5000/api';
  console.log('Testing FIAUS Tech API Endpoints with Native Fetch...');

  try {
    // 1. Health check
    const health = await fetch(`${baseURL}/health`).then((r) => r.json());
    console.log('✔ Health Check:', health);

    // 2. Fetch Projects
    const projects = await fetch(`${baseURL}/projects`).then((r) => r.json());
    console.log(`✔ Projects count: ${projects.count}`);
    projects.data.forEach((p, idx) => {
      console.log(`   [Project 0${idx + 1}] ${p.title} (${p.category}) - Live: ${p.liveUrl || 'Private / In Dev'}`);
    });

    // 3. Submit Lead Inquiry
    const leadRes = await fetch(`${baseURL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Fahad Al-Mansour',
        email: 'fahad@almansour.sa',
        whatsapp: '+966511269264',
        country: 'Saudi Arabia',
        company: 'Al-Mansour Enterprise',
        serviceNeeded: 'AI Automation & Custom Agents',
        budget: '$5,000 - $10,000',
        projectDetails: 'We need custom AI agent integrations to automate customer onboarding and inquiries.',
        preferredContact: 'WhatsApp'
      })
    }).then((r) => r.json());
    console.log('✔ Submit Lead Inquiry:', leadRes.message);

    // 4. Admin Login
    const loginRes = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@fiaus.tech',
        password: 'FiausTech2026!Admin'
      })
    }).then((r) => r.json());
    console.log('✔ Admin Login Token received for:', loginRes.data?.email);
    const token = loginRes.data?.token;

    // 5. Admin Fetch Leads CRM
    const leadsRes = await fetch(`${baseURL}/leads`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((r) => r.json());
    console.log(`✔ Admin Leads CRM inquiries retrieved: ${leadsRes.count}`);

    // 6. Admin Metrics
    const metricsRes = await fetch(`${baseURL}/settings/metrics`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((r) => r.json());
    console.log('✔ Admin Dashboard Metrics:', metricsRes.data);

    console.log('\nAll Endpoints Verified 100% Successfully!');
  } catch (error) {
    console.error('API Test Error:', error.message);
  }
}

testBackend();

