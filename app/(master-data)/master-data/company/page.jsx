"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  FiHome,
  FiChevronRight,
  FiSearch,
  FiMapPin,
  FiChevronDown,
  FiChevronLeft,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiCheck,
  FiArrowUp,
  FiArrowDown,
  FiMoreHorizontal,
} from "react-icons/fi";

/* =========================================================
   INITIAL COMPANY DATA
========================================================= */

const initialCompanies = [
  {
    id: 1,
    name: "Color House Ltd.",
    shortName: "CH",
    location: "Nayapara, Kashimpur, Gazipur-...",
    departments: 0,
    sections: 0,
    employees: 0,
  },
  {
    id: 2,
    name: "Kaizer Knitwears Ltd.",
    shortName: "KKL",
    location: "Nayapara, Kashimpur, Gazipur-...",
    departments: 12,
    sections: 26,
    employees: 93,
  },
  {
    id: 3,
    name: "Kaizer Logistics",
    shortName: "KL",
    location: "Nayapara, Kashimpur, Gazipur-...",
    departments: 1,
    sections: 1,
    employees: 2,
  },
  {
    id: 4,
    name: "MK Fashion Ltd.",
    shortName: "MK",
    location: "Nayapara, Kashimpur, Gazipur-...",
    departments: 2,
    sections: 2,
    employees: 5,
  },
  {
    id: 5,
    name: "Kaizer Textiles Ltd.",
    shortName: "KTL",
    location: "Konabari, Gazipur-...",
    departments: 8,
    sections: 17,
    employees: 64,
  },
  {
    id: 6,
    name: "Kaizer Dyeing Ltd.",
    shortName: "KDL",
    location: "Nayapara, Kashimpur, Gazipur-...",
    departments: 6,
    sections: 12,
    employees: 48,
  },
  {
    id: 7,
    name: "Kaizer Garments Ltd.",
    shortName: "KGL",
    location: "Kashimpur, Gazipur-...",
    departments: 10,
    sections: 21,
    employees: 78,
  },
  {
    id: 8,
    name: "Kaizer Accessories Ltd.",
    shortName: "KAL",
    location: "Nayapara, Gazipur-...",
    departments: 5,
    sections: 9,
    employees: 31,
  },
  {
    id: 9,
    name: "Kaizer Packaging Ltd.",
    shortName: "KPL",
    location: "Konabari, Gazipur-...",
    departments: 4,
    sections: 8,
    employees: 27,
  },
  {
    id: 10,
    name: "Kaizer Printing Ltd.",
    shortName: "KPR",
    location: "Kashimpur, Gazipur-...",
    departments: 3,
    sections: 7,
    employees: 19,
  },
  {
    id: 11,
    name: "Kaizer Trading Ltd.",
    shortName: "KTR",
    location: "Gazipur, Bangladesh",
    departments: 4,
    sections: 6,
    employees: 22,
  },
  {
    id: 12,
    name: "MK Apparels Ltd.",
    shortName: "MKA",
    location: "Nayapara, Gazipur-...",
    departments: 7,
    sections: 14,
    employees: 52,
  },
  {
    id: 13,
    name: "MK Washing Ltd.",
    shortName: "MKW",
    location: "Kashimpur, Gazipur-...",
    departments: 3,
    sections: 8,
    employees: 24,
  },
  {
    id: 14,
    name: "Color House Fashion Ltd.",
    shortName: "CHF",
    location: "Nayapara, Gazipur-...",
    departments: 6,
    sections: 11,
    employees: 39,
  },
  {
    id: 15,
    name: "Gazipur Logistics Ltd.",
    shortName: "GLL",
    location: "Gazipur, Bangladesh",
    departments: 2,
    sections: 4,
    employees: 13,
  },
  {
    id: 16,
    name: "Eastern Knitwears Ltd.",
    shortName: "EKL",
    location: "Kashimpur, Gazipur-...",
    departments: 9,
    sections: 18,
    employees: 71,
  },
  {
    id: 17,
    name: "Eastern Textiles Ltd.",
    shortName: "ETL",
    location: "Konabari, Gazipur-...",
    departments: 5,
    sections: 10,
    employees: 35,
  },
  {
    id: 18,
    name: "Narayanganj Trading Ltd.",
    shortName: "NTL",
    location: "Narayanganj, Bangladesh",
    departments: 3,
    sections: 5,
    employees: 17,
  },
];

/* =========================================================
   COMPANY LOGO
========================================================= */

function CompanyLogo() {
  return (
    <div
      className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-md
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-200
        group-hover:border-indigo-200
        group-hover:shadow
      "
    >
      <div className="relative h-7 w-7 overflow-hidden">
        <div
          className="
            absolute
            left-0
            top-1
            h-5
            w-2
            skew-x-[-18deg]
            bg-[#5751a6]
          "
        />

        <div
          className="
            absolute
            left-[7px]
            top-1
            h-5
            w-2
            skew-x-[-18deg]
            bg-[#7770c4]
          "
        />

        <div
          className="
            absolute
            left-[14px]
            top-1
            h-5
            w-2
            skew-x-[-18deg]
            bg-[#403b8d]
          "
        />

        <div
          className="
            absolute
            left-[21px]
            top-1
            h-5
            w-1
            skew-x-[-18deg]
            bg-[#6861b3]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   COUNTER
========================================================= */

function Counter({ value, type }) {
  const styles = {
    departments:
      "border-blue-100 bg-blue-50 text-blue-600",

    sections:
      "border-emerald-100 bg-emerald-50 text-emerald-600",

    employees:
      "border-purple-100 bg-purple-50 text-purple-600",
  };

  return (
    <div
      className={`
        mx-auto
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-full
        border
        text-[10px]
        font-semibold
        transition-all
        duration-200
        group-hover:scale-110
        ${styles[type]}
      `}
    >
      {value}
    </div>
  );
}

/* =========================================================
   SORT ICON
========================================================= */

function SortIcon({ field, sortField, sortDirection }) {
  if (sortField !== field) {
    return (
      <FiMoreHorizontal
        size={12}
        className="text-slate-300"
      />
    );
  }

  return sortDirection === "asc" ? (
    <FiArrowUp
      size={12}
      className="text-indigo-500"
    />
  ) : (
    <FiArrowDown
      size={12}
      className="text-indigo-500"
    />
  );
}

/* =========================================================
   INPUT
========================================================= */

function FormInput({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          h-10
          w-full
          rounded-md
          border
          border-slate-200
          bg-white
          px-3
          text-sm
          text-slate-700
          outline-none
          transition-all
          duration-200
          placeholder:text-slate-400
          hover:border-slate-300
          focus:border-indigo-400
          focus:ring-2
          focus:ring-indigo-100
        "
      />
    </div>
  );
}

/* =========================================================
   COMPANY PAGE
========================================================= */

export default function CompanyPage() {
  /* =======================================================
     STATE
  ======================================================= */

  const [companies, setCompanies] =
    useState(initialCompanies);

  const [search, setSearch] = useState("");

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [sortField, setSortField] =
    useState("name");

  const [sortDirection, setSortDirection] =
    useState("asc");

  const [showModal, setShowModal] =
    useState(false);

  const [editingCompany, setEditingCompany] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    shortName: "",
    location: "",
    departments: "",
    sections: "",
    employees: "",
  });

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredCompanies = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    let result = companies;

    if (query) {
      result = result.filter((company) => {
        return (
          company.name
            .toLowerCase()
            .includes(query) ||
          company.shortName
            .toLowerCase()
            .includes(query) ||
          company.location
            .toLowerCase()
            .includes(query)
        );
      });
    }

    result = [...result].sort((a, b) => {
      const first = a[sortField];
      const second = b[sortField];

      if (
        typeof first === "number" &&
        typeof second === "number"
      ) {
        return sortDirection === "asc"
          ? first - second
          : second - first;
      }

      return sortDirection === "asc"
        ? String(first).localeCompare(
            String(second)
          )
        : String(second).localeCompare(
            String(first)
          );
    });

    return result;
  }, [
    companies,
    search,
    sortField,
    sortDirection,
  ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredCompanies.length /
        rowsPerPage
    )
  );

  const safePage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safePage - 1) * rowsPerPage;

  const endIndex = Math.min(
    startIndex + rowsPerPage,
    filteredCompanies.length
  );

  const visibleCompanies =
    filteredCompanies.slice(
      startIndex,
      endIndex
    );

  /* =======================================================
     SEARCH CHANGE
  ======================================================= */

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  /* =======================================================
     SORT
  ======================================================= */

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((current) =>
        current === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  };

  /* =======================================================
     ROWS CHANGE
  ======================================================= */

  const handleRowsChange = (value) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  /* =======================================================
     OPEN ADD
  ======================================================= */

  const openAddModal = () => {
    setEditingCompany(null);

    setForm({
      name: "",
      shortName: "",
      location: "",
      departments: "",
      sections: "",
      employees: "",
    });

    setShowModal(true);
  };

  /* =======================================================
     OPEN EDIT
  ======================================================= */

  const openEditModal = (company) => {
    setEditingCompany(company);

    setForm({
      name: company.name,
      shortName: company.shortName,
      location: company.location,
      departments: String(
        company.departments
      ),
      sections: String(
        company.sections
      ),
      employees: String(
        company.employees
      ),
    });

    setShowModal(true);
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingCompany(null);
  };

  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /* =======================================================
     SAVE COMPANY
  ======================================================= */

  const saveCompany = () => {
    if (
      !form.name.trim() ||
      !form.shortName.trim()
    ) {
      return;
    }

    if (editingCompany) {
      setCompanies((current) =>
        current.map((company) =>
          company.id === editingCompany.id
            ? {
                ...company,
                name: form.name.trim(),
                shortName:
                  form.shortName.trim(),
                location:
                  form.location.trim(),
                departments:
                  Number(
                    form.departments
                  ) || 0,
                sections:
                  Number(form.sections) ||
                  0,
                employees:
                  Number(
                    form.employees
                  ) || 0,
              }
            : company
        )
      );
    } else {
      const newCompany = {
        id: Date.now(),
        name: form.name.trim(),
        shortName:
          form.shortName.trim(),
        location:
          form.location.trim() ||
          "Gazipur, Bangladesh",
        departments:
          Number(form.departments) || 0,
        sections:
          Number(form.sections) || 0,
        employees:
          Number(form.employees) || 0,
      };

      setCompanies((current) => [
        ...current,
        newCompany,
      ]);
    }

    closeModal();
  };

  /* =======================================================
     DELETE COMPANY
  ======================================================= */

  const deleteCompany = (id) => {
    const company = companies.find(
      (item) => item.id === id
    );

    if (!company) return;

    const confirmed = window.confirm(
      `Delete ${company.name}?`
    );

    if (!confirmed) return;

    setCompanies((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );

    const remaining =
      filteredCompanies.length - 1;

    const newTotalPages = Math.max(
      1,
      Math.ceil(
        remaining / rowsPerPage
      )
    );

    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  };

  return (
    <>
      {/* ===================================================
          BREADCRUMB
      =================================================== */}

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
            transition-colors
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

        <Link
          href="/master-data/company"
          className="
            text-[11px]
            font-semibold
            uppercase
            tracking-wide
            text-slate-500
            transition-colors
            hover:text-indigo-600
          "
        >
          Master Data
        </Link>

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
          Company
        </span>
      </div>

      {/* ===================================================
          PAGE CONTENT
      =================================================== */}

      <div className="p-4 md:p-5">

        {/* =================================================
            CARD
        ================================================= */}

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

          {/* ===============================================
              TOOLBAR
          =============================================== */}

          <div
            className="
              flex
              flex-col
              gap-3
              border-b
              border-slate-100
              p-4

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

            {/* Search */}
            <div className="relative w-full max-w-[420px]">

              <FiSearch
                size={15}
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
                onChange={(e) =>
                  handleSearch(
                    e.target.value
                  )
                }
                placeholder="Search by company name or short name..."
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
                  transition-all
                  duration-200
                  placeholder:text-slate-400
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
                    handleSearch("")
                  }
                  className="
                    absolute
                    right-2
                    top-1/2
                    flex
                    h-6
                    w-6
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded
                    text-slate-400
                    transition
                    hover:bg-slate-100
                    hover:text-slate-600
                  "
                >
                  <FiX size={13} />
                </button>
              )}

            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">

              <div className="hidden text-xs text-slate-400 sm:block">
                {filteredCompanies.length} companies
              </div>

              <button
                type="button"
                onClick={openAddModal}
                className="
                  inline-flex
                  h-9
                  items-center
                  gap-2
                  rounded-md
                  bg-indigo-600
                  px-3
                  text-xs
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:bg-indigo-700
                  hover:shadow-md
                  active:scale-[0.98]
                "
              >
                <FiPlus size={14} />
                Add Company
              </button>

            </div>
          </div>

          {/* ===============================================
              TABLE
          =============================================== */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px] border-collapse">

              {/* =========================================
                  HEADER
              ========================================= */}

              <thead>
                <tr className="bg-slate-50">

                  <th className="w-[36%] border-b border-slate-200 px-4 py-3 text-left">
                    <button
                      type="button"
                      onClick={() =>
                        handleSort("name")
                      }
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-slate-500
                        transition-colors
                        hover:text-indigo-600
                      "
                    >
                      Company

                      <SortIcon
                        field="name"
                        sortField={sortField}
                        sortDirection={
                          sortDirection
                        }
                      />
                    </button>
                  </th>

                  <th className="w-[16%] border-b border-slate-200 px-4 py-3 text-left">
                    <button
                      type="button"
                      onClick={() =>
                        handleSort(
                          "shortName"
                        )
                      }
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-slate-500
                        transition-colors
                        hover:text-indigo-600
                      "
                    >
                      Short Name

                      <SortIcon
                        field="shortName"
                        sortField={sortField}
                        sortDirection={
                          sortDirection
                        }
                      />
                    </button>
                  </th>

                  <th className="w-[14%] border-b border-slate-200 px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        handleSort(
                          "departments"
                        )
                      }
                      className="
                        mx-auto
                        flex
                        items-center
                        gap-1.5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-slate-500
                        transition-colors
                        hover:text-indigo-600
                      "
                    >
                      Departments

                      <SortIcon
                        field="departments"
                        sortField={sortField}
                        sortDirection={
                          sortDirection
                        }
                      />
                    </button>
                  </th>

                  <th className="w-[14%] border-b border-slate-200 px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        handleSort(
                          "sections"
                        )
                      }
                      className="
                        mx-auto
                        flex
                        items-center
                        gap-1.5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-slate-500
                        transition-colors
                        hover:text-indigo-600
                      "
                    >
                      Sections

                      <SortIcon
                        field="sections"
                        sortField={sortField}
                        sortDirection={
                          sortDirection
                        }
                      />
                    </button>
                  </th>

                  <th className="w-[14%] border-b border-slate-200 px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        handleSort(
                          "employees"
                        )
                      }
                      className="
                        mx-auto
                        flex
                        items-center
                        gap-1.5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-slate-500
                        transition-colors
                        hover:text-indigo-600
                      "
                    >
                      Employees

                      <SortIcon
                        field="employees"
                        sortField={sortField}
                        sortDirection={
                          sortDirection
                        }
                      />
                    </button>
                  </th>

                  <th className="w-[70px] border-b border-slate-200 px-3 py-3" />

                </tr>
              </thead>

              {/* =========================================
                  BODY
              ========================================= */}

              <tbody>

                {visibleCompanies.map(
                  (company) => (
                    <tr
                      key={company.id}
                      className="
                        group
                        border-b
                        border-slate-100
                        transition-all
                        duration-150
                        hover:bg-indigo-50/40
                      "
                    >

                      {/* Company */}
                      <td className="px-4 py-3">

                        <div className="flex items-center gap-3">

                          <CompanyLogo />

                          <div className="min-w-0">

                            <p
                              className="
                                truncate
                                text-[13px]
                                font-semibold
                                text-slate-800
                                transition-colors
                                group-hover:text-indigo-600
                              "
                            >
                              {company.name}
                            </p>

                            <p
                              className="
                                mt-0.5
                                flex
                                items-center
                                gap-1
                                truncate
                                text-[10px]
                                text-slate-400
                              "
                            >
                              <FiMapPin size={10} />

                              {company.location}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Short Name */}
                      <td className="px-4 py-3">

                        <span
                          className="
                            inline-flex
                            rounded-md
                            border
                            border-slate-200
                            bg-slate-50
                            px-2.5
                            py-1
                            text-[10px]
                            font-semibold
                            text-slate-600
                            transition-all
                            duration-150
                            group-hover:border-indigo-100
                            group-hover:bg-indigo-50
                            group-hover:text-indigo-600
                          "
                        >
                          {company.shortName}
                        </span>

                      </td>

                      {/* Departments */}
                      <td className="px-4 py-3">
                        <Counter
                          value={
                            company.departments
                          }
                          type="departments"
                        />
                      </td>

                      {/* Sections */}
                      <td className="px-4 py-3">
                        <Counter
                          value={
                            company.sections
                          }
                          type="sections"
                        />
                      </td>

                      {/* Employees */}
                      <td className="px-4 py-3">
                        <Counter
                          value={
                            company.employees
                          }
                          type="employees"
                        />
                      </td>

                      {/* Actions */}
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

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                company
                              )
                            }
                            title="Edit company"
                            className="
                              flex
                              h-7
                              w-7
                              items-center
                              justify-center
                              rounded-md
                              text-slate-400
                              transition-all
                              hover:bg-indigo-50
                              hover:text-indigo-600
                            "
                          >
                            <FiEdit2 size={12} />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() =>
                              deleteCompany(
                                company.id
                              )
                            }
                            title="Delete company"
                            className="
                              flex
                              h-7
                              w-7
                              items-center
                              justify-center
                              rounded-md
                              text-slate-400
                              transition-all
                              hover:bg-rose-50
                              hover:text-rose-500
                            "
                          >
                            <FiTrash2 size={12} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

                {/* Empty */}
                {visibleCompanies.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-20 text-center"
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
                          <FiSearch size={20} />
                        </div>

                        <p className="mt-3 text-sm font-semibold text-slate-600">
                          No companies found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try another company name
                          or short name.
                        </p>

                        {search && (
                          <button
                            type="button"
                            onClick={() =>
                              handleSearch("")
                            }
                            className="
                              mt-3
                              text-xs
                              font-semibold
                              text-indigo-600
                              hover:underline
                            "
                          >
                            Clear search
                          </button>
                        )}

                      </div>

                    </td>
                  </tr>
                )}

              </tbody>
            </table>

          </div>

          {/* ===============================================
              FOOTER
          =============================================== */}

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

            {/* Result text */}
            <div className="text-[11px] text-slate-500">

              Showing{" "}

              <span className="font-semibold text-slate-700">
                {filteredCompanies.length === 0
                  ? 0
                  : startIndex + 1}
              </span>

              {" "}to{" "}

              <span className="font-semibold text-slate-700">
                {endIndex}
              </span>

              {" "}of{" "}

              <span className="font-semibold text-slate-700">
                {filteredCompanies.length}
              </span>

              {" "}companies

            </div>

            <div className="flex items-center gap-4">

              {/* Rows */}
              <div className="flex items-center gap-2">

                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Rows:
                </span>

                <div className="relative">

                  <select
                    value={rowsPerPage}
                    onChange={(e) =>
                      handleRowsChange(
                        e.target.value
                      )
                    }
                    className="
                      h-8
                      appearance-none
                      rounded-md
                      border
                      border-slate-200
                      bg-white
                      pl-2.5
                      pr-7
                      text-[11px]
                      font-medium
                      text-slate-700
                      outline-none
                      transition
                      hover:border-slate-300
                      focus:border-indigo-400
                      focus:ring-2
                      focus:ring-indigo-100
                    "
                  >
                    <option value={5}>
                      5
                    </option>

                    <option value={10}>
                      10
                    </option>

                    <option value={15}>
                      15
                    </option>

                    <option value={20}>
                      20
                    </option>
                  </select>

                  <FiChevronDown
                    size={11}
                    className="
                      pointer-events-none
                      absolute
                      right-2
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-1">

                <button
                  type="button"
                  disabled={safePage === 1}
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
                    bg-white
                    text-slate-500
                    transition-all
                    hover:border-indigo-200
                    hover:bg-indigo-50
                    hover:text-indigo-600
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <FiChevronLeft size={14} />
                </button>

                {/* Page numbers */}
                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) => index + 1
                )
                  .slice(
                    Math.max(
                      0,
                      safePage - 2
                    ),
                    Math.min(
                      totalPages,
                      safePage + 1
                    )
                  )
                  .map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() =>
                        setCurrentPage(page)
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
                            ? `
                              bg-indigo-600
                              text-white
                              shadow-sm
                            `
                            : `
                              border
                              border-slate-200
                              bg-white
                              text-slate-500
                              hover:border-indigo-200
                              hover:bg-indigo-50
                              hover:text-indigo-600
                            `
                        }
                      `}
                    >
                      {page}
                    </button>
                  ))}

                <button
                  type="button"
                  disabled={
                    safePage === totalPages
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
                    bg-white
                    text-slate-500
                    transition-all
                    hover:border-indigo-200
                    hover:bg-indigo-50
                    hover:text-indigo-600
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <FiChevronRight size={14} />
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
              max-w-lg
              overflow-hidden
              rounded-xl
              bg-white
              shadow-2xl
            "
          >

            {/* Modal header */}
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
                <h2 className="text-base font-bold text-slate-800">
                  {editingCompany
                    ? "Edit Company"
                    : "Add Company"}
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  {editingCompany
                    ? "Update company information."
                    : "Create a new company."}
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

            {/* Modal body */}
            <div className="space-y-4 p-5">

              <FormInput
                label="Company Name *"
                value={form.name}
                onChange={(e) =>
                  updateForm(
                    "name",
                    e.target.value
                  )
                }
                placeholder="Enter company name"
              />

              <FormInput
                label="Short Name *"
                value={form.shortName}
                onChange={(e) =>
                  updateForm(
                    "shortName",
                    e.target.value
                  )
                }
                placeholder="Example: KKL"
              />

              <FormInput
                label="Location"
                value={form.location}
                onChange={(e) =>
                  updateForm(
                    "location",
                    e.target.value
                  )
                }
                placeholder="Enter company location"
              />

              <div className="grid grid-cols-3 gap-3">

                <FormInput
                  label="Departments"
                  value={
                    form.departments
                  }
                  onChange={(e) =>
                    updateForm(
                      "departments",
                      e.target.value
                    )
                  }
                  placeholder="0"
                />

                <FormInput
                  label="Sections"
                  value={form.sections}
                  onChange={(e) =>
                    updateForm(
                      "sections",
                      e.target.value
                    )
                  }
                  placeholder="0"
                />

                <FormInput
                  label="Employees"
                  value={
                    form.employees
                  }
                  onChange={(e) =>
                    updateForm(
                      "employees",
                      e.target.value
                    )
                  }
                  placeholder="0"
                />

              </div>

            </div>

            {/* Modal footer */}
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
                  hover:bg-slate-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveCompany}
                disabled={
                  !form.name.trim() ||
                  !form.shortName.trim()
                }
                className="
                  inline-flex
                  h-9
                  items-center
                  gap-2
                  rounded-md
                  bg-indigo-600
                  px-4
                  text-xs
                  font-semibold
                  text-white
                  transition
                  hover:bg-indigo-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <FiCheck size={13} />

                {editingCompany
                  ? "Save Changes"
                  : "Create Company"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}