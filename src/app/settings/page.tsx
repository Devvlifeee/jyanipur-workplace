export default function SettingsPage() {
  return (
    <div className="flex-1 p-8 bg-white max-w-3xl">
      <h1 className="text-xl font-bold text-slate-900 mb-1">Workplace Settings</h1>
      <p className="text-xs text-slate-500 mb-6">Manage your account preferences, notifications, and connected modules across Jyanipur Workplace.</p>
      
      <div className="space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-sm font-bold text-slate-800 mb-1">General Appearance</h2>
          <p className="text-xs text-slate-500 mb-3">Customize your theme and density preferences.</p>
          <select className="bg-slate-100 text-xs text-slate-800 px-3 py-2 rounded-lg border border-slate-200 outline-none">
            <option>Default Light Teak</option>
            <option>Compact View</option>
          </select>
        </div>
      </div>
    </div>
  );
}