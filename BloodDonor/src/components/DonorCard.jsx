function DonorCard({ donor, isRequestSent, onRequestHelp }) {
  return (
    <>
      <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
        <h3 className="text-slate-800 font-semibold">{donor.name}</h3>
        <p className="mt-1 text-sm text-slate-600">{donor.city}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
            {donor.bloodGroup}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              donor.available
                ? "bg-green-100 text-green-700"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            {donor.available ? "Available" : "Busy"}
          </span>
        </div>
        <button
          onClick={() => onRequestHelp(donor.id)}
          disabled={isRequestSent}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 disabled:bg-green-500 text-white py-2 rounded-lg font-medium transition active:scale-95 disabled:active:scale-100"
        >
          {isRequestSent ? "Request Sent" : "Request Help"}
        </button>
      </div>
    </>
  );
}

export default DonorCard;
