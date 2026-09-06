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
  FiBox,
  FiX,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";

/* =========================================================
   CATEGORY DATA
========================================================= */

const categories = [
  "Computer",
  "Monitor",
  "Printer",
  "Laptop",
  "Router",
  "Server",
  "UPS",
];

/* =========================================================
   SAMPLE MODEL DATA
========================================================= */

const initialModels = [
  { id: 1, name: "Asus P453UA", category: "Computer", remarks: "-" },
  { id: 2, name: "Asustek Computer Inc.", category: "Computer", remarks: "-" },
  { id: 3, name: "Asus VivoBook 15", category: "Computer", remarks: "-" },
  { id: 4, name: "Asus X409JA", category: "Computer", remarks: "-" },
  { id: 5, name: "Asus X421FA", category: "Computer", remarks: "-" },
  { id: 6, name: "Asus X456UA", category: "Computer", remarks: "-" },
  { id: 7, name: "Asus X510UA", category: "Computer", remarks: "-" },
  { id: 8, name: "Custom", category: "Computer", remarks: "-" },
  { id: 9, name: "Dell Inspiron 15 3567", category: "Computer", remarks: "-" },
  { id: 10, name: "Dell Optiplex 3050", category: "Computer", remarks: "-" },
  { id: 11, name: "Dell Optiplex 3080", category: "Computer", remarks: "-" },
  { id: 12, name: "Dell Vostro 14 3401", category: "Computer", remarks: "-" },
  { id: 13, name: "Dell Vostro 3400", category: "Computer", remarks: "-" },
  { id: 14, name: "Dell Vostro 3468", category: "Computer", remarks: "-" },
  { id: 15, name: "Dell Vostro 3670", category: "Computer", remarks: "-" },

  { id: 16, name: "HP ProDesk 400 G5", category: "Computer", remarks: "-" },
  { id: 17, name: "HP EliteDesk 800 G4", category: "Computer", remarks: "-" },
  { id: 18, name: "HP ProDesk 600 G3", category: "Computer", remarks: "-" },
  { id: 19, name: "Lenovo ThinkCentre M720", category: "Computer", remarks: "-" },
  { id: 20, name: "Lenovo ThinkCentre M710", category: "Computer", remarks: "-" },

  { id: 21, name: "Dell Latitude 5420", category: "Laptop", remarks: "Office laptop" },
  { id: 22, name: "Dell Latitude 3410", category: "Laptop", remarks: "-" },
  { id: 23, name: "HP ProBook 440 G7", category: "Laptop", remarks: "-" },
  { id: 24, name: "Lenovo ThinkPad E14", category: "Laptop", remarks: "-" },

  { id: 25, name: "Asus VA24EHE", category: "Monitor", remarks: "-" },
  { id: 26, name: "BenQ GW2283", category: "Monitor", remarks: "-" },
  { id: 27, name: "DELL E1916HV", category: "Monitor", remarks: "-" },
  { id: 28, name: "HP E221", category: "Monitor", remarks: "-" },
  { id: 29, name: "ViewSonic VA2261", category: "Monitor", remarks: "-" },
  { id: 30, name: "Dell P2219H", category: "Monitor", remarks: "-" },

  { id: 31, name: "Brother HL-L2320D", category: "Printer", remarks: "-" },
  { id: 32, name: "Canon LBP 2900", category: "Printer", remarks: "-" },
  { id: 33, name: "EPSON L3110", category: "Printer", remarks: "-" },
  { id: 34, name: "HP LaserJet Pro M404dn", category: "Printer", remarks: "-" },
  { id: 35, name: "Brother DCP-T420W", category: "Printer", remarks: "-" },

  { id: 36, name: "TP-Link Archer C6", category: "Router", remarks: "-" },
  { id: 37, name: "MikroTik hEX", category: "Router", remarks: "-" },
  { id: 38, name: "Cisco RV340", category: "Router", remarks: "-" },

  { id: 39, name: "Dell PowerEdge R740", category: "Server", remarks: "Rack server" },
  { id: 40, name: "HP ProLiant DL380 G10", category: "Server", remarks: "-" },
  { id: 41, name: "Dell PowerEdge R640", category: "Server", remarks: "-" },

  { id: 42, name: "APC Smart-UPS 1500", category: "UPS", remarks: "-" },
  { id: 43, name: "APC Back-UPS 1100", category: "UPS", remarks: "-" },

  { id: 44, name: "Dell OptiPlex 7080", category: "Computer", remarks: "-" },
  { id: 45, name: "Dell OptiPlex 7090", category: "Computer", remarks: "-" },
  { id: 46, name: "HP ProDesk 800 G6", category: "Computer", remarks: "-" },
  { id: 47, name: "HP EliteDesk 705 G5", category: "Computer", remarks: "-" },
  { id: 48, name: "Lenovo ThinkCentre M920", category: "Computer", remarks: "-" },
  { id: 49, name: "Acer Veriton X2660G", category: "Computer", remarks: "-" },
  { id: 50, name: "Asus ExpertCenter D5", category: "Computer", remarks: "-" },
];

/* =========================================================
   LOCAL STORAGE
========================================================= */

const STORAGE_KEY = "it_inventory_models";

function loadModels() {
  if (typeof window === "undefined") {
    return initialModels;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialModels)
    );

    return initialModels;
  } catch {
    return initialModels;
  }
}

function storeModels(models) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(models)
  );

  window.dispatchEvent(
    new Event("modelsUpdated")
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function ModelsPage() {
  const [models, setModels] = useState(initialModels);

  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState("All Categories");

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(15);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState(null);

  const [deleteModel, setDeleteModel] =
    useState(null);

  const [form, setForm] = useState({
    category: "",
    name: "",
    remarks: "",
  });

  const [error, setError] = useState("");

  /* =======================================================
     LOAD
  ======================================================= */

  useEffect(() => {
    setModels(loadModels());

    const refresh = () => {
      setModels(loadModels());
    };

    window.addEventListener(
      "modelsUpdated",
      refresh
    );

    return () => {
      window.removeEventListener(
        "modelsUpdated",
        refresh
      );
    };
  }, []);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredModels = useMemo(() => {
    const query = search.trim().toLowerCase();

    return models.filter((model) => {
      const categoryMatch =
        category === "All Categories" ||
        model.category === category;

      const searchMatch =
        !query ||
        model.name
          .toLowerCase()
          .includes(query) ||
        model.category
          .toLowerCase()
          .includes(query) ||
        model.remarks
          .toLowerCase()
          .includes(query);

      return categoryMatch && searchMatch;
    });
  }, [models, search, category]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredModels.length / rows
    )
  );

  const safePage = Math.min(
    page,
    totalPages
  );

  const startIndex =
    (safePage - 1) * rows;

  const currentModels =
    filteredModels.slice(
      startIndex,
      startIndex + rows
    );

  useEffect(() => {
    setPage(1);
  }, [search, category, rows]);

  /* =======================================================
     OPEN CREATE MODAL
  ======================================================= */

  const openCreateModal = () => {
    setEditingModel(null);

    setForm({
      category: "",
      name: "",
      remarks: "",
    });

    setError("");
    setModalOpen(true);
  };

  /* =======================================================
     OPEN EDIT MODAL
  ======================================================= */

  const openEditModal = (model) => {
    setEditingModel(model);

    setForm({
      category: model.category,
      name: model.name,
      remarks:
        model.remarks === "-"
          ? ""
          : model.remarks,
    });

    setError("");
    setModalOpen(true);
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    setModalOpen(false);
    setEditingModel(null);
    setError("");
  };

  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  };

  /* =======================================================
     CREATE / UPDATE
  ======================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.category) {
      setError(
        "Please select a category."
      );
      return;
    }

    if (!form.name.trim()) {
      setError(
        "Please enter a model name."
      );
      return;
    }

    let updatedModels;

    if (editingModel) {
      updatedModels = models.map(
        (model) =>
          model.id === editingModel.id
            ? {
                ...model,
                category:
                  form.category,
                name: form.name.trim(),
                remarks:
                  form.remarks.trim() ||
                  "-",
              }
            : model
      );
    } else {
      const newModel = {
        id: Date.now(),
        category: form.category,
        name: form.name.trim(),
        remarks:
          form.remarks.trim() || "-",
      };

      updatedModels = [
        ...models,
        newModel,
      ];
    }

    setModels(updatedModels);
    storeModels(updatedModels);

    closeModal();

    /*
     * Go to last page when creating a new model
     */
    if (!editingModel) {
      setPage(
        Math.ceil(
          updatedModels.length / rows
        )
      );
    }
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const confirmDelete = () => {
    if (!deleteModel) return;

    const updatedModels =
      models.filter(
        (model) =>
          model.id !== deleteModel.id
      );

    setModels(updatedModels);
    storeModels(updatedModels);

    setDeleteModel(null);

    const newTotalPages = Math.max(
      1,
      Math.ceil(
        updatedModels.length / rows
      )
    );

    if (page > newTotalPages) {
      setPage(newTotalPages);
    }
  };

  /* =======================================================
     PAGE BUTTONS
  ======================================================= */

  const pageNumbers = [];

  for (
    let i = 1;
    i <= totalPages;
    i++
  ) {
    if (
      i <= 3 ||
      i === totalPages ||
      Math.abs(i - safePage) <= 1
    ) {
      pageNumbers.push(i);
    }
  }

  const uniquePages = [
    ...new Set(pageNumbers),
  ];

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="min-h-[calc(100vh-49px)] bg-[#f7f9fc] px-3 py-3 sm:px-4 lg:px-5">

      {/* ===================================================
          BREADCRUMB
      =================================================== */}

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
          Models
        </span>

      </div>

      {/* ===================================================
          TABLE CARD
      =================================================== */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="flex flex-col gap-3 border-b border-slate-200 p-3 sm:flex-row sm:items-center">

          {/* CATEGORY */}

          <div className="relative">

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="h-[38px] w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-9 text-[13px] text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-[192px]"
            >
              <option>
                All Categories
              </option>

              {categories.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>

            <FiChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

          </div>

          {/* SEARCH */}

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
              placeholder="Search model or remarks..."
              className="h-[38px] w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-[13px] text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          <div className="flex-1" />

          {/* ADD MODEL */}

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex h-[38px] items-center justify-center gap-2 rounded-md bg-[#ffad1f] px-4 text-[12px] font-bold text-white shadow-sm transition hover:bg-[#f39d08] hover:shadow-md active:scale-[0.98]"
          >
            <FiPlus size={15} />
            Add Model
          </button>

        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[850px] border-collapse">

            <thead>

              <tr className="h-[38px] border-b border-slate-200 bg-[#fafbfc]">

                <th className="w-[55px] px-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  SL
                </th>

                <th className="px-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Model Name
                </th>

                <th className="w-[28%] px-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Category
                </th>

                <th className="w-[30%] px-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Remarks
                </th>

                <th className="w-[85px] px-4 text-right text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {currentModels.map(
                (model, index) => {

                  const serial =
                    startIndex +
                    index +
                    1;

                  return (
                    <tr
                      key={model.id}
                      className="group h-[45px] border-b border-slate-100 transition-all duration-150 hover:bg-[#f8fafc]"
                    >

                      {/* SL */}

                      <td className="px-4 text-[12px] text-slate-500">
                        {serial}
                      </td>

                      {/* MODEL */}

                      <td className="px-4">

                        <div className="flex items-center gap-2">

                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-50 text-slate-400 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                            <FiBox size={14} />
                          </div>

                          <span className="text-[13px] font-semibold text-slate-900 transition group-hover:text-blue-600">
                            {model.name}
                          </span>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td className="px-4">

                        <span className="inline-flex rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-blue-600">
                          {model.category}
                        </span>

                      </td>

                      {/* REMARKS */}

                      <td className="px-4 text-[12px] text-slate-500">
                        {model.remarks ||
                          "-"}
                      </td>

                      {/* ACTIONS */}

                      <td className="px-4">

                        <div className="flex justify-end gap-1">

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                model
                              )
                            }
                            title="Edit Model"
                            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                          >
                            <FiEdit2
                              size={14}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteModel(
                                model
                              )
                            }
                            title="Delete Model"
                            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          >
                            <FiTrash2
                              size={14}
                            />
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                }
              )}

              {/* EMPTY */}

              {currentModels.length ===
                0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-20 text-center"
                  >
                    <div className="flex flex-col items-center">

                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <FiBox
                          size={20}
                        />
                      </div>

                      <p className="text-[13px] font-semibold text-slate-600">
                        No models found
                      </p>

                      <p className="mt-1 text-[12px] text-slate-400">
                        Try changing your search or category.
                      </p>

                    </div>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center">

          <div className="text-[12px] text-slate-600">

            Showing{" "}

            <span className="font-semibold text-slate-800">
              {filteredModels.length
                ? startIndex + 1
                : 0}
            </span>

            {" "}to{" "}

            <span className="font-semibold text-slate-800">
              {Math.min(
                startIndex +
                  currentModels.length,
                filteredModels.length
              )}
            </span>

            {" "}of{" "}

            <span className="font-semibold text-slate-800">
              {filteredModels.length}
            </span>

            {" "}models

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
              className="h-8 rounded-md border border-slate-200 bg-white px-2 text-[12px] text-slate-600 outline-none focus:border-blue-400"
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

          {/* PAGINATION */}

          <div className="flex items-center gap-1">

            <button
              type="button"
              disabled={safePage === 1}
              onClick={() =>
                setPage(
                  safePage - 1
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiChevronLeft
                size={15}
              />
            </button>

            {uniquePages.map(
              (pageNumber, index) => {

                const previous =
                  uniquePages[
                    index - 1
                  ];

                return (
                  <div
                    key={pageNumber}
                    className="flex items-center gap-1"
                  >

                    {previous &&
                      pageNumber -
                        previous >
                        1 && (
                        <span className="px-1 text-[12px] text-slate-400">
                          ...
                        </span>
                      )}

                    <button
                      type="button"
                      onClick={() =>
                        setPage(
                          pageNumber
                        )
                      }
                      className={`flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-[12px] font-medium transition ${
                        safePage ===
                        pageNumber
                          ? "border-[#ffad1f] bg-[#ffad1f] text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {
                        pageNumber
                      }
                    </button>

                  </div>
                );
              }
            )}

            <button
              type="button"
              disabled={
                safePage ===
                totalPages
              }
              onClick={() =>
                setPage(
                  safePage + 1
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiChevronRight
                size={15}
              />
            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          ADD / EDIT MODEL MODAL
      ===================================================== */}

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

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <FiBox
                    size={17}
                  />
                </div>

                <div>

                  <h2 className="text-[15px] font-bold text-[#14213d]">
                    {editingModel
                      ? "Edit Model"
                      : "Create Model"}
                  </h2>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {editingModel
                      ? "Update the hardware model information."
                      : "Add a new hardware model to your inventory."}
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

            {/* FORM */}

            <form onSubmit={handleSubmit}>

              <div className="space-y-5 px-6 py-6">

                {/* ERROR */}

                {error && (
                  <div className="rounded-md border border-red-100 bg-red-50 px-3 py-2.5 text-[12px] font-medium text-red-600">
                    {error}
                  </div>
                )}

                {/* CATEGORY */}

                <div>

                  <label className="mb-1.5 block text-[13px] font-medium text-[#14213d]">
                    Category{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <div className="relative">

                    <select
                      value={
                        form.category
                      }
                      onChange={(e) =>
                        updateForm(
                          "category",
                          e.target.value
                        )
                      }
                      className="h-11 w-full appearance-none rounded-md border border-slate-200 bg-white px-3.5 pr-10 text-[13px] text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">
                        ----------
                      </option>

                      {categories.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                    <FiChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                  </div>

                  <p className="mt-1.5 text-[11px] text-slate-400">
                    The hardware category this model belongs to.
                  </p>

                </div>

                {/* MODEL NAME */}

                <div>

                  <label className="mb-1.5 block text-[13px] font-medium text-[#14213d]">
                    Model Name{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      updateForm(
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="e.g., LaserJet Pro M404n, OptiPlex 7080"
                    className="h-11 w-full rounded-md border border-slate-200 bg-white px-3.5 text-[13px] text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-1.5 text-[11px] text-slate-400">
                    The official model number or name.
                  </p>

                </div>

                {/* REMARKS */}

                <div>

                  <label className="mb-1.5 block text-[13px] font-medium text-[#14213d]">
                    Remarks
                  </label>

                  <textarea
                    value={form.remarks}
                    onChange={(e) =>
                      updateForm(
                        "remarks",
                        e.target.value
                      )
                    }
                    rows={4}
                    placeholder="Enter any optional notes or specifications here..."
                    className="w-full resize-none rounded-md border border-slate-200 bg-white px-3.5 py-3 text-[13px] text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Optional internal notes or specifications about the model.
                  </p>

                </div>

              </div>

              {/* MODAL FOOTER */}

              <div className="flex justify-end gap-3 border-t border-slate-100 bg-[#fcfcfd] px-6 py-4">

                <button
                  type="button"
                  onClick={closeModal}
                  className="h-10 rounded-md border border-slate-200 bg-white px-5 text-[12px] font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
                >
                  Discard Changes
                </button>

                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-[#ffad1f] px-6 text-[12px] font-bold text-white shadow-sm transition hover:bg-[#f39d08] hover:shadow-md active:scale-[0.98]"
                >
                  <FiCheck
                    size={15}
                  />

                  {editingModel
                    ? "Save Changes"
                    : "Create Model"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteModel && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-[1px]"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              setDeleteModel(null);
            }
          }}
        >

          <div className="w-full max-w-[400px] rounded-xl border border-slate-200 bg-white p-6 shadow-2xl">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiTrash2
                size={17}
              />
            </div>

            <h3 className="mt-4 text-[15px] font-bold text-slate-900">
              Delete Model?
            </h3>

            <p className="mt-2 text-[12px] leading-5 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700">
                {deleteModel.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">

              <button
                type="button"
                onClick={() =>
                  setDeleteModel(null)
                }
                className="h-9 rounded-md border border-slate-200 bg-white px-4 text-[12px] font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="h-9 rounded-md bg-red-500 px-4 text-[12px] font-semibold text-white transition hover:bg-red-600"
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