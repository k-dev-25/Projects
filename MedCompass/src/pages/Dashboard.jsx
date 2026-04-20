import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [cabinetInfo, setCabinetInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [tempNote, setTempNote] = useState("");

  useEffect(() => {
    const fetchCabinet = async () => {
      try {
        const q = query(
          collection(db, "cabinet"),
          where("userId", "==", currentUser.uid),
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const drugs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCabinetInfo(drugs);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching cabinet:", error);
      } finally {
        setLoading(false);
      }
      return () => unsubscribe();
    };

    fetchCabinet();
  }, [currentUser, navigate]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "cabinet", id));
      setCabinetInfo((prev) => prev.filter((drug) => drug.id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleSaveNote = async (id) => {
    try {
      await updateDoc(doc(db, "cabinet", id), { notes: tempNote });
      setCabinetInfo((prev) =>
        prev.map((drug) =>
          drug.id === id ? { ...drug, notes: tempNote } : drug,
        ),
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
        <p className="text-blue-600 animate-pulse">Loading your cabinet...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="pt-10">
          <h1 className="text-3xl font-bold text-slate-800">
            My Medicine Cabinet
          </h1>
          <p className="text-slate-600 mt-2">
            Manage your saved medications and personal notes.
          </p>
        </header>

        {cabinetInfo.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-sm text-center border border-slate-200">
            <p className="text-slate-500 mb-4">Your cabinet is empty.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Search Medications
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cabinetInfo.map((drug) => (
              <div
                key={drug.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-blue-600 border-slate-200 flex flex-col"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {drug.brandName}
                    </h3>
                    <p className="text-sm text-emerald-600 font-medium">
                      {drug.genericName}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(drug.id)}
                    className="text-sm text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-6 grow">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">
                    Personal Notes:
                  </h4>
                  {editingId === drug.id ? (
                    <div className="space-y-2">
                      <textarea
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        rows="3"
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                        placeholder="Add dosage instructions or doctor's notes..."
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSaveNote(drug.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-slate-200 text-slate-700 px-3 py-1 rounded text-sm font-medium hover:bg-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setEditingId(drug.id);
                        setTempNote(drug.notes || "");
                      }}
                      className="p-3 bg-slate-50 rounded-lg border border-dashed border-slate-300 min-h-15 cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                      {drug.notes ? (
                        <p className="text-sm text-slate-700">{drug.notes}</p>
                      ) : (
                        <p className="text-sm text-slate-400 italic">
                          Click to add notes...
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
