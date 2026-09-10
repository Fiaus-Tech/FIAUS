import React, { useState, useEffect } from 'react';
import { fetchSettings, updateSettings, uploadFile } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';
import { Settings, Save, CheckCircle2, Globe, Share2, BarChart2, Image, Upload, RotateCcw } from 'lucide-react';

export default function AdminSettingsPage() {
  const { refreshSettings } = useSettings();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetchSettings();
        if (res.success && res.data) {
          setSettings(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const res = await uploadFile(file, 'branding');
      const logoUrl = res?.data?.url || res?.url || (res?.data && typeof res.data === 'string' ? res.data : null);
      const publicId = res?.data?.public_id || '';
      if (logoUrl) {
        setSettings((prev) => ({
          ...prev,
          logo: logoUrl,
          logoPublicId: publicId
        }));
      } else {
        alert('Logo uploaded but no URL was returned');
      }
    } catch (err) {
      alert('Logo upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleResetLogo = () => {
    setSettings((prev) => ({
      ...prev,
      logo: 'https://res.cloudinary.com/n5yq0whs/image/upload/v1789044874/FIAUS/branding/logo.jpg',
      logoPublicId: ''
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await updateSettings(settings);
      await refreshSettings();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      alert('Save failed: ' + (e.response?.data?.message || e.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return <div className="py-12 text-center text-xs text-slate-500">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Website Settings & Integrations
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configure official contact channels, social networks, SEO metadata, and analytics IDs.
          </p>
        </div>

        {success && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Website Branding & Logo Card */}
        <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Image className="w-4 h-4 text-brand-600" />
            <span>Website Branding & Dynamic Logo</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Upload your official agency logo (PNG, JPG, WEBP, or SVG). Updating the logo here immediately reflects across the entire website Header, Footer, and Admin Sidebar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Logo Live Preview */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md ring-1 ring-slate-200 dark:ring-slate-700 bg-white shrink-0 flex items-center justify-center">
                <img
                  src={settings.logo || 'https://res.cloudinary.com/n5yq0whs/image/upload/v1789044874/FIAUS/branding/logo.jpg'}
                  alt="Active Logo Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://res.cloudinary.com/n5yq0whs/image/upload/v1789044874/FIAUS/branding/logo.jpg';
                  }}
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Active Website Logo
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate max-w-xs">
                  {settings.logo || 'https://res.cloudinary.com/n5yq0whs/image/upload/v1789044874/FIAUS/branding/logo.jpg'}
                </span>
                {settings.logo && settings.logo !== 'https://res.cloudinary.com/n5yq0whs/image/upload/v1789044874/FIAUS/branding/logo.jpg' && (
                  <button
                    type="button"
                    onClick={handleResetLogo}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-500 hover:text-red-700 pt-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Default Logo</span>
                  </button>
                )}
              </div>
            </div>

            {/* Logo Upload & Input */}
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 text-xs mb-1.5">
                  Upload New Logo (Cloudinary FIAUS/branding)
                </label>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-brand-600 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 cursor-pointer hover:bg-brand-100 dark:hover:bg-brand-950 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingLogo ? 'Uploading to Cloudinary...' : 'Choose Logo File'}</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      disabled={uploadingLogo}
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  {settings.logoPublicId && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      ID: {settings.logoPublicId}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 text-xs mb-1">
                  Or Direct Logo URL
                </label>
                <input
                  type="text"
                  value={settings.logo || ''}
                  placeholder="https://res.cloudinary.com/..."
                  onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-600" />
            <span>Official Agency Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
              <input
                type="text"
                value={settings.companyName || ''}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Official Email</label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">WhatsApp / Phone</label>
              <input
                type="text"
                value={settings.phone || ''}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Website URL</label>
              <input
                type="text"
                value={settings.websiteUrl || ''}
                onChange={(e) => setSettings({ ...settings, websiteUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
              />
            </div>
          </div>
        </div>

        {/* Social Channels Card */}
        <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Share2 className="w-4 h-4 text-brand-600" />
            <span>Official Social Channel Links</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {Object.entries(settings.socialLinks || {}).map(([network, url]) => (
              <div key={network}>
                <label className="block font-bold capitalize text-slate-700 dark:text-slate-300 mb-1">
                  {network}
                </label>
                <input
                  type="text"
                  value={url || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, [network]: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Integrations */}
        <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-brand-600" />
            <span>Tracking & Analytics Integration IDs</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Google Analytics 4 Measurement ID</label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                value={settings.analytics?.googleAnalyticsId || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    analytics: { ...settings.analytics, googleAnalyticsId: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Meta Pixel ID</label>
              <input
                type="text"
                placeholder="1234567890"
                value={settings.analytics?.metaPixelId || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    analytics: { ...settings.analytics, metaPixelId: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

