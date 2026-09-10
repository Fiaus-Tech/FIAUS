// Native fetch E2E Audit Script
const API_BASE = process.env.API_BASE || 'http://localhost:5000/api';

async function req(url, options = {}) {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const res = await fetch(fullUrl, {
    ...options,
    headers,
    body: options.body ? (typeof options.body === 'string' ? options.body : JSON.stringify(options.body)) : undefined
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

async function runE2ETests() {
  console.log('========================================================');
  console.log('🚀 RUNNING COMPREHENSIVE FIAUS TECH BACKEND & ADMIN AUDIT TEST');
  console.log('Target API:', API_BASE);
  console.log('========================================================\n');

  let adminToken = '';
  let testTeamId = '';
  let testProjectId = '';
  let testServiceId = '';
  let testFaqId = '';
  let testTestimonialId = '';
  let testBlogId = '';
  let testLeadId = '';

  const results = [];
  const logTest = (name, passed, detail = '') => {
    results.push({ name, passed, detail });
    console.log(`${passed ? '✅ [PASS]' : '❌ [FAIL]'} ${name} ${detail ? `(${detail})` : ''}`);
  };

  // 1. Health Check
  try {
    const healthRes = await req('/health');
    logTest('System Health Check', healthRes.data?.status === 'online', `Agency: ${healthRes.data?.agency}`);
  } catch (err) {
    logTest('System Health Check', false, err.message);
  }

  // 2. Admin Auth Login
  try {
    const loginRes = await req('/auth/login', {
      method: 'POST',
      body: {
        email: process.env.ADMIN_DEFAULT_EMAIL || 'fiaustech@hotmail.com',
        password: process.env.ADMIN_DEFAULT_PASSWORD || 'Fahad14113@#'
      }
    });
    if (loginRes.data?.success && loginRes.data?.data?.token) {
      adminToken = loginRes.data.data.token;
      logTest('Admin Authentication (JWT)', true, `Admin: ${loginRes.data.data.email}`);
    } else {
      logTest('Admin Authentication (JWT)', false, JSON.stringify(loginRes.data));
    }
  } catch (err) {
    logTest('Admin Authentication (JWT)', false, err.message);
  }

  const authHeaders = {
    Authorization: `Bearer ${adminToken}`
  };

  // 3. Website Settings & Dynamic Logo Management
  try {
    const getSettingsRes = await req('/settings');
    const initialLogo = getSettingsRes.data?.data?.logo;
    logTest('Fetch Website Settings', Boolean(getSettingsRes.data?.success), `Current logo: ${initialLogo}`);

    // Update settings with new branding & logo
    const updatedSettings = {
      ...getSettingsRes.data?.data,
      companyName: 'FIAUS Tech Digital Agency',
      email: 'fiaustech@hotmail.com',
      phone: '+966 51 126 9264',
      logo: 'https://res.cloudinary.com/n5yq0whs/image/upload/v1788520752/FIAUS/branding/logo_verified.png',
      logoPublicId: 'FIAUS/branding/logo_verified'
    };

    const putSettingsRes = await req('/settings', {
      method: 'PUT',
      headers: authHeaders,
      body: updatedSettings
    });
    logTest('Update Website Settings & Dynamic Logo', Boolean(putSettingsRes.data?.success), `Saved logo: ${putSettingsRes.data?.data?.logo}`);

    // Verify immediately on public endpoint
    const verifySettingsRes = await req('/settings');
    logTest(
      'Verify Settings & Logo on Public Endpoint',
      verifySettingsRes.data?.data?.logo === 'https://res.cloudinary.com/n5yq0whs/image/upload/v1788520752/FIAUS/branding/logo_verified.png',
      'Immediate public reflection verified'
    );
  } catch (err) {
    logTest('Website Settings & Logo Workflow', false, err.message);
  }

  // 4. Team Members CRUD
  try {
    // CREATE
    const newMember = {
      name: 'Audit Test Engineer',
      nameAr: 'مهندس اختبار النظام',
      position: 'Senior Lead Architect',
      positionAr: 'كبير مهندسي البنية التحتية',
      bio: 'Audited profile for backend update verification.',
      bioAr: 'ملف تعريفي للاختبار والتحقق من التحديثات.',
      photo: 'https://res.cloudinary.com/n5yq0whs/image/upload/v1788520752/FIAUS/team/founder_fahad_hossain.jpg',
      displayOrder: 99,
      status: 'active'
    };
    const createTeamRes = await req('/cms/team', {
      method: 'POST',
      headers: authHeaders,
      body: newMember
    });
    testTeamId = createTeamRes.data?.data?._id;
    logTest('Create Team Member (CMS)', Boolean(createTeamRes.data?.success), `ID: ${testTeamId}`);

    // READ
    const getTeamRes = await req('/cms/team');
    const exists = getTeamRes.data?.data?.some(m => m._id === testTeamId || m.name === 'Audit Test Engineer');
    logTest('Read Team Members (Public & Admin)', exists, `Total members: ${getTeamRes.data?.data?.length}`);

    // UPDATE
    const updateTeamRes = await req(`/cms/team/${testTeamId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: { ...newMember, bio: 'Updated bio verification test', position: 'Principal Architect' }
    });
    logTest('Update Team Member', Boolean(updateTeamRes.data?.success), `New Position: ${updateTeamRes.data?.data?.position}`);

    // DELETE
    const deleteTeamRes = await req(`/cms/team/${testTeamId}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    logTest('Delete Team Member', Boolean(deleteTeamRes.data?.success), 'Cleaned up test member');
  } catch (err) {
    logTest('Team Members CRUD', false, err.message);
  }

  // 5. Projects & Case Studies CRUD
  try {
    const testSlug = `audit-project-${Date.now()}`;
    const newProj = {
      title: 'E2E Audit Project Showcase',
      titleAr: 'مشروع التحقق البرمجي الشامل',
      slug: testSlug,
      category: 'Full-Stack & Cloud',
      categoryAr: 'تطوير متكامل وسحابي',
      shortDescription: 'High performance audited full-stack web project.',
      shortDescriptionAr: 'مشروع ويب متكامل للأداء العالي.',
      fullDescription: 'Comprehensive case study breakdown for the audit verification.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Cloudinary'],
      features: ['Automated CI/CD', 'Real-time sync', 'Multi-tenant'],
      coverImage: 'https://res.cloudinary.com/n5yq0whs/image/upload/v1788520752/FIAUS/projects/showcase1.png',
      status: 'published',
      featured: true
    };

    // CREATE
    const createProjRes = await req('/projects', {
      method: 'POST',
      headers: authHeaders,
      body: newProj
    });
    testProjectId = createProjRes.data?.data?._id;
    logTest('Create Project Showcase', Boolean(createProjRes.data?.success), `ID: ${testProjectId}`);

    // READ (List)
    const getProjRes = await req('/projects');
    const projFound = getProjRes.data?.data?.some(p => p._id === testProjectId || p.slug === testSlug);
    logTest('Read Projects Showcase List', projFound, `Count: ${getProjRes.data?.data?.length}`);

    // READ (By Slug)
    const getSingleProjRes = await req(`/projects/${testSlug}`);
    logTest('Read Project By Slug', Boolean(getSingleProjRes.data?.success), `Slug: ${getSingleProjRes.data?.data?.slug}`);

    // UPDATE
    const updateProjRes = await req(`/projects/${testProjectId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: { ...newProj, title: 'Updated E2E Audit Project Showcase' }
    });
    logTest('Update Project Showcase', Boolean(updateProjRes.data?.success), `Updated title: ${updateProjRes.data?.data?.title}`);

    // DELETE
    const deleteProjRes = await req(`/projects/${testProjectId}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    logTest('Delete Project Showcase', Boolean(deleteProjRes.data?.success), 'Cleaned up test project');
  } catch (err) {
    logTest('Projects Showcase CRUD', false, err.message);
  }

  // 6. Services CRUD
  try {
    const testServiceSlug = `service-audit-${Date.now()}`;
    const newService = {
      title: 'Enterprise AI & Automation Audit Service',
      titleAr: 'خدمة تدقيق الأتمتة والذكاء الاصطناعي',
      slug: testServiceSlug,
      category: 'AI & Machine Learning',
      shortDescription: 'Tailored automated workflow engineering.',
      description: 'Full architecture overview and implementation pipeline.',
      icon: 'Cpu',
      features: ['24/7 Agent SLA', 'Zero Data Leakage'],
      displayOrder: 10,
      active: true
    };

    // CREATE
    const createServiceRes = await req('/services', {
      method: 'POST',
      headers: authHeaders,
      body: newService
    });
    testServiceId = createServiceRes.data?.data?._id;
    logTest('Create Service', Boolean(createServiceRes.data?.success), `ID: ${testServiceId}`);

    // READ
    const getServicesRes = await req('/services');
    const serviceFound = getServicesRes.data?.data?.some(s => s._id === testServiceId || s.slug === testServiceSlug);
    logTest('Read Services List', serviceFound, `Total services: ${getServicesRes.data?.data?.length}`);

    // UPDATE
    const updateServiceRes = await req(`/services/${testServiceId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: { ...newService, title: 'Updated Enterprise AI Audit Service' }
    });
    logTest('Update Service', Boolean(updateServiceRes.data?.success), `Title: ${updateServiceRes.data?.data?.title}`);

    // DELETE
    const deleteServiceRes = await req(`/services/${testServiceId}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    logTest('Delete Service', Boolean(deleteServiceRes.data?.success), 'Cleaned up test service');
  } catch (err) {
    logTest('Services CRUD', false, err.message);
  }

  // 7. FAQs Management (CMS)
  try {
    const newFaq = {
      question: 'How do live database updates propagate to the website?',
      questionAr: 'كيف تنعكس تحديثات قاعدة البيانات فوراً على الموقع؟',
      answer: 'All frontend components query the REST API and reactive SettingsContext with zero caching delays.',
      answerAr: 'تستعلم كافة المكونات عن واجهة برمجة التطبيقات وسياق الإعدادات التفاعلي بدون أي تأخير في التخزين المؤقت.',
      category: 'AI & Automation',
      categoryAr: 'الذكاء الاصطناعي والأتمتة',
      displayOrder: 50,
      active: true
    };

    // CREATE
    const createFaqRes = await req('/cms/faqs', {
      method: 'POST',
      headers: authHeaders,
      body: newFaq
    });
    testFaqId = createFaqRes.data?.data?._id;
    logTest('Create FAQ (CMS)', Boolean(createFaqRes.data?.success), `ID: ${testFaqId}`);

    // READ
    const getFaqsRes = await req('/cms/faqs');
    const faqFound = getFaqsRes.data?.data?.some(f => f._id === testFaqId || f.question.includes('live database updates'));
    logTest('Read FAQs List', faqFound, `Count: ${getFaqsRes.data?.data?.length}`);

    // UPDATE
    const updateFaqRes = await req(`/cms/faqs/${testFaqId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: { ...newFaq, question: 'Updated: How do live database updates propagate?' }
    });
    logTest('Update FAQ', Boolean(updateFaqRes.data?.success), `Question: ${updateFaqRes.data?.data?.question}`);

    // DELETE
    const deleteFaqRes = await req(`/cms/faqs/${testFaqId}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    logTest('Delete FAQ', Boolean(deleteFaqRes.data?.success), 'Cleaned up test FAQ');
  } catch (err) {
    logTest('FAQs Management CRUD', false, err.message);
  }

  // 8. Testimonials Management (CMS)
  try {
    const newTestimonial = {
      clientName: 'Dr. Tariq Al-Mansoor',
      clientNameAr: 'د. طارق المنصور',
      company: 'Al-Mansoor Digital Enterprises',
      position: 'Managing Director',
      positionAr: 'المدير العام',
      content: 'FIAUS Tech built our enterprise automation portal flawlessly with lightning performance.',
      contentAr: 'قامت فياوس تك ببناء منصتنا الرقمية بكفاءة استثنائية وأداء فائق السرعة.',
      rating: 5,
      displayOrder: 1,
      published: true
    };

    // CREATE
    const createTestimonialRes = await req('/cms/testimonials', {
      method: 'POST',
      headers: authHeaders,
      body: newTestimonial
    });
    testTestimonialId = createTestimonialRes.data?.data?._id;
    logTest('Create Testimonial (CMS)', Boolean(createTestimonialRes.data?.success), `ID: ${testTestimonialId}`);

    // READ
    const getTestimonialsRes = await req('/cms/testimonials');
    const testFound = getTestimonialsRes.data?.data?.some(t => t._id === testTestimonialId || t.clientName === 'Dr. Tariq Al-Mansoor');
    logTest('Read Testimonials List', testFound, `Count: ${getTestimonialsRes.data?.data?.length}`);

    // UPDATE
    const updateTestimonialRes = await req(`/cms/testimonials/${testTestimonialId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: { ...newTestimonial, rating: 5, company: 'Al-Mansoor Holdings KSA' }
    });
    logTest('Update Testimonial', Boolean(updateTestimonialRes.data?.success), `Company: ${updateTestimonialRes.data?.data?.company}`);

    // DELETE
    const deleteTestimonialRes = await req(`/cms/testimonials/${testTestimonialId}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    logTest('Delete Testimonial', Boolean(deleteTestimonialRes.data?.success), 'Cleaned up test testimonial');
  } catch (err) {
    logTest('Testimonials CRUD', false, err.message);
  }

  // 9. Blog Articles (CMS)
  try {
    const testBlogSlug = `audit-article-${Date.now()}`;
    const newBlog = {
      title: 'Audited Guide to Modern Cloud Architecture',
      titleAr: 'الدليل الشامل للبنى السحابية الحديثة',
      slug: testBlogSlug,
      category: 'AI & Automation',
      categoryAr: 'الذكاء الاصطناعي والأتمتة',
      tags: ['Cloud', 'Architecture', 'AI'],
      coverImage: 'https://res.cloudinary.com/n5yq0whs/image/upload/v1788520752/FIAUS/projects/showcase1.png',
      excerpt: 'How modern microservices and React scale with zero latency.',
      excerptAr: 'كيف تتوسع التطبيقات الحديثة بدون تأخير في الاستجابة.',
      content: '## Full Technical Architecture\nDetailed content for the audit test.',
      status: 'published',
      readTime: '4 min read'
    };

    // CREATE
    const createBlogRes = await req('/cms/blog', {
      method: 'POST',
      headers: authHeaders,
      body: newBlog
    });
    testBlogId = createBlogRes.data?.data?._id;
    logTest('Create Blog Article (CMS)', Boolean(createBlogRes.data?.success), `ID: ${testBlogId}`);

    // READ
    const getBlogsRes = await req('/cms/blog');
    const blogFound = getBlogsRes.data?.data?.some(b => b._id === testBlogId || b.slug === testBlogSlug);
    logTest('Read Blog Articles List', blogFound, `Count: ${getBlogsRes.data?.data?.length}`);

    // UPDATE
    const updateBlogRes = await req(`/cms/blog/${testBlogId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: { ...newBlog, title: 'Updated: Audited Guide to Modern Cloud Architecture' }
    });
    logTest('Update Blog Article', Boolean(updateBlogRes.data?.success), `Title: ${updateBlogRes.data?.data?.title}`);

    // DELETE
    const deleteBlogRes = await req(`/cms/blog/${testBlogId}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    logTest('Delete Blog Article', Boolean(deleteBlogRes.data?.success), 'Cleaned up test article');
  } catch (err) {
    logTest('Blog Articles CRUD', false, err.message);
  }

  // 10. Leads CRM & Contact Messages
  try {
    const newLead = {
      name: 'Audit Client Inquiry',
      email: 'audit.client@example.com',
      phone: '+966 50 000 0000',
      serviceType: 'AI & Intelligent Automation',
      budgetRange: '$10k - $25k',
      projectDescription: 'Verification inquiry submitted through automated audit suite.'
    };

    // SUBMIT LEAD
    const submitLeadRes = await req('/leads', {
      method: 'POST',
      body: newLead
    });
    testLeadId = submitLeadRes.data?.data?._id;
    logTest('Submit Project Lead (Public)', Boolean(submitLeadRes.data?.success), `ID: ${testLeadId}`);

    // READ LEADS (Admin CRM)
    const getLeadsRes = await req('/leads', {
      headers: authHeaders
    });
    const leadFound = getLeadsRes.data?.data?.some(l => l._id === testLeadId || l.email === 'audit.client@example.com');
    logTest('Read Leads in Admin CRM', leadFound, `Total Leads: ${getLeadsRes.data?.data?.length}`);

    // UPDATE STATUS
    const updateStatusRes = await req(`/leads/${testLeadId}/status`, {
      method: 'PUT',
      headers: authHeaders,
      body: { status: 'qualified', notes: 'Verified by automated audit test suite.' }
    });
    logTest('Update Lead Status (CRM)', Boolean(updateStatusRes.data?.success), `Status: ${updateStatusRes.data?.data?.status}`);

    // DELETE LEAD
    const deleteLeadRes = await req(`/leads/${testLeadId}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    logTest('Delete Test Lead', Boolean(deleteLeadRes.data?.success), 'Cleaned up test lead');
  } catch (err) {
    logTest('Leads CRM Workflow', false, err.message);
  }

  console.log('\n========================================================');
  const passedCount = results.filter(r => r.passed).length;
  console.log(`📊 AUDIT TEST SUITE RESULTS: ${passedCount} / ${results.length} PASSED`);
  console.log('========================================================\n');

  if (results.every(r => r.passed)) {
    console.log('🎉 ALL FIAUS TECH BACKEND & ADMIN UPDATE SYSTEMS ARE 100% OPERATIONAL!');
    process.exit(0);
  } else {
    console.error('⚠️ SOME TESTS FAILED. Please review the output above.');
    process.exit(1);
  }
}

runE2ETests();

