import React from 'react'
const AdminFeature = ({ title, value, badgeText }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <h2 className="text-black font-semibold text-sm uppercase tracking-wide">{title}</h2>
        <p className="mt-2 text-3xl font-extrabold text-black">{value}</p>
      </div>
      <div className="mt-4">
        <span className="inline-block bg-black text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {badgeText}
        </span>
      </div>
    </div>
  );
};

export default AdminFeature