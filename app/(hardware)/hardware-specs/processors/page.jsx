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

const STORAGE_KEY = "it_inventory_processors";

const initialProcessors = [
  { id: 1, name: "Intel(R) Core(TM)2 Duo CPU E4600 @ 2.40GHz", remarks: "-" },
  { id: 2, name: "Intel(R) Core(TM) i3-1005G1 CPU @ 1.20GHz", remarks: "-" },
  { id: 3, name: "Intel(R) Core(TM) i3-10100 CPU @ 3.60GHz", remarks: "-" },
  { id: 4, name: "Intel(R) Core(TM) i3-10105 CPU @ 3.70GHz", remarks: "-" },
  { id: 5, name: "Intel(R) Core(TM) i3-1115G4 CPU @ 3.00GHz", remarks: "-" },
  { id: 6, name: "Intel(R) Core(TM) i3-1335U CPU @ 4.20GHz", remarks: "-" },
  { id: 7, name: "Intel(R) Core(TM) i3-2120 CPU @ 3.30GHz", remarks: "-" },
  { id: 8, name: "Intel(R) Core(TM) i3-4150 CPU @ 3.50GHz", remarks: "-" },
  { id: 9, name: "Intel(R) Core(TM) i3-4160 CPU @ 3.60GHz", remarks: "-" },
  { id: 10, name: "Intel(R) Core(TM) i3-4160U CPU @ 3.60GHz", remarks: "-" },
  { id: 11, name: "Intel(R) Core(TM) i3-5005U CPU @ 2.00GHz", remarks: "-" },
  { id: 12, name: "Intel(R) Core(TM) i3-5010U CPU @ 2.10GHz", remarks: "-" },
  { id: 13, name: "Intel(R) Core(TM) i3-6100 CPU @ 3.70GHz", remarks: "-" },
  { id: 14, name: "Intel(R) Core(TM) i3-6100U CPU @ 2.30GHz", remarks: "-" },
  { id: 15, name: "Intel(R) Core(TM) i3-7020U CPU @ 2.30GHz", remarks: "-" },
  { id: 16, name: "Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz", remarks: "-" },
  { id: 17, name: "Intel(R) Core(TM) i5-10210U CPU @ 1.60GHz", remarks: "-" },
  { id: 18, name: "Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz", remarks: "-" },
  { id: 19, name: "Intel(R) Core(TM) i5-10400 CPU @ 2.90GHz", remarks: "-" },
  { id: 20, name: "Intel(R) Core(TM) i5-11400 CPU @ 2.60GHz", remarks: "-" },
  { id: 21, name: "Intel(R) Core(TM) i5-12400 CPU @ 2.50GHz", remarks: "-" },
  { id: 22, name: "Intel(R) Core(TM) i5-13400 CPU @ 2.50GHz", remarks: "-" },
  { id: 23, name: "Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz", remarks: "-" },
  { id: 24, name: "Intel(R) Core(TM) i7-10510U CPU @ 1.80GHz", remarks: "-" },
  { id: 25, name: "Intel(R) Core(TM) i7-10700 CPU @ 2.90GHz", remarks: "-" },
  { id: 26, name: "Intel(R) Core(TM) i7-1165G7 CPU @ 2.80GHz", remarks: "-" },
  { id: 27, name: "Intel(R) Core(TM) i7-12700 CPU @ 2.10GHz", remarks: "-" },
  { id: 28, name: "Intel(R) Core(TM) i9-12900K CPU @ 3.20GHz", remarks: "-" },
  { id: 29, name: "AMD Ryzen 3 3200G", remarks: "-" },
  { id: 30, name: "AMD Ryzen 5 3500U", remarks: "-" },
  { id: 31, name: "AMD Ryzen 5 5600G", remarks: "-" },
  { id: 32, name: "AMD Ryzen 7 5700G", remarks: "-" },
  { id: 33, name: "AMD Ryzen 7 5800X", remarks: "-" },
  { id: 34, name: "AMD Ryzen 9 5900X", remarks: "-" },
  { id: 35, name: "Intel Pentium Gold G6400", remarks: "-" },
  { id: 36, name: "Intel Celeron N4020", remarks: "-" },
];

function loadData() {
  if (typeof window === "undefined") return initialProcessors;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) return JSON.parse(saved);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialProcessors)
    );

    return initialProcessors;
  } catch {
    return initialProcessors;
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function ProcessorsPage() {
  const [processors, setProcessors] = useState(initialProcessors);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(15);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [deleteItem, setDeleteItem] = useState(null);

  const [form, setForm] = useState({
    name: "",
    remarks: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setProcessors(loadData());
  }, []);

  const filteredProcessors = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return processors;

    return processors.filter(
      (processor) =>
        processor.name.toLowerCase().includes(query) ||
        processor.remarks.toLowerCase().includes(query)
    );
  }, [processors, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProcessors.length / rows)
  );

  const safePage = Math.min(page, totalPages);

  const startIndex = (safePage - 1) * rows;

  const currentProcessors = filteredProcessors.slice(
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

  const openEdit = (processor) => {
    setEditing(processor);

    setForm({
      name: processor.name,
      remarks: processor.remarks === "-" ? "" : processor.remarks,
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
      setError("Please enter a processor name.");
      return;
    }

    let updated;

    if (editing) {
      updated = processors.map((item) =>
        item.id === editing.id
          ? {
              ...item,
              name: form.name.trim(),
              remarks: form.remarks.trim() || "-",
            }
          : item
      );
    } else {
      const newItem = {
        id: Date.now(),
        name: form.name.trim(),
        remarks: form.remarks.trim() || "-",
      };

      updated = [...processors, newItem];
    }

    setProcessors(updated);
    saveData(updated);

    closeModal();
  };

  const confirmDelete = () => {
    if (!deleteItem) return;

    const updated = processors.filter(
      (item) => item.id !== deleteItem.id
    );

    setProcessors(updated);
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

        <span className="text-slate-300">/</span>

        <span className="text-slate-400">
          Hardware Specs
        </span>

        <span className="text-slate-300">/</span>

        <span className="text-[#211d54]">
          Processors
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search processor or remarks..."
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
            Add Processor
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
                  Processor Name
                </th>

                <th className="w-[25%] px-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Remarks
                </th>

                <th className="w-[90px] px-4 text-right text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>
              {currentProcessors.map((processor, index) => (
                <tr
                  key={processor.id}
                  className="group h-[45px] border-b border-slate-100 transition hover:bg-[#f8fafc]"
                >

                  <td className="px-4 text-[12px] text-slate-500">
                    {startIndex + index + 1}
                  </td>

                  <td className="px-4">
                    <div className="flex items-center gap-2">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-50 text-slate-400 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                        <FiCpu size={14} />
                      </div>

                      <span className="text-[13px] font-semibold text-slate-900 transition group-hover:text-blue-600">
                        {processor.name}
                      </span>

                    </div>
                  </td>

                  <td className="px-4 text-[12px] text-slate-500">
                    {processor.remarks}
                  </td>

                  <td className="px-4">
                    <div className="flex justify-end gap-1">

                      <button
                        type="button"
                        onClick={() => openEdit(processor)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                        title="Edit Processor"
                      >
                        <FiEdit2 size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteItem(processor)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                        title="Delete Processor"
                      >
                        <FiTrash2 size={14} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

              {currentProcessors.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-20 text-center text-[13px] text-slate-400"
                  >
                    No processors found.
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
              {filteredProcessors.length
                ? startIndex + 1
                : 0}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-800">
              {Math.min(
                startIndex + currentProcessors.length,
                filteredProcessors.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-800">
              {filteredProcessors.length}
            </span>{" "}
            users
          </div>

          <div className="flex items-center gap-2">

            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Rows:
            </span>

            <select
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="h-8 rounded-md border border-slate-200 bg-white px-2 text-[12px] text-slate-600 outline-none"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>

          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-1">

            <button
              disabled={safePage === 1}
              onClick={() => setPage(safePage - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
            >
              <FiChevronLeft size={15} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            )
              .slice(0, 5)
              .map((number) => (
                <button
                  key={number}
                  onClick={() => setPage(number)}
                  className={`flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-[12px] font-medium transition ${
                    safePage === number
                      ? "border-[#ffad1f] bg-[#ffad1f] text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {number}
                </button>
              ))}

            <button
              disabled={safePage === totalPages}
              onClick={() => setPage(safePage + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
            >
              <FiChevronRight size={15} />
            </button>

          </div>

        </div>
      </div>

      {/* ADD / EDIT MODAL */}

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-[1px]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >

          <div className="w-full max-w-[650px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <FiCpu size={17} />
                </div>

                <div>
                  <h2 className="text-[15px] font-bold text-[#14213d]">
                    {editing ? "Edit Processor" : "Create Processor"}
                  </h2>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {editing
                      ? "Update processor information."
                      : "Add a new processor to your inventory."}
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
                    Processor Name{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g., Intel Core i5-12400 CPU @ 2.50GHz"
                    className="h-11 w-full rounded-md border border-slate-200 px-3.5 text-[13px] outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Enter the official processor name.
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
                        remarks: e.target.value,
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
                  {editing ? "Save Changes" : "Create Processor"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}

      {deleteItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 px-4">

          <div className="w-full max-w-[400px] rounded-xl bg-white p-6 shadow-2xl">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiTrash2 size={17} />
            </div>

            <h3 className="mt-4 text-[15px] font-bold text-slate-900">
              Delete Processor?
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
                onClick={() => setDeleteItem(null)}
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