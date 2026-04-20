import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router";

export default function DrugCard({ drug }) {
  const brandName = drug.openfda?.brand_name?.[0] || "Unknown Brand";
  const genericName = drug.openfda?.generic_name?.[0] || "Generic Unavailable";
  const manufacturer =
    drug.openfda?.manufacturer_name?.[0] || "Unknown Manufacturer";
  const hasWarning = drug.boxed_warning ? true : false;

  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveToCabinet = async () => {
    if (!loading && !currentUser) navigate("/login");
    setIsSaving(true);

    try {
      await addDoc(collection(db, "cabinet"), {
        userId: currentUser.uid,
        brandName,
        genericName,
        manufacturer,
        notes: "",
        savedAt: new Date().toISOString(),
      });
      setSaved(true);
    } catch (error) {
      console.error("Error saving drug:", error);
      alert("Failed to save medication.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative flex flex-col justify-between h-full">
      <div>
        {hasWarning && (
          <span className="absolute top-4 right-4 bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded">
            Warning
          </span>
        )}

        <h3 className="text-xl font-bold text-slate-800 pr-16">{brandName}</h3>
        <p className="text-sm font-medium text-emerald-600 mt-1">
          {genericName}
        </p>
        <p className="text-xs text-slate-500 mt-4">Mfr: {manufacturer}</p>
      </div>

      <button
        onClick={handleSaveToCabinet}
        disabled={isSaving || saved}
        className={`mt-6 w-full font-semibold py-2 rounded-lg transition-colors ${
          saved
            ? "bg-emerald-100 text-emerald-700 cursor-not-allowed"
            : "bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white"
        }`}
      >
        {isSaving
          ? "Saving..."
          : saved
            ? "Saved to Cabinet"
            : "Save to Cabinet"}
      </button>
    </div>
  );
}
