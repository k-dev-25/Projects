import Header from "../components/Header.jsx";
import FilterBar from "../components/FilterBar.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import EmptyState from "../components/EmptyState.jsx";
import DonorList from "../components/DonorList.jsx";
import useDonor from "../hooks/useDonor.js";
import { bloodGroups } from "../utils/generateBloodGroup.js";

function Home() {
  const {
    loading,
    selectedBloodGroup,
    setSelectedBloodGroup,
    cityQuery,
    setCityQuery,
    availabilitySort,
    setAvailabilitySort,
    filteredDonors,
    availableDonorCount,
    requestStatusByDonor,
    markRequestSent,
  } = useDonor();

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Header />
          <FilterBar
            bloodGroups={bloodGroups}
            selectedBloodGroup={selectedBloodGroup}
            onBloodGroupChange={setSelectedBloodGroup}
            cityQuery={cityQuery}
            onCityQueryChange={setCityQuery}
            availabilitySort={availabilitySort}
            onAvailabilitySortChange={setAvailabilitySort}
            donorCount={availableDonorCount}
          />
          {loading ? (
            <LoadingSpinner />
          ) : filteredDonors.length === 0 ? (
            <EmptyState />
          ) : (
            <DonorList
              donors={filteredDonors}
              requestStatusByDonor={requestStatusByDonor}
              onRequestHelp={markRequestSent}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
