"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  FiHome,
  FiChevronRight,
  FiSearch,
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
  FiGitBranch,
} from "react-icons/fi";

/* =========================================================
   SECTION DATA
========================================================= */

const initialSections = [
  {
    id: 1,
    name: "Accounts & Audit",
    ref: "kaizer-knitwears-ltd-office-management-accounts-audit",
    department: "Office Management",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 7,
  },
  {
    id: 2,
    name: "Admin, HR & Compliance",
    ref: "kaizer-knitwears-ltd-office-management-admin-hr-compliance",
    department: "Office Management",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 10,
  },
  {
    id: 3,
    name: "Central Control Wing (ED)",
    ref: "kaizer-knitwears-ltd-office-management-central-control-wing-ed",
    department: "Office Management",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 2,
  },
  {
    id: 4,
    name: "Civil & Architecture",
    ref: "kaizer-knitwears-ltd-office-management-civil-architecture",
    department: "Office Management",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 1,
  },
  {
    id: 5,
    name: "Cutting Staff",
    ref: "kaizer-knitwears-ltd-cutting-cutting-staff",
    department: "Cutting",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 4,
  },
  {
    id: 6,
    name: "Dyeing",
    ref: "kaizer-knitwears-ltd-knitting-dyeing-dyeing",
    department: "Knitting & Dyeing",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 3,
  },
  {
    id: 7,
    name: "Fabric (Store)",
    ref: "kaizer-knitwears-ltd-store-accessories-fabric-store",
    department: "Store & Accessories",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 1,
  },
  {
    id: 8,
    name: "Factory Management",
    ref: "kaizer-knitwears-ltd-office-management-factory-management",
    department: "Office Management",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 1,
  },
  {
    id: 9,
    name: "Finishing Staff",
    ref: "kaizer-knitwears-ltd-finishing-finishing-staff",
    department: "Finishing",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 1,
  },
  {
    id: 10,
    name: "Hand & Stock",
    ref: "kaizer-knitwears-ltd-store-accessories-hand-stock",
    department: "Store & Accessories",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 0,
  },
  {
    id: 11,
    name: "IE",
    ref: "kaizer-knitwears-ltd-merchandising-planning-ie",
    department: "Merchandising & Planning",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 2,
  },
  {
    id: 12,
    name: "Information & Technology",
    ref: "kaizer-knitwears-ltd-office-management-information-technology",
    department: "Office Management",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 4,
  },
  {
    id: 13,
    name: "Knitting",
    ref: "kaizer-knitwears-ltd-knitting-dyeing-knitting",
    department: "Knitting & Dyeing",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 4,
  },
  {
    id: 14,
    name: "Maintenance (Electrical)",
    ref: "kaizer-knitwears-ltd-maintenance-maintenance-electrical",
    department: "Maintenance",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 1,
  },
  {
    id: 15,
    name: "Merchandising",
    ref: "kaizer-knitwears-ltd-merchandising-planning-merchandising",
    department: "Merchandising & Planning",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 20,
  },
  {
    id: 16,
    name: "Office Staff",
    ref: "mk-fashion-ltd-knitting-staff-office-staff",
    department: "Knitting Staff",
    company: "MK Fashion Ltd.",
    remarks: "No remarks",
    employees: 5,
  },
  {
    id: 17,
    name: "Planning",
    ref: "kaizer-knitwears-ltd-merchandising-planning-planning",
    department: "Merchandising & Planning",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 6,
  },
  {
    id: 18,
    name: "Print Staff",
    ref: "kaizer-knitwears-ltd-print-print-staff",
    department: "Print",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 0,
  },
  {
    id: 19,
    name: "Production Staff",
    ref: "mk-fashion-ltd-knitting-staff-production-staff",
    department: "Knitting Staff",
    company: "MK Fashion Ltd.",
    remarks: "No remarks",
    employees: 0,
  },
  {
    id: 20,
    name: "Quality (QPC)",
    ref: "kaizer-knitwears-ltd-quality-assurance-quality-qpc",
    department: "Quality Assurance",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 0,
  },
  {
    id: 21,
    name: "Quality Staff",
    ref: "kaizer-knitwears-ltd-quality-assurance-quality-staff",
    department: "Quality Assurance",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 5,
  },
  {
    id: 22,
    name: "Research & Development",
    ref: "kaizer-knitwears-ltd-merchandising-planning-research-development",
    department: "Merchandising & Planning",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 1,
  },
  {
    id: 23,
    name: "Sewing Staff",
    ref: "kaizer-knitwears-ltd-sewing-sewing-staff",
    department: "Sewing",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 0,
  },
  {
    id: 24,
    name: "Staff (Reconing & Hanching)",
    ref: "kaizer-knitwears-ltd-reconing-hanching-staff",
    department: "Reconing & Hanching",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 2,
  },
  {
    id: 25,
    name: "Stock",
    ref: "kaizer-knitwears-ltd-store-accessories-stock",
    department: "Store & Accessories",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 0,
  },
  {
    id: 26,
    name: "Store (Accessories)",
    ref: "kaizer-knitwears-ltd-store-accessories-store-accessories",
    department: "Store & Accessories",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 5,
  },
  {
    id: 27,
    name: "Technical",
    ref: "kaizer-knitwears-ltd-sample-technical",
    department: "Sample",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 6,
  },
  {
    id: 28,
    name: "Transport & Logistics",
    ref: "kaizer-logistics-transport-logistics",
    department: "Transport & Logistics",
    company: "Kaizer Logistics",
    remarks: "No remarks",
    employees: 2,
  },
  {
    id: 29,
    name: "Yarn (Store)",
    ref: "kaizer-knitwears-ltd-store-accessories-yarn-store",
    department: "Store & Accessories",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 0,
  },
  {
    id: 30,
    name: "Compliance",
    ref: "kaizer-knitwears-ltd-office-management-compliance",
    department: "Office Management",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 3,
  },
  {
    id: 31,
    name: "Commercial",
    ref: "kaizer-logistics-commercial",
    department: "Commercial",
    company: "Kaizer Logistics",
    remarks: "No remarks",
    employees: 8,
  },
  {
    id: 32,
    name: "Human Resources",
    ref: "kaizer-knitwears-ltd-office-management-human-resources",
    department: "Office Management",
    company: "Kaizer Knitwears Ltd.",
    remarks: "No remarks",
    employees: 12,
  },
];

/* =========================================================
   SECTION ICON
========================================================= */

function SectionIcon() {
  return (
    <div
      className="
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-md
        border
        border-emerald-100
        bg-emerald-50
        text-emerald-600
        transition-all
        duration-200
        group-hover:scale-105
        group-hover:border-emerald-200
        group-hover:bg-emerald-100
      "
    >
      <FiGitBranch size={14} />
    </div>
  );
}

/* =========================================================
   EMPLOYEE BADGE
========================================================= */

function EmployeeBadge({ value }) {
  return (
    <div
      className="
        mx-auto
        flex
        h-7
        min-w-7
        w-fit
        items-center
        justify-center
        rounded-full
        border
        border-blue-100
        bg-blue-50
        px-2
        text-[10px]
        font-bold
        text-blue-600
        transition-all
        duration-200
        group-hover:scale-110
        group-hover:border-blue-200
        group-hover:bg-blue-100
      "
    >
      {value}
    </div>
  );
}

/* =========================================================
   SORT ICON
========================================================= */

function SortIcon({
  field,
  sortField,
  sortDirection,
}) {
  if (field !== sortField) {
    return (
      <FiMoreHorizontal
        size={11}
        className="text-slate-300"
      />
    );
  }

  return sortDirection === "asc" ? (
    <FiArrowUp
      size={11}
      className="text-indigo-500"
    />
  ) : (
    <FiArrowDown
      size={11}
      className="text-indigo-500"
    />
  );
}

/* =========================================================
   COMPANY LOGO
========================================================= */

function CompanyLogo() {
  return (
    <div
      className="
        flex
        h-7
        w-7
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded
        border
        border-slate-200
        bg-white
      "
    >
      <div className="relative h-5 w-5 overflow-hidden">
        <div
          className="
            absolute
            left-0
            top-0
            h-5
            w-1.5
            skew-x-[-18deg]
            bg-[#5751a6]
          "
        />

        <div
          className="
            absolute
            left-[5px]
            top-0
            h-5
            w-1.5
            skew-x-[-18deg]
            bg-[#7770c4]
          "
        />

        <div
          className="
            absolute
            left-[10px]
            top-0
            h-5
            w-1.5
            skew-x-[-18deg]
            bg-[#403b8d]
          "
        />

        <div
          className="
            absolute
            left-[15px]
            top-0
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
   FORM INPUT
========================================================= */

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label
        className="
          mb-1.5
          block
          text-xs
          font-semibold
          text-slate-600
        "
      >
        {label}
      </label>

      <input
        type={type}
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
          placeholder:text-slate-400
          transition-all
          duration-200
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
   PAGE
========================================================= */

export default function SectionPage() {
  const [sections, setSections] =
    useState(initialSections);

  const [search, setSearch] = useState("");

  const [rowsPerPage, setRowsPerPage] =
    useState(13);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [sortField, setSortField] =
    useState("name");

  const [sortDirection, setSortDirection] =
    useState("asc");

  const [showModal, setShowModal] =
    useState(false);

  const [editingSection, setEditingSection] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    department: "",
    company: "",
    remarks: "",
    employees: "",
    ref: "",
  });

  /* =======================================================
     FILTER + SORT
  ======================================================= */

  const filteredSections = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    let result = [...sections];

    if (query) {
      result = result.filter((section) => {
        return (
          section.name
            .toLowerCase()
            .includes(query) ||
          section.department
            .toLowerCase()
            .includes(query) ||
          section.company
            .toLowerCase()
            .includes(query) ||
          section.ref
            .toLowerCase()
            .includes(query)
        );
      });
    }

    result.sort((a, b) => {
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
    sections,
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
      filteredSections.length /
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
    filteredSections.length
  );

  const visibleSections =
    filteredSections.slice(
      startIndex,
      endIndex
    );

  /* =======================================================
     SEARCH
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
     OPEN ADD
  ======================================================= */

  const openAddModal = () => {
    setEditingSection(null);

    setForm({
      name: "",
      department: "",
      company: "",
      remarks: "",
      employees: "",
      ref: "",
    });

    setShowModal(true);
  };

  /* =======================================================
     OPEN EDIT
  ======================================================= */

  const openEditModal = (section) => {
    setEditingSection(section);

    setForm({
      name: section.name,
      department: section.department,
      company: section.company,
      remarks: section.remarks,
      employees: String(section.employees),
      ref: section.ref,
    });

    setShowModal(true);
  };

  /* =======================================================
     CLOSE
  ======================================================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingSection(null);
  };

  /* =======================================================
     UPDATE FORM
  ======================================================= */

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /* =======================================================
     SAVE
  ======================================================= */

  const saveSection = () => {
    if (
      !form.name.trim() ||
      !form.department.trim() ||
      !form.company.trim()
    ) {
      return;
    }

    const generatedRef =
      form.name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    if (editingSection) {
      setSections((current) =>
        current.map((section) =>
          section.id === editingSection.id
            ? {
                ...section,
                name: form.name.trim(),
                department:
                  form.department.trim(),
                company:
                  form.company.trim(),
                remarks:
                  form.remarks.trim() ||
                  "No remarks",
                employees:
                  Number(form.employees) ||
                  0,
                ref:
                  form.ref.trim() ||
                  generatedRef,
              }
            : section
        )
      );
    } else {
      const newSection = {
        id: Date.now(),
        name: form.name.trim(),
        department:
          form.department.trim(),
        company: form.company.trim(),
        remarks:
          form.remarks.trim() ||
          "No remarks",
        employees:
          Number(form.employees) || 0,
        ref:
          form.ref.trim() ||
          generatedRef,
      };

      setSections((current) => [
        ...current,
        newSection,
      ]);
    }

    closeModal();
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const deleteSection = (id) => {
    const section = sections.find(
      (item) => item.id === id
    );

    if (!section) return;

    const confirmed = window.confirm(
      `Delete "${section.name}"?`
    );

    if (!confirmed) return;

    setSections((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

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
          Section
        </span>
      </div>

      {/* ===================================================
          PAGE CONTENT
      =================================================== */}

      <div className="p-4 md:p-5">

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
              p-4
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

            {/* SEARCH */}

            <div className="relative w-full max-w-[390px]">

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
                placeholder="Search by section or department..."
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
                  transition-all
                  duration-200
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

            {/* RIGHT */}

            <div className="flex items-center gap-3">

              <span className="hidden text-xs text-slate-400 sm:block">
                {filteredSections.length} sections
              </span>

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
                Add Section
              </button>

            </div>

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="overflow-x-auto">

            <table
              className="
                w-full
                min-w-[1050px]
                border-collapse
              "
            >

              {/* HEADER */}

              <thead>

                <tr className="bg-slate-50">

                  <th
                    className="
                      w-[42%]
                      border-b
                      border-slate-200
                      px-4
                      py-3
                      text-left
                    "
                  >
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
                      Section Name

                      <SortIcon
                        field="name"
                        sortField={sortField}
                        sortDirection={
                          sortDirection
                        }
                      />
                    </button>
                  </th>

                  <th
                    className="
                      w-[30%]
                      border-b
                      border-slate-200
                      px-4
                      py-3
                      text-left
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        handleSort(
                          "department"
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
                      Hierarchy
                      <span className="normal-case font-medium">
                        (Department & Company)
                      </span>

                      <SortIcon
                        field="department"
                        sortField={sortField}
                        sortDirection={
                          sortDirection
                        }
                      />
                    </button>
                  </th>

                  <th
                    className="
                      w-[15%]
                      border-b
                      border-slate-200
                      px-4
                      py-3
                      text-left
                    "
                  >
                    <span
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-slate-500
                      "
                    >
                      Remarks
                    </span>
                  </th>

                  <th
                    className="
                      w-[9%]
                      border-b
                      border-slate-200
                      px-4
                      py-3
                      text-center
                    "
                  >
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

                  <th
                    className="
                      w-[70px]
                      border-b
                      border-slate-200
                      px-3
                      py-3
                    "
                  />

                </tr>

              </thead>

              {/* BODY */}

              <tbody>

                {visibleSections.map(
                  (section) => (
                    <tr
                      key={section.id}
                      className="
                        group
                        border-b
                        border-slate-100
                        transition-all
                        duration-150
                        hover:bg-indigo-50/40
                      "
                    >

                      {/* ===================================
                          SECTION
                      =================================== */}

                      <td className="px-4 py-2.5">

                        <div className="flex items-center gap-3">

                          <SectionIcon />

                          <div className="min-w-0">

                            <p
                              className="
                                text-[12px]
                                font-semibold
                                leading-5
                                text-slate-800
                                transition-colors
                                group-hover:text-indigo-600
                              "
                            >
                              {section.name}
                            </p>

                            <p
                              className="
                                truncate
                                text-[9px]
                                leading-4
                                text-slate-400
                              "
                              title={section.ref}
                            >
                              Ref: {section.ref}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* ===================================
                          HIERARCHY
                      =================================== */}

                      <td className="px-4 py-2.5">

                        <div className="flex items-start gap-2">

                          <div
                            className="
                              mt-0.5
                              flex
                              h-6
                              w-6
                              shrink-0
                              items-center
                              justify-center
                              rounded
                              bg-indigo-50
                              text-indigo-500
                              transition-all
                              group-hover:bg-indigo-100
                            "
                          >
                            <FiGitBranch size={12} />
                          </div>

                          <div className="min-w-0">

                            <Link
                              href={`/master-data/department?search=${encodeURIComponent(
                                section.department
                              )}`}
                              className="
                                block
                                truncate
                                text-[11px]
                                font-semibold
                                text-slate-700
                                transition-colors
                                hover:text-indigo-600
                              "
                            >
                              {section.department}
                            </Link>

                            <div className="mt-0.5 flex items-center gap-1.5">

                              <CompanyLogo />

                              <span
                                className="
                                  truncate
                                  text-[9px]
                                  text-slate-400
                                "
                              >
                                Company:{" "}
                                {section.company}
                              </span>

                            </div>

                          </div>

                        </div>

                      </td>

                      {/* ===================================
                          REMARKS
                      =================================== */}

                      <td className="px-4 py-2.5">

                        <span
                          className={`
                            text-[10px]
                            italic
                            ${
                              section.remarks ===
                              "No remarks"
                                ? "text-slate-400"
                                : "text-slate-600"
                            }
                          `}
                        >
                          {section.remarks}
                        </span>

                      </td>

                      {/* ===================================
                          EMPLOYEES
                      =================================== */}

                      <td className="px-4 py-2.5">

                        <EmployeeBadge
                          value={
                            section.employees
                          }
                        />

                      </td>

                      {/* ===================================
                          ACTIONS
                      =================================== */}

                      <td className="px-3 py-2.5">

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
                            title="Edit section"
                            onClick={() =>
                              openEditModal(
                                section
                              )
                            }
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

                          <button
                            type="button"
                            title="Delete section"
                            onClick={() =>
                              deleteSection(
                                section.id
                              )
                            }
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

                {/* EMPTY */}

                {visibleSections.length ===
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
                          <FiSearch size={19} />
                        </div>

                        <p className="mt-3 text-sm font-semibold text-slate-600">
                          No sections found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try another section or
                          department name.
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

            {/* COUNT */}

            <div className="text-[11px] text-slate-500">

              Showing{" "}

              <span className="font-semibold text-slate-700">
                {filteredSections.length ===
                0
                  ? 0
                  : startIndex + 1}
              </span>

              {" "}to{" "}

              <span className="font-semibold text-slate-700">
                {endIndex}
              </span>

              {" "}of{" "}

              <span className="font-semibold text-slate-700">
                {filteredSections.length}
              </span>

              {" "}sections

            </div>

            {/* CONTROLS */}

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

                <div className="relative">

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
                    <option value={10}>
                      10
                    </option>

                    <option value={13}>
                      13
                    </option>

                    <option value={20}>
                      20
                    </option>

                    <option value={30}>
                      30
                    </option>

                    <option value={50}>
                      50
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

              {/* PAGINATION */}

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

                <h2 className="text-base font-bold text-slate-800">
                  {editingSection
                    ? "Edit Section"
                    : "Add Section"}
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  {editingSection
                    ? "Update section information."
                    : "Create a new section."}
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

            <div className="space-y-4 p-5">

              <FormInput
                label="Section Name *"
                value={form.name}
                onChange={(e) =>
                  updateForm(
                    "name",
                    e.target.value
                  )
                }
                placeholder="Enter section name"
              />

              <FormInput
                label="Department *"
                value={form.department}
                onChange={(e) =>
                  updateForm(
                    "department",
                    e.target.value
                  )
                }
                placeholder="Example: Office Management"
              />

              <FormInput
                label="Parent Company *"
                value={form.company}
                onChange={(e) =>
                  updateForm(
                    "company",
                    e.target.value
                  )
                }
                placeholder="Example: Kaizer Knitwears Ltd."
              />

              <FormInput
                label="Reference"
                value={form.ref}
                onChange={(e) =>
                  updateForm(
                    "ref",
                    e.target.value
                  )
                }
                placeholder="section-reference"
              />

              <FormInput
                label="Remarks"
                value={form.remarks}
                onChange={(e) =>
                  updateForm(
                    "remarks",
                    e.target.value
                  )
                }
                placeholder="No remarks"
              />

              <FormInput
                label="Employees"
                type="number"
                value={form.employees}
                onChange={(e) =>
                  updateForm(
                    "employees",
                    e.target.value
                  )
                }
                placeholder="0"
              />

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
                  hover:bg-slate-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveSection}
                disabled={
                  !form.name.trim() ||
                  !form.department.trim() ||
                  !form.company.trim()
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

                {editingSection
                  ? "Save Changes"
                  : "Create Section"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}