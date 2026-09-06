"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  FiHome,
  FiChevronRight,
  FiChevronLeft,
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiCheck,
  FiBox,
  FiMonitor,
  FiPrinter,
  FiCpu,
  FiHardDrive,
  FiWifi,
  FiServer,
} from "react-icons/fi";

/* =========================================================
   CATEGORY DATA
========================================================= */

const categories = [
  {
    name: "Computer",
    icon: FiCpu,
  },
  {
    name: "Monitor",
    icon: FiMonitor,
  },
  {
    name: "Printer",
    icon: FiPrinter,
  },
  {
    name: "Laptop",
    icon: FiHardDrive,
  },
  {
    name: "Router",
    icon: FiWifi,
  },
  {
    name: "Server",
    icon: FiServer,
  },
];

/* =========================================================
   INITIAL BRAND DATA
========================================================= */

const initialBrands = [
  {
    id: 1,
    name: "Asus",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 2,
    name: "Custom",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 3,
    name: "Dell",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 4,
    name: "HP",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 5,
    name: "HPE",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 6,
    name: "Lenovo",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 7,
    name: "Asus",
    category: "Monitor",
    remarks: "-",
  },
  {
    id: 8,
    name: "BenQ",
    category: "Monitor",
    remarks: "-",
  },
  {
    id: 9,
    name: "DELL",
    category: "Monitor",
    remarks: "-",
  },
  {
    id: 10,
    name: "HP",
    category: "Monitor",
    remarks: "-",
  },
  {
    id: 11,
    name: "ViewSonic",
    category: "Monitor",
    remarks: "-",
  },
  {
    id: 12,
    name: "Brother",
    category: "Printer",
    remarks: "-",
  },
  {
    id: 13,
    name: "Canon",
    category: "Printer",
    remarks: "-",
  },
  {
    id: 14,
    name: "EPSON",
    category: "Printer",
    remarks: "-",
  },
  {
    id: 15,
    name: "HP",
    category: "Printer",
    remarks: "-",
  },
  {
    id: 16,
    name: "Lenovo",
    category: "Laptop",
    remarks: "-",
  },
  {
    id: 17,
    name: "Acer",
    category: "Laptop",
    remarks: "Office laptops",
  },
  {
    id: 18,
    name: "MSI",
    category: "Laptop",
    remarks: "Performance laptops",
  },
  {
    id: 19,
    name: "TP-Link",
    category: "Router",
    remarks: "-",
  },
  {
    id: 20,
    name: "Cisco",
    category: "Router",
    remarks: "Network equipment",
  },
  {
    id: 21,
    name: "MikroTik",
    category: "Router",
    remarks: "-",
  },
  {
    id: 22,
    name: "Dell EMC",
    category: "Server",
    remarks: "Server hardware",
  },
  {
    id: 23,
    name: "HPE",
    category: "Server",
    remarks: "-",
  },
  {
    id: 24,
    name: "Lenovo ThinkSystem",
    category: "Server",
    remarks: "-",
  },
];

/* =========================================================
   CATEGORY BADGE
========================================================= */

function CategoryBadge({ category }) {
  const categoryInfo = categories.find(
    (item) => item.name === category
  );

  const Icon =
    categoryInfo?.icon || FiBox;

  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-md
        border
        border-blue-100
        bg-blue-50
        px-2.5
        py-1
        text-[10px]
        font-semibold
        text-blue-600
        transition-all
        duration-150
        group-hover:border-blue-200
        group-hover:bg-blue-100
      "
    >
      <Icon size={11} />
      {category}
    </span>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function BrandsPage() {
  const [brands, setBrands] =
    useState(initialBrands);

  const [categoryFilter, setCategoryFilter] =
    useState("All Categories");

  const [search, setSearch] =
    useState("");

  const [rowsPerPage, setRowsPerPage] =
    useState(15);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [showModal, setShowModal] =
    useState(false);

  const [editingBrand, setEditingBrand] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    remarks: "",
  });

  /* =======================================================
     FILTER DATA
  ======================================================= */

  const filteredBrands = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return brands.filter((brand) => {
      const matchesCategory =
        categoryFilter ===
          "All Categories" ||
        brand.category ===
          categoryFilter;

      const matchesSearch =
        !query ||
        brand.name
          .toLowerCase()
          .includes(query) ||
        brand.category
          .toLowerCase()
          .includes(query) ||
        brand.remarks
          .toLowerCase()
          .includes(query);

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    brands,
    categoryFilter,
    search,
  ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredBrands.length /
        rowsPerPage
    )
  );

  const safePage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safePage - 1) *
    rowsPerPage;

  const endIndex = Math.min(
    startIndex + rowsPerPage,
    filteredBrands.length
  );

  const visibleBrands =
    filteredBrands.slice(
      startIndex,
      endIndex
    );

  /* =======================================================
     FORM
  ======================================================= */

  const updateForm = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /* =======================================================
     ADD BRAND
  ======================================================= */

  const openAddBrand = () => {
    setEditingBrand(null);

    setForm({
      name: "",
      category: "",
      remarks: "",
    });

    setShowModal(true);
  };

  /* =======================================================
     EDIT BRAND
  ======================================================= */

  const openEditBrand = (
    brand
  ) => {
    setEditingBrand(brand);

    setForm({
      name: brand.name,
      category: brand.category,
      remarks:
        brand.remarks === "-"
          ? ""
          : brand.remarks,
    });

    setShowModal(true);
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingBrand(null);

    setForm({
      name: "",
      category: "",
      remarks: "",
    });
  };

  /* =======================================================
     SAVE BRAND
  ======================================================= */

  const saveBrand = () => {
    if (
      !form.name.trim() ||
      !form.category
    ) {
      return;
    }

    if (editingBrand) {
      setBrands((current) =>
        current.map((brand) =>
          brand.id ===
          editingBrand.id
            ? {
                ...brand,
                name: form.name.trim(),
                category:
                  form.category,
                remarks:
                  form.remarks.trim() ||
                  "-",
              }
            : brand
        )
      );
    } else {
      const newBrand = {
        id:
          Date.now(),
        name:
          form.name.trim(),
        category:
          form.category,
        remarks:
          form.remarks.trim() ||
          "-",
      };

      setBrands((current) => [
        ...current,
        newBrand,
      ]);
    }

    closeModal();
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const deleteBrand = (
    brand
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${brand.name}" from ${brand.category}?`
      );

    if (!confirmed) {
      return;
    }

    setBrands((current) =>
      current.filter(
        (item) =>
          item.id !== brand.id
      )
    );
  };

  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const resetFilters = () => {
    setCategoryFilter(
      "All Categories"
    );
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-full">

      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <div
        className="
          flex
          h-11
          items-center
          gap-2
          border-b
          border-slate-200
          bg-[#f8fafc]
          px-4
          md:px-5
        "
      >

        <Link
          href="/"
          className="
            flex
            items-center
            gap-1.5
            text-[11px]
            font-semibold
            uppercase
            tracking-wide
            text-slate-500
            transition
            hover:text-indigo-600
          "
        >
          <FiHome size={12} />
          Dashboard
        </Link>

        <FiChevronRight
          size={12}
          className="text-slate-300"
        />

        <span
          className="
            text-[11px]
            font-semibold
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          Hardware Specs
        </span>

        <FiChevronRight
          size={12}
          className="text-slate-300"
        />

        <span
          className="
            text-[11px]
            font-bold
            uppercase
            tracking-wide
            text-[#211d54]
          "
        >
          Brands
        </span>

      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="p-3 md:p-4">

        <section
          className="
            overflow-hidden
            rounded-lg
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >

          {/* =================================================
              TOOLBAR
          ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-3
              border-b
              border-slate-100
              p-3
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

            <div
              className="
                flex
                flex-col
                gap-2
                sm:flex-row
              "
            >

              {/* CATEGORY */}

              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(
                    e.target.value
                  );
                  setCurrentPage(1);
                }}
                className="
                  h-10
                  w-full
                  rounded-md
                  border
                  border-slate-200
                  bg-white
                  px-3
                  text-xs
                  text-slate-700
                  outline-none
                  transition
                  hover:border-slate-300
                  focus:border-indigo-400
                  focus:ring-2
                  focus:ring-indigo-100
                  sm:w-[200px]
                "
              >
                <option>
                  All Categories
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={category.name}
                      value={
                        category.name
                      }
                    >
                      {category.name}
                    </option>
                  )
                )}
              </select>

              {/* SEARCH */}

              <div
                className="
                  relative
                  w-full
                  sm:w-[300px]
                "
              >

                <FiSearch
                  size={14}
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(
                      e.target.value
                    );
                    setCurrentPage(1);
                  }}
                  placeholder="Search brand or remarks..."
                  className="
                    h-10
                    w-full
                    rounded-md
                    border
                    border-slate-200
                    bg-white
                    pl-9
                    pr-9
                    text-xs
                    text-slate-700
                    outline-none
                    placeholder:text-slate-400
                    transition
                    hover:border-slate-300
                    focus:border-indigo-400
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="
                      absolute
                      right-2.5
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      hover:text-slate-700
                    "
                  >
                    <FiX size={13} />
                  </button>
                )}

              </div>

            </div>

            {/* ADD */}

            <button
              type="button"
              onClick={openAddBrand}
              className="
                inline-flex
                h-10
                items-center
                justify-center
                gap-1.5
                rounded-md
                bg-amber-500
                px-4
                text-xs
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:bg-amber-600
                hover:shadow-md
                active:scale-[0.98]
              "
            >
              <FiPlus size={14} />
              Add Brand
            </button>

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="overflow-x-auto">

            <table
              className="
                w-full
                min-w-[900px]
                border-collapse
              "
            >

              <thead>

                <tr
                  className="
                    bg-slate-50
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >

                  <th
                    className="
                      w-[60px]
                      border-b
                      border-slate-200
                      px-4
                      py-3
                      text-left
                    "
                  >
                    SL
                  </th>

                  <th
                    className="
                      w-[38%]
                      border-b
                      border-slate-200
                      px-4
                      py-3
                      text-left
                    "
                  >
                    Brand Name
                  </th>

                  <th
                    className="
                      w-[35%]
                      border-b
                      border-slate-200
                      px-4
                      py-3
                      text-left
                    "
                  >
                    Category
                  </th>

                  <th
                    className="
                      border-b
                      border-slate-200
                      px-4
                      py-3
                      text-left
                    "
                  >
                    Remarks
                  </th>

                  <th
                    className="
                      w-[80px]
                      border-b
                      border-slate-200
                      px-3
                      py-3
                    "
                  />

                </tr>

              </thead>

              <tbody>

                {visibleBrands.map(
                  (brand, index) => (
                    <tr
                      key={brand.id}
                      className="
                        group
                        border-b
                        border-slate-100
                        transition-all
                        duration-150
                        hover:bg-indigo-50/40
                      "
                    >

                      {/* SL */}

                      <td
                        className="
                          px-4
                          py-3
                          text-[11px]
                          text-slate-400
                        "
                      >
                        {startIndex +
                          index +
                          1}
                      </td>

                      {/* BRAND */}

                      <td className="px-4 py-3">

                        <div className="flex items-center gap-3">

                          <div
                            className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-md
                              bg-slate-50
                              text-slate-500
                              transition-all
                              duration-200
                              group-hover:bg-indigo-50
                              group-hover:text-indigo-600
                              group-hover:scale-105
                            "
                          >
                            <FiBox
                              size={14}
                            />
                          </div>

                          <span
                            className="
                              text-[12px]
                              font-bold
                              text-slate-800
                              transition-colors
                              group-hover:text-indigo-600
                            "
                          >
                            {brand.name}
                          </span>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td className="px-4 py-3">

                        <CategoryBadge
                          category={
                            brand.category
                          }
                        />

                      </td>

                      {/* REMARKS */}

                      <td
                        className="
                          px-4
                          py-3
                          text-[11px]
                          text-slate-500
                        "
                      >
                        {brand.remarks}
                      </td>

                      {/* ACTIONS */}

                      <td className="px-3 py-3">

                        <div
                          className="
                            flex
                            items-center
                            justify-end
                            gap-1
                            opacity-0
                            transition-opacity
                            duration-150
                            group-hover:opacity-100
                          "
                        >

                          <button
                            type="button"
                            onClick={() =>
                              openEditBrand(
                                brand
                              )
                            }
                            title="Edit brand"
                            className="
                              flex
                              h-7
                              w-7
                              items-center
                              justify-center
                              rounded-md
                              text-slate-400
                              transition
                              hover:bg-indigo-50
                              hover:text-indigo-600
                            "
                          >
                            <FiEdit2
                              size={12}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteBrand(
                                brand
                              )
                            }
                            title="Delete brand"
                            className="
                              flex
                              h-7
                              w-7
                              items-center
                              justify-center
                              rounded-md
                              text-slate-400
                              transition
                              hover:bg-rose-50
                              hover:text-rose-500
                            "
                          >
                            <FiTrash2
                              size={12}
                            />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

                {/* EMPTY */}

                {visibleBrands.length ===
                  0 && (
                  <tr>

                    <td
                      colSpan={5}
                      className="
                        px-4
                        py-20
                        text-center
                      "
                    >

                      <div className="flex flex-col items-center">

                        <div
                          className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-100
                            text-slate-400
                          "
                        >
                          <FiBox
                            size={18}
                          />
                        </div>

                        <p
                          className="
                            mt-3
                            text-sm
                            font-semibold
                            text-slate-600
                          "
                        >
                          No brands found
                        </p>

                        <button
                          type="button"
                          onClick={
                            resetFilters
                          }
                          className="
                            mt-2
                            text-xs
                            font-semibold
                            text-indigo-600
                            hover:underline
                          "
                        >
                          Clear filters
                        </button>

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

          <div
            className="
              flex
              flex-col
              gap-3
              border-t
              border-slate-100
              px-4
              py-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div
              className="
                text-[11px]
                text-slate-500
              "
            >
              Showing{" "}

              <span className="font-semibold text-slate-700">
                {filteredBrands.length
                  ? startIndex + 1
                  : 0}
              </span>

              {" "}to{" "}

              <span className="font-semibold text-slate-700">
                {endIndex}
              </span>

              {" "}of{" "}

              <span className="font-semibold text-slate-700">
                {filteredBrands.length}
              </span>

              {" "}users
            </div>

            <div className="flex items-center gap-4">

              {/* ROWS */}

              <div className="flex items-center gap-2">

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >
                  Rows:
                </span>

                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(
                      Number(
                        e.target.value
                      )
                    );
                    setCurrentPage(1);
                  }}
                  className="
                    h-8
                    rounded-md
                    border
                    border-slate-200
                    bg-white
                    px-2
                    text-[11px]
                    text-slate-700
                    outline-none
                    focus:border-indigo-400
                  "
                >
                  <option value={10}>
                    10
                  </option>

                  <option value={15}>
                    15
                  </option>

                  <option value={20}>
                    20
                  </option>

                  <option value={30}>
                    30
                  </option>
                </select>

              </div>

              {/* PAGINATION */}

              <div className="flex items-center gap-1">

                <button
                  type="button"
                  disabled={
                    safePage === 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.max(
                          1,
                          page - 1
                        )
                    )
                  }
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-slate-200
                    text-slate-500
                    transition
                    hover:bg-indigo-50
                    hover:text-indigo-600
                    disabled:opacity-40
                  "
                >
                  <FiChevronLeft
                    size={14}
                  />
                </button>

                {Array.from(
                  {
                    length: Math.min(
                      totalPages,
                      5
                    ),
                  },
                  (_, index) =>
                    index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() =>
                      setCurrentPage(
                        page
                      )
                    }
                    className={`
                      flex
                      h-8
                      min-w-8
                      items-center
                      justify-center
                      rounded-md
                      px-2
                      text-[10px]
                      font-semibold
                      transition-all
                      ${
                        page === safePage
                          ? "bg-amber-500 text-white shadow-sm"
                          : "border border-slate-200 bg-white text-slate-500 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                      }
                    `}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={
                    safePage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.min(
                          totalPages,
                          page + 1
                        )
                    )
                  }
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-slate-200
                    text-slate-500
                    transition
                    hover:bg-indigo-50
                    hover:text-indigo-600
                    disabled:opacity-40
                  "
                >
                  <FiChevronRight
                    size={14}
                  />
                </button>

              </div>

            </div>

          </div>

        </section>

      </div>

      {/* ===================================================
          ADD / EDIT MODAL
      =================================================== */}

      {showModal && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-slate-950/40
            p-4
            backdrop-blur-[2px]
          "
        >

          <div
            className="
              w-full
              max-w-[665px]
              overflow-hidden
              rounded-xl
              bg-white
              shadow-2xl
            "
          >

            {/* HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-100
                px-5
                py-4
              "
            >

              <div>

                <h2
                  className="
                    text-sm
                    font-bold
                    text-slate-800
                  "
                >
                  {editingBrand
                    ? "Edit Brand"
                    : "Create Brand"}
                </h2>

                <p
                  className="
                    mt-0.5
                    text-[10px]
                    text-slate-400
                  "
                >
                  Add hardware brand
                  information to your
                  inventory system.
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-md
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                "
              >
                <FiX size={16} />
              </button>

            </div>

            {/* BODY */}

            <div className="space-y-5 p-5">

              {/* CATEGORY */}

              <div>

                <label
                  className="
                    mb-1.5
                    block
                    text-xs
                    font-medium
                    text-[#142957]
                  "
                >
                  Category
                  <span className="ml-1 text-rose-500">
                    *
                  </span>
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    updateForm(
                      "category",
                      e.target.value
                    )
                  }
                  className="
                    h-10
                    w-full
                    rounded-md
                    border
                    border-slate-200
                    bg-white
                    px-3
                    text-xs
                    text-slate-700
                    outline-none
                    transition
                    hover:border-slate-300
                    focus:border-indigo-400
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                >
                  <option value="">
                    ----------
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={
                          category.name
                        }
                        value={
                          category.name
                        }
                      >
                        {category.name}
                      </option>
                    )
                  )}
                </select>

                <p
                  className="
                    mt-1.5
                    text-[10px]
                    text-slate-400
                  "
                >
                  The hardware category
                  this brand belongs to.
                </p>

              </div>

              {/* BRAND NAME */}

              <div>

                <label
                  className="
                    mb-1.5
                    block
                    text-xs
                    font-medium
                    text-[#142957]
                  "
                >
                  Brand Name
                  <span className="ml-1 text-rose-500">
                    *
                  </span>
                </label>

                <input
                  value={form.name}
                  onChange={(e) =>
                    updateForm(
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="e.g., HP, Cisco, Dell"
                  className="
                    h-10
                    w-full
                    rounded-md
                    border
                    border-slate-200
                    px-3
                    text-xs
                    text-slate-700
                    outline-none
                    placeholder:text-slate-400
                    transition
                    hover:border-slate-300
                    focus:border-indigo-400
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                />

                <p
                  className="
                    mt-1.5
                    text-[10px]
                    text-slate-400
                  "
                >
                  The official name of the
                  brand.
                </p>

              </div>

              {/* REMARKS */}

              <div>

                <label
                  className="
                    mb-1.5
                    block
                    text-xs
                    font-medium
                    text-[#142957]
                  "
                >
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
                  placeholder="Enter any optional notes here..."
                  className="
                    w-full
                    resize-none
                    rounded-md
                    border
                    border-slate-200
                    px-3
                    py-2.5
                    text-xs
                    text-slate-700
                    outline-none
                    placeholder:text-slate-400
                    transition
                    hover:border-slate-300
                    focus:border-indigo-400
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                />

                <p
                  className="
                    mt-1.5
                    text-[10px]
                    text-slate-400
                  "
                >
                  Optional internal notes or
                  descriptions about the
                  brand.
                </p>

              </div>

              {/* PREVIEW */}

              {(form.name ||
                form.category) && (
                <div
                  className="
                    rounded-lg
                    border
                    border-slate-200
                    bg-slate-50
                    p-3
                  "
                >

                  <p
                    className="
                      mb-2
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Preview
                  </p>

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-md
                          bg-white
                          text-indigo-500
                          shadow-sm
                        "
                      >
                        <FiBox
                          size={15}
                        />
                      </div>

                      <div>

                        <p className="text-xs font-bold text-slate-700">
                          {form.name ||
                            "Brand Name"}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          {form.remarks ||
                            "No remarks"}
                        </p>

                      </div>

                    </div>

                    {form.category && (
                      <CategoryBadge
                        category={
                          form.category
                        }
                      />
                    )}

                  </div>

                </div>
              )}

            </div>

            {/* FOOTER */}

            <div
              className="
                flex
                items-center
                justify-end
                gap-2
                border-t
                border-slate-100
                bg-slate-50
                px-5
                py-3
              "
            >

              <button
                type="button"
                onClick={closeModal}
                className="
                  h-9
                  rounded-md
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-xs
                  font-semibold
                  text-slate-600
                  transition
                  hover:bg-slate-100
                "
              >
                Discard Changes
              </button>

              <button
                type="button"
                onClick={saveBrand}
                disabled={
                  !form.name.trim() ||
                  !form.category
                }
                className="
                  inline-flex
                  h-9
                  items-center
                  gap-2
                  rounded-md
                  bg-amber-500
                  px-5
                  text-xs
                  font-bold
                  text-white
                  shadow-sm
                  transition-all
                  hover:bg-amber-600
                  hover:shadow-md
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <FiCheck size={14} />

                {editingBrand
                  ? "Save Changes"
                  : "Create Brand"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}