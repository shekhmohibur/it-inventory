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
  FiUsers,
} from "react-icons/fi";

/* =========================================================
   DEPARTMENT DATA
========================================================= */

const initialDepartments = [
  {
    id: 1,
    name: "Cutting",
    company: "Kaizer Knitwears Ltd.",
    companyShort: "KKL",
    ref: "kaizer-knitwears-ltd-cutting",
    sections: 1,
    employees: 4,
  },
  {
    id: 2,
    name: "Finishing",
    company: "Kaizer Knitwears Ltd.",
    companyShort: "KKL",
    ref: "kaizer-knitwears-ltd-finishing",
    sections: 1,
    employees: 1,
  },
  {
    id: 3,
    name: "Knitting & Dyeing",
    company: "Kaizer Knitwears Ltd.",
    companyShort: "KKL",
    ref: "kaizer-knitwears-ltd-knitting-dyeing",
    sections: 2,
    employees: 7,
  },
  {
    id: 4,
    name: "Knitting Staff",
    company: "MK Fashion Ltd.",
    companyShort: "MK",
    ref: "mk-fashion-ltd-knitting-staff",
    sections: 2,
    employees: 5,
  },
  {
    id: 5,
    name: "Maintenance",
    company: "Kaizer Knitwears Ltd.",
    companyShort: "KKL",
    ref: "kaizer-knitwears-ltd-maintenance",
    sections: 1,
    employees: 1,
  },
  {
    id: 6,
    name: "Merchandising & Planning",
    company: "Kaizer Knitwears Ltd.",
    companyShort: "KKL",
    ref: "kaizer-knitwears-ltd-merchandising-planning",
    sections: 4,
    employees: 36,
  },
  {
    id: 7,
    name: "Office Management",
    company: "Kaizer Knitwears Ltd.",
    companyShort: "KKL",
    ref: "kaizer-knitwears-ltd-office-management",
    sections: 6,
    employees: 25,
  },
  {
    id: 8,
    name: "Print",
    company: "Kaizer Knitwears Ltd.",
    companyShort: "KKL",
    ref: "kaizer-knitwears-ltd-print",
    sections: 1,
    employees: 0,
  },
  {
    id: 9,
    name: "Production",
    company: "MK Fashion Ltd.",
    companyShort: "MK",
    ref: "mk-fashion-ltd-production",
    sections: 0,
    employees: 0,
  },
  {
    id: 10,
    name: "Quality Assurance",
    company: "Kaizer Knitwears Ltd.",
    companyShort: "KKL",
    ref: "kaizer-knitwears-ltd-quality-assurance",
    sections: 2,
    employees: 5,
  },
  {
    id: 11,
    name: "Reconing & Hanching",
    company: "Kaizer Knitwears Ltd.",
    companyShort: "KKL",
    ref: "kaizer-knitwears-ltd-reconing-hanching",
    sections: 1,
    employees: 2,
  },
  {
    id: 12,
    name: "Sample",
    company: "Kaizer Knitwears Ltd.",
    companyShort: "KKL",
    ref: "kaizer-knitwears-ltd-sample",
    sections: 1,
    employees: 6,
  },
  {
    id: 13,
    name: "Sewing",
    company: "Kaizer Knitwears Ltd.",
    companyShort: "KKL",
    ref: "kaizer-knitwears-ltd-sewing",
    sections: 1,
    employees: 0,
  },
  {
    id: 14,
    name: "Accounts & Finance",
    company: "Kaizer Logistics",
    companyShort: "KL",
    ref: "kaizer-logistics-accounts-finance",
    sections: 2,
    employees: 8,
  },
  {
    id: 15,
    name: "Transport & Logistics",
    company: "Kaizer Logistics",
    companyShort: "KL",
    ref: "kaizer-logistics-transport-logistics",
    sections: 2,
    employees: 7,
  },
  {
    id: 16,
    name: "Human Resources",
    company: "Kaizer Knitwears Ltd.",
    companyShort: "KKL",
    ref: "kaizer-knitwears-ltd-human-resources",
    sections: 3,
    employees: 12,
  },
  {
    id: 17,
    name: "Information Technology",
    company: "Kaizer Knitwears Ltd.",
    companyShort: "KKL",
    ref: "kaizer-knitwears-ltd-information-technology",
    sections: 2,
    employees: 6,
  },
  {
    id: 18,
    name: "Store",
    company: "Kaizer Knitwears Ltd.",
    companyShort: "KKL",
    ref: "kaizer-knitwears-ltd-store",
    sections: 3,
    employees: 14,
  },
  {
    id: 19,
    name: "Administration",
    company: "MK Fashion Ltd.",
    companyShort: "MK",
    ref: "mk-fashion-ltd-administration",
    sections: 2,
    employees: 9,
  },
  {
    id: 20,
    name: "Commercial",
    company: "MK Fashion Ltd.",
    companyShort: "MK",
    ref: "mk-fashion-ltd-commercial",
    sections: 2,
    employees: 8,
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
   DEPARTMENT ICON
========================================================= */

function DepartmentIcon() {
  return (
    <div
      className="
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-md
        border
        border-blue-100
        bg-blue-50
        text-blue-600

        transition-all
        duration-200

        group-hover:border-blue-200
        group-hover:bg-blue-100
        group-hover:scale-105
      "
    >
      <FiUsers size={15} />
    </div>
  );
}

/* =========================================================
   COUNTER
========================================================= */

function Counter({ value, type }) {
  const styles = {
    sections:
      "border-purple-100 bg-purple-50 text-purple-600",

    employees:
      "border-blue-100 bg-blue-50 text-blue-600",
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

function SortIcon({
  field,
  sortField,
  sortDirection,
}) {
  if (sortField !== field) {
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
   DEPARTMENT PAGE
========================================================= */

export default function DepartmentPage() {
  const [departments, setDepartments] =
    useState(initialDepartments);

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

  const [editingDepartment, setEditingDepartment] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    ref: "",
    sections: "",
    employees: "",
  });

  /* =======================================================
     FILTER + SORT
  ======================================================= */

  const filteredDepartments = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    let result = [...departments];

    if (query) {
      result = result.filter((department) => {
        return (
          department.name
            .toLowerCase()
            .includes(query) ||
          department.company
            .toLowerCase()
            .includes(query) ||
          department.ref
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
    departments,
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
      filteredDepartments.length /
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
    filteredDepartments.length
  );

  const visibleDepartments =
    filteredDepartments.slice(
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
     OPEN ADD MODAL
  ======================================================= */

  const openAddModal = () => {
    setEditingDepartment(null);

    setForm({
      name: "",
      company: "",
      ref: "",
      sections: "",
      employees: "",
    });

    setShowModal(true);
  };

  /* =======================================================
     OPEN EDIT MODAL
  ======================================================= */

  const openEditModal = (department) => {
    setEditingDepartment(department);

    setForm({
      name: department.name,
      company: department.company,
      ref: department.ref,
      sections: String(
        department.sections
      ),
      employees: String(
        department.employees
      ),
    });

    setShowModal(true);
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingDepartment(null);
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

  const saveDepartment = () => {
    if (
      !form.name.trim() ||
      !form.company.trim()
    ) {
      return;
    }

    if (editingDepartment) {
      setDepartments((current) =>
        current.map((department) =>
          department.id ===
          editingDepartment.id
            ? {
                ...department,
                name: form.name.trim(),
                company:
                  form.company.trim(),
                ref:
                  form.ref.trim() ||
                  form.name
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, "-"),
                sections:
                  Number(
                    form.sections
                  ) || 0,
                employees:
                  Number(
                    form.employees
                  ) || 0,
              }
            : department
        )
      );
    } else {
      const companyShort =
        form.company
          .split(" ")
          .filter(Boolean)
          .map((word) => word[0])
          .join("")
          .slice(0, 3)
          .toUpperCase();

      const newDepartment = {
        id: Date.now(),
        name: form.name.trim(),
        company: form.company.trim(),
        companyShort,
        ref:
          form.ref.trim() ||
          form.name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-"),
        sections:
          Number(form.sections) || 0,
        employees:
          Number(form.employees) || 0,
      };

      setDepartments((current) => [
        ...current,
        newDepartment,
      ]);
    }

    closeModal();
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const deleteDepartment = (id) => {
    const department =
      departments.find(
        (item) => item.id === id
      );

    if (!department) return;

    const confirmed = window.confirm(
      `Delete ${department.name}?`
    );

    if (!confirmed) return;

    setDepartments((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  };

  /* =======================================================
     RETURN
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
          Department
        </span>
      </div>

      {/* ===================================================
          CONTENT
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

            {/* Search */}

            <div className="relative w-full max-w-[385px]">

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
                placeholder="Search by department or company name..."
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

            {/* Right side */}

            <div className="flex items-center gap-3">

              <span className="hidden text-xs text-slate-400 sm:block">
                {filteredDepartments.length} departments
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
                Add Department
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
                min-w-[1000px]
                border-collapse
              "
            >

              {/* =================================================
                  HEADER
              ================================================= */}

              <thead>
                <tr className="bg-slate-50">

                  <th className="w-[46%] border-b border-slate-200 px-4 py-3 text-left">

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
                      Department Name

                      <SortIcon
                        field="name"
                        sortField={sortField}
                        sortDirection={
                          sortDirection
                        }
                      />
                    </button>

                  </th>

                  <th className="w-[30%] border-b border-slate-200 px-4 py-3 text-left">

                    <button
                      type="button"
                      onClick={() =>
                        handleSort("company")
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
                      Parent Company

                      <SortIcon
                        field="company"
                        sortField={sortField}
                        sortDirection={
                          sortDirection
                        }
                      />
                    </button>

                  </th>

                  <th className="w-[10%] border-b border-slate-200 px-4 py-3 text-center">

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

                  <th className="w-[10%] border-b border-slate-200 px-4 py-3 text-center">

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

              {/* =================================================
                  BODY
              ================================================= */}

              <tbody>

                {visibleDepartments.map(
                  (department) => (
                    <tr
                      key={department.id}
                      className="
                        group
                        border-b
                        border-slate-100

                        transition-all
                        duration-150

                        hover:bg-indigo-50/40
                      "
                    >

                      {/* =====================================
                          DEPARTMENT
                      ===================================== */}

                      <td className="px-4 py-2.5">

                        <div className="flex items-center gap-3">

                          <DepartmentIcon />

                          <div className="min-w-0">

                            <p
                              className="
                                text-[13px]
                                font-semibold
                                text-slate-800

                                transition-colors
                                duration-150

                                group-hover:text-indigo-600
                              "
                            >
                              {department.name}
                            </p>

                            <p
                              className="
                                mt-0.5
                                truncate
                                text-[10px]
                                text-slate-400
                              "
                            >
                              Ref:{" "}
                              {department.ref}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* =====================================
                          COMPANY
                      ===================================== */}

                      <td className="px-4 py-2.5">

                        <div className="flex items-center gap-2.5">

                          <CompanyLogo />

                          <span
                            className="
                              text-[12px]
                              font-medium
                              text-slate-700

                              transition-colors

                              group-hover:text-indigo-600
                            "
                          >
                            {department.company}
                          </span>

                        </div>

                      </td>

                      {/* =====================================
                          SECTIONS
                      ===================================== */}

                      <td className="px-4 py-2.5">

                        <Counter
                          value={
                            department.sections
                          }
                          type="sections"
                        />

                      </td>

                      {/* =====================================
                          EMPLOYEES
                      ===================================== */}

                      <td className="px-4 py-2.5">

                        <Counter
                          value={
                            department.employees
                          }
                          type="employees"
                        />

                      </td>

                      {/* =====================================
                          ACTIONS
                      ===================================== */}

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
                            title="Edit department"
                            onClick={() =>
                              openEditModal(
                                department
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
                            title="Delete department"
                            onClick={() =>
                              deleteDepartment(
                                department.id
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

                {/* =================================================
                    EMPTY
                ================================================= */}

                {visibleDepartments.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={5}
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
                          <FiSearch size={19} />
                        </div>

                        <p className="mt-3 text-sm font-semibold text-slate-600">
                          No departments found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try another department
                          or company name.
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

            {/* Result count */}

            <div className="text-[11px] text-slate-500">

              Showing{" "}

              <span className="font-semibold text-slate-700">
                {filteredDepartments.length ===
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
                {filteredDepartments.length}
              </span>

              {" "}departments

            </div>

            {/* Controls */}

            <div className="flex items-center gap-4">

              {/* Rows */}

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
                    <option value={5}>
                      5
                    </option>

                    <option value={10}>
                      10
                    </option>

                    <option value={13}>
                      13
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

            {/* Modal Header */}

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
                  {editingDepartment
                    ? "Edit Department"
                    : "Add Department"}
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  {editingDepartment
                    ? "Update department information."
                    : "Create a new department."}
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

            {/* Modal Body */}

            <div className="space-y-4 p-5">

              <FormInput
                label="Department Name *"
                value={form.name}
                onChange={(e) =>
                  updateForm(
                    "name",
                    e.target.value
                  )
                }
                placeholder="Enter department name"
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
                placeholder="department-reference"
              />

              <div className="grid grid-cols-2 gap-3">

                <FormInput
                  label="Sections"
                  type="number"
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

            </div>

            {/* Modal Footer */}

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
                onClick={saveDepartment}
                disabled={
                  !form.name.trim() ||
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

                {editingDepartment
                  ? "Save Changes"
                  : "Create Department"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}