import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 jfrog-sidebar flex-shrink-0">
      <div className="p-4 text-white text-lg font-semibold">JFrog Platform</div>
      <nav className="mt-4 text-sm">
        <a href="#" className="block py-2.5 px-4">All Projects Overview</a>
        <a href="#" className="block py-2.5 px-4">Environments</a>
        <a href="#" className="block py-2.5 px-4">Repositories</a>
        <a href="#" className="block py-2.5 px-4">User Management</a>
        <a href="#" className="block py-2.5 px-4">Authentication</a>
        <a href="#" className="block py-2.5 px-4">Security</a>
        <div className="px-4 mt-2">
          <div className="text-xs uppercase text-slate-400 font-semibold">General Management</div>
          <a href="#" className="block py-2.5 px-4 -mx-4">Settings</a>
          <a href="#" className="block py-2.5 px-4 -mx-4">Webhooks</a>
          <a href="#" className="block py-2.5 px-4 -mx-4 active">Manage Integrations</a>
          <a href="#" className="block py-2.5 px-4 -mx-4">License Buckets</a>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
