function FilterBar({
  bloodGroups,
  selectedBloodGroup,
  onBloodGroupChange,
  cityQuery,
  onCityQueryChange,
  availabilitySort,
  onAvailabilitySortChange,
  donorCount,
}) {
  return (
    <>
      <div className="mt-6 bg-white border border-slate-200 rounded-xl p-4">
        <div>
          <input
            type="text"
            value={cityQuery}
            onChange={(event) => onCityQueryChange(event.target.value)}
            placeholder="Search city"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-200"
          />
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <select
              value={selectedBloodGroup}
              onChange={(event) => onBloodGroupChange(event.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-200"
            >
              <option value="All">All</option>
              {bloodGroups.map((bloodGroup) => (
                <option key={bloodGroup} value={bloodGroup}>
                  {bloodGroup}
                </option>
              ))}
            </select>
            <select
              value={availabilitySort}
              onChange={(event) => onAvailabilitySortChange(event.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-200"
            >
              <option value="available-first">Available First</option>
              <option value="busy-first">Busy First</option>
            </select>
          </div>
          <p className="text-slate-700 font-medium text-sm sm:text-base">
            <span className="text-red-600 font-semibold">{donorCount}</span> donors available
          </p>
        </div>
      </div>
    </>
  );
}

export default FilterBar;
