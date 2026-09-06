"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiCpu,
  FiX,
  FiCheck,
} from "react-icons/fi";

const STORAGE_KEY = "it_inventory_generations";

const initialGenerations = [
  { id: 1, name: "Intel 10th Gen Core i3", remarks: "-" },
  { id: 2, name: "Intel 10th Gen Core i5", remarks: "-" },
  { id: 3, name: "Intel 10th Gen Core i7", remarks: "-" },
  { id: 4, name: "Intel 11th Gen Core i3", remarks: "-" },
  { id: 5, name: "Intel 11th Gen Core i5", remarks: "-" },
  { id: 6, name: "Intel 11th Gen Core i7", remarks: "-" },
  { id: 7, name: "Intel 12th Gen Core i3", remarks: "-" },
  { id: 8, name: "Intel 12th Gen Core i5", remarks: "-" },
  { id: 9, name: "Intel 12th Gen Core i7", remarks: "-" },
  { id: 10, name: "Intel 13th Gen Core i3", remarks: "-" },
  { id: 11, name: "Intel 13th Gen Core i5", remarks: "-" },
  { id: 12, name: "Intel 13th Gen Core i7", remarks: "-" },
  { id: 13, name: "Intel 14th Gen Core i5", remarks: "-" },
  { id: 14, name: "Intel 2nd Gen Core i3", remarks: "-" },
  { id: 15, name: "Intel 4th Gen Core i3", remarks: "-" },
  { id: 16, name: "Intel 4th Gen Core i5", remarks: "-" },
  { id: 17, name: "Intel 4th Gen Core i7", remarks: "-" },
  { id: 18, name: "Intel 6th Gen Core i3", remarks: "-" },
  { id: 19, name: "Intel 6th Gen Core i5", remarks: "-" },
  { id: 20, name: "Intel 6th Gen Core i7", remarks: "-" },
  { id: 21, name: "Intel 7th Gen Core i3", remarks: "-" },
  { id: 22, name: "Intel 7th Gen Core i5", remarks: "-" },
  { id: 23, name: "Intel 7th Gen Core i7", remarks: "-" },
  { id: 24, name: "Intel 8th Gen Core i3", remarks: "-" },
  { id: 25, name: "Intel 8th Gen Core i5", remarks: "-" },
  { id: 26, name: "Intel 8th Gen Core i7", remarks: "-" },
  { id: 27, name: "Intel 9th Gen Core i3", remarks: "-" },
  { id: 28, name: "Intel 9th Gen Core i5", remarks: "-" },
  { id: 29, name: "Intel 9th Gen Core i7", remarks: "-" },
  { id: 30, name: "AMD Ryzen 3000 Series", remarks: "-" },
  { id: 31, name: "AMD Ryzen 5000 Series", remarks: "-" },
];

function loadData() {
  if (typeof window === "undefined") {
    return initialGenerations;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) return JSON.parse(saved);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialGenerations)
    );

    return initialGenerations;
  } catch {
    return initialGenerations;
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function GenerationsPage() {
  const [generations, setGenerations] =
    useState(initialGenerations);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(15);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [deleteItem, setDeleteItem] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    remarks: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setGenerations(loadData());
  }, []);

  const filteredGenerations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return generations;

    return generations.filter(
      (generation) =>
        generation.name
          .toLowerCase()
          .includes(query) ||
        generation.remarks
          .toLowerCase()
          .includes(query)
    );
  }, [generations, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredGenerations.length / rows
    )
  );

  const safePage = Math.min(
    page,
    totalPages
  );

  const startIndex =
    (safePage - 1) * rows;

  const currentGenerations =
    filteredGenerations.slice(
      startIndex,
      startIndex + rows
    );

  useEffect(() => {
    setPage(1);
  }, [search, rows]);

  const openCreate = () => {
    setEditing(null);

    setForm({
      name: "",
      remarks: "",
    });

    setError("");
    setModalOpen(true);
  };

  const openEdit = (generation) => {
    setEditing(generation);

    setForm({
      name: generation.name,
      remarks:
        generation.remarks === "-"
          ? ""
          : generation.remarks,
    });

    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError(
        "Please enter a generation name."
      );
      return;
    }

    let updated;

    if (editing) {
      updated = generations.map(
        (item) =>
          item.id === editing.id
            ? {
                ...item,
                name: form.name.trim(),
                remarks:
                  form.remarks.trim() ||
                  "-",
              }
            : item
      );
    } else {
      const newItem = {
        id: Date.now(),
        name: form.name.trim(),
        remarks:
          form.remarks.trim() ||
          "-",
      };

      updated = [
        ...generations,
        newItem,
      ];
    }

    setGenerations(updated);
    saveData(updated);

    closeModal();
  };

  const confirmDelete = () => {
    if (!deleteItem) return;

    const updated =
      generations.filter(
        (item) =>
          item.id !== deleteItem.id
      );

    setGenerations(updated);
    saveData(updated);

    setDeleteItem(null);
  };

  return (
    <div className="min-h-[calc(100vh-49px)] bg-[#f7f9fc] px-3 py-3 sm:px-4 lg:px-5">

      {/* BREADCRUMB */}

      <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide">

        <Link
          href="/"
          className="text-slate-400 transition hover:text-[#211d54]"
        >
          Dashboard
        </Link>

        <span className="text-slate-300">
          /
        </span>

        <span className="text-slate-400">
          Hardware Specs
        </span>

        <span className="text-slate-300">
          /
        </span>

        <span className="text-[#211d54]">
          Generations
        </span>

      </div>

      {/* CARD */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        {/* TOOLBAR */}

        <div className="flex flex-col gap-3 border-b border-slate-200 p-3 sm:flex-row sm:items-center">

          <div className="relative w-full sm:w-[260px]">

            <FiSearch
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search generation or remarks..."
              className="h-[38px] w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-[13px] text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          <div className="flex-1" />

          <button
            type="button"
            onClick={openCreate}
            className="inline-flex h-[38px] items-center justify-center gap-2 rounded-md bg-[#ffad1f] px-4 text-[12px] font-bold text-white shadow-sm transition hover:bg-[#f39d08] hover:shadow-md active:scale-[0.98]"
          >
            <FiPlus size={15} />
            Add Generation
          </button>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px] border-collapse">

            <thead>

              <tr className="h-[38px] border-b border-slate-200 bg-[#fafbfc]">

                <th className="w-[65px] px-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  SL
                </th>

                <th className="px-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Generation Name
                </th>

                <th className="w-[30%] px-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Remarks
                </th>

                <th className="w-[90px] px-4 text-right text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {currentGenerations.map(
                (generation, index) => (
                  <tr
                    key={generation.id}
                    className="group h-[45px] border-b border-slate-100 transition hover:bg-[#f8fafc]"
                  >

                    <td className="px-4 text-[12px] text-slate-500">
                      {startIndex +
                        index +
                        1}
                    </td>

                    <td className="px-4">

                      <div className="flex items-center gap-2">

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-50 text-slate-400 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                          <FiCpu
                            size={14}
                          />
                        </div>

                        <span className="text-[13px] font-semibold text-slate-900 transition group-hover:text-blue-600">
                          {
                            generation.name
                          }
                        </span>

                      </div>

                    </td>

                    <td className="px-4 text-[12px] text-slate-500">
                      {
                        generation.remarks
                      }
                    </td>

                    <td className="px-4">

                      <div className="flex justify-end gap-1">

                        <button
                          type="button"
                          onClick={() =>
                            openEdit(
                              generation
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                          title="Edit Generation"
                        >
                          <FiEdit2
                            size={14}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteItem(
                              generation
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          title="Delete Generation"
                        >
                          <FiTrash2
                            size={14}
                          />
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

              {currentGenerations.length ===
                0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-20 text-center text-[13px] text-slate-400"
                  >
                    No generations found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}

        <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center">

          <div className="text-[12px] text-slate-600">

            Showing{" "}

            <span className="font-semibold text-slate-800">
              {filteredGenerations.length
                ? startIndex + 1
                : 0}
            </span>

            {" "}to{" "}

            <span className="font-semibold text-slate-800">
              {Math.min(
                startIndex +
                  currentGenerations.length,
                filteredGenerations.length
              )}
            </span>

            {" "}of{" "}

            <span className="font-semibold text-slate-800">
              {
                filteredGenerations.length
              }
            </span>

            {" "}users

          </div>

          <div className="flex items-center gap-2">

            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Rows:
            </span>

            <select
              value={rows}
              onChange={(e) =>
                setRows(
                  Number(
                    e.target.value
                  )
                )
              }
              className="h-8 rounded-md border border-slate-200 bg-white px-2 text-[12px] text-slate-600 outline-none"
            >
              <option value={10}>
                10
              </option>

              <option value={15}>
                15
              </option>

              <option value={25}>
                25
              </option>

              <option value={50}>
                50
              </option>
            </select>

          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-1">

            <button
              disabled={safePage === 1}
              onClick={() =>
                setPage(
                  safePage - 1
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
            >
              <FiChevronLeft
                size={15}
              />
            </button>

            {Array.from(
              {
                length: totalPages,
              },
              (_, i) => i + 1
            )
              .slice(0, 5)
              .map((number) => (
                <button
                  key={number}
                  onClick={() =>
                    setPage(number)
                  }
                  className={`flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-[12px] font-medium transition ${
                    safePage ===
                    number
                      ? "border-[#ffad1f] bg-[#ffad1f] text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {number}
                </button>
              ))}

            <button
              disabled={
                safePage ===
                totalPages
              }
              onClick={() =>
                setPage(
                  safePage + 1
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
            >
              <FiChevronRight
                size={15}
              />
            </button>

          </div>

        </div>

      </div>

      {/* ADD / EDIT MODAL */}

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-[1px]"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              closeModal();
            }
          }}
        >

          <div className="w-full max-w-[650px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <FiCpu
                    size={17}
                  />
                </div>

                <div>

                  <h2 className="text-[15px] font-bold text-[#14213d]">
                    {editing
                      ? "Edit Generation"
                      : "Create Generation"}
                  </h2>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {editing
                      ? "Update generation information."
                      : "Add a new hardware generation."}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <FiX size={17} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="space-y-5 px-6 py-6">

                {error && (
                  <div className="rounded-md border border-red-100 bg-red-50 px-3 py-2.5 text-[12px] text-red-600">
                    {error}
                  </div>
                )}

                <div>

                  <label className="mb-1.5 block text-[13px] font-medium text-[#14213d]">
                    Generation Name{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g., Intel 14th Gen Core i7"
                    className="h-11 w-full rounded-md border border-slate-200 px-3.5 text-[13px] outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Enter the hardware generation name.
                  </p>

                </div>

                <div>

                  <label className="mb-1.5 block text-[13px] font-medium text-[#14213d]">
                    Remarks
                  </label>

                  <textarea
                    rows={4}
                    value={form.remarks}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        remarks:
                          e.target.value,
                      })
                    }
                    placeholder="Enter any optional notes..."
                    className="w-full resize-none rounded-md border border-slate-200 px-3.5 py-3 text-[13px] outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 bg-[#fcfcfd] px-6 py-4">

                <button
                  type="button"
                  onClick={closeModal}
                  className="h-10 rounded-md border border-slate-200 bg-white px-5 text-[12px] font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Discard Changes
                </button>

                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-[#ffad1f] px-6 text-[12px] font-bold text-white transition hover:bg-[#f39d08]"
                >
                  <FiCheck size={15} />

                  {editing
                    ? "Save Changes"
                    : "Create Generation"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* DELETE */}

      {deleteItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 px-4">

          <div className="w-full max-w-[400px] rounded-xl bg-white p-6 shadow-2xl">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiTrash2 size={17} />
            </div>

            <h3 className="mt-4 text-[15px] font-bold text-slate-900">
              Delete Generation?
            </h3>

            <p className="mt-2 text-[12px] leading-5 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700">
                {deleteItem.name}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-2">

              <button
                onClick={() =>
                  setDeleteItem(null)
                }
                className="h-9 rounded-md border border-slate-200 px-4 text-[12px] font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="h-9 rounded-md bg-red-500 px-4 text-[12px] font-semibold text-white hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}