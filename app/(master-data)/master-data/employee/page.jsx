"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  FiHome,
  FiChevronRight,
  FiChevronDown,
  FiChevronLeft,
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiCheck,
  FiCopy,
  FiPhone,
  FiMail,
  FiBriefcase,
  FiUser,
  FiCalendar,
  FiUsers,
  FiFilter,
  FiRefreshCw,
  FiGitBranch,
} from "react-icons/fi";
import { BsFillBuildingFill } from "react-icons/bs";

/* =========================================================
   COMPANIES
========================================================= */

const companies = [
  "Kaizer Knitwears Ltd.",
  "Color House Ltd.",
  "Kaizer Logistics",
  "MK Fashion Ltd.",
];

/* =========================================================
   DEPARTMENTS
========================================================= */

const departments = [
  {
    name: "Office Management",
    company: "Kaizer Knitwears Ltd.",
  },
  {
    name: "Cutting",
    company: "Kaizer Knitwears Ltd.",
  },
  {
    name: "Knitting & Dyeing",
    company: "Kaizer Knitwears Ltd.",
  },
  {
    name: "Maintenance",
    company: "Kaizer Knitwears Ltd.",
  },
  {
    name: "Merchandising & Planning",
    company: "Kaizer Knitwears Ltd.",
  },
  {
    name: "Quality Assurance",
    company: "Kaizer Knitwears Ltd.",
  },
  {
    name: "Reconing & Hanching",
    company: "Kaizer Knitwears Ltd.",
  },
  {
    name: "Sewing",
    company: "Kaizer Knitwears Ltd.",
  },
  {
    name: "Store & Accessories",
    company: "Kaizer Knitwears Ltd.",
  },
  {
    name: "Print",
    company: "Kaizer Knitwears Ltd.",
  },
  {
    name: "Sample",
    company: "Kaizer Knitwears Ltd.",
  },
  {
    name: "Transport & Logistics",
    company: "Kaizer Logistics",
  },
  {
    name: "Commercial",
    company: "Kaizer Logistics",
  },
  {
    name: "Knitting Staff",
    company: "MK Fashion Ltd.",
  },
];

/* =========================================================
   SECTIONS
========================================================= */

const sections = [
  {
    name: "Accounts & Audit",
    department: "Office Management",
  },
  {
    name: "Admin, HR & Compliance",
    department: "Office Management",
  },
  {
    name: "Central Control Wing (ED)",
    department: "Office Management",
  },
  {
    name: "Information & Technology",
    department: "Office Management",
  },
  {
    name: "Factory Management",
    department: "Office Management",
  },
  {
    name: "Cutting Staff",
    department: "Cutting",
  },
  {
    name: "Dyeing",
    department: "Knitting & Dyeing",
  },
  {
    name: "Knitting",
    department: "Knitting & Dyeing",
  },
  {
    name: "Maintenance (Electrical)",
    department: "Maintenance",
  },
  {
    name: "Merchandising",
    department: "Merchandising & Planning",
  },
  {
    name: "Planning",
    department: "Merchandising & Planning",
  },
  {
    name: "IE",
    department: "Merchandising & Planning",
  },
  {
    name: "Research & Development",
    department: "Merchandising & Planning",
  },
  {
    name: "Quality (QPC)",
    department: "Quality Assurance",
  },
  {
    name: "Quality Staff",
    department: "Quality Assurance",
  },
  {
    name: "Staff (Reconing & Hanching)",
    department: "Reconing & Hanching",
  },
  {
    name: "Sewing Staff",
    department: "Sewing",
  },
  {
    name: "Fabric (Store)",
    department: "Store & Accessories",
  },
  {
    name: "Hand & Stock",
    department: "Store & Accessories",
  },
  {
    name: "Stock",
    department: "Store & Accessories",
  },
  {
    name: "Store (Accessories)",
    department: "Store & Accessories",
  },
  {
    name: "Yarn (Store)",
    department: "Store & Accessories",
  },
  {
    name: "Print Staff",
    department: "Print",
  },
  {
    name: "Technical",
    department: "Sample",
  },
  {
    name: "Office Staff",
    department: "Knitting Staff",
  },
  {
    name: "Production Staff",
    department: "Knitting Staff",
  },
  {
    name: "Transport",
    department: "Transport & Logistics",
  },
  {
    name: "Commercial",
    department: "Commercial",
  },
];

/* =========================================================
   SAMPLE EMPLOYEE DATA
========================================================= */

const employeeSeeds = [
  [
    "N/A",
    "000000",
    "Kaizer Knitwears Ltd.",
    "Office Management",
    "Information & Technology",
    "N/A",
    "N/A",
    "Active",
    "0001",
  ],
  [
    "NABRUL ISLAM NAEEM",
    "113837",
    "Kaizer Knitwears Ltd.",
    "Merchandising & Planning",
    "Planning",
    "Reporter (Planning)",
    "01840624468",
    "Active",
    "2022-12-10",
  ],
  [
    "MD. EBAUL MIA",
    "400516",
    "Kaizer Knitwears Ltd.",
    "Cutting",
    "Cutting Staff",
    "Cutting (Input)",
    "01633159946",
    "Active",
    "2018-07-04",
  ],
  [
    "MD. KABIR HOSSAIN",
    "400632",
    "Kaizer Knitwears Ltd.",
    "Cutting",
    "Cutting Staff",
    "Jr. Inputman",
    "01640602522",
    "Active",
    "2021-12-12",
  ],
  [
    "MD. SHAHIN ALOM",
    "400776",
    "Kaizer Knitwears Ltd.",
    "Cutting",
    "Cutting Staff",
    "WRITERMAN",
    "01741210148",
    "Active",
    "2023-10-07",
  ],
  [
    "MD. NAZRUL ISLAM",
    "600005",
    "Kaizer Knitwears Ltd.",
    "Cutting",
    "Cutting Staff",
    "Asst. Manager",
    "01629534989",
    "Active",
    "2006-01-10",
  ],
  [
    "MD. MASUM HOSSEN",
    "600018",
    "Kaizer Knitwears Ltd.",
    "Knitting & Dyeing",
    "Dyeing",
    "Co-Ordinator",
    "01723112847",
    "Active",
    "2008-11-01",
  ],
  [
    "MD. KHADIMUL ISLAM",
    "600053",
    "Kaizer Knitwears Ltd.",
    "Office Management",
    "Admin, HR & Compliance",
    "Manager (Admin, HR & Compliance)",
    "01714993743",
    "Active",
    "2013-03-20",
  ],
  [
    "MD. GOLAM MOSTOFA",
    "600060",
    "Kaizer Knitwears Ltd.",
    "Knitting & Dyeing",
    "Knitting",
    "Deputy Manager (Knitting)",
    "01736690733",
    "Active",
    "2013-09-01",
  ],
  [
    "MD. KAMRUZZAMAN",
    "600096",
    "Kaizer Knitwears Ltd.",
    "Merchandising & Planning",
    "Merchandising",
    "AGM (Marketing)",
    "01716581791",
    "Active",
    "2013-09-07",
  ],
];

/* =========================================================
   MORE SAMPLE NAMES
========================================================= */

const firstNames = [
  "MD. RAHIM",
  "MD. HASAN",
  "MD. RAKIB",
  "MD. SHAKIL",
  "MD. IMRAN",
  "MD. RONY",
  "MD. TANVIR",
  "MD. ARIF",
  "MD. SAIFUL",
  "MD. MAHBUB",
  "MD. SOHEL",
  "MD. RASEL",
  "MD. JAHID",
  "MD. FARUK",
  "MD. SHOHAG",
  "MD. MIZAN",
  "MD. ALAMIN",
  "MD. NASIR",
  "MD. SHAMIM",
  "MD. SUMON",
];

const lastNames = [
  "HOSSAIN",
  "ISLAM",
  "AHMED",
  "MIA",
  "KHAN",
  "RAHMAN",
  "KABIR",
  "CHOWDHURY",
  "HASAN",
  "ALI",
];

const designations = [
  "Executive",
  "Senior Executive",
  "Officer",
  "Senior Officer",
  "Assistant Manager",
  "Manager",
  "Supervisor",
  "Coordinator",
  "Jr. Officer",
  "Operator",
];

/* =========================================================
   GENERATE 100 EMPLOYEES
========================================================= */

function generateEmployees() {
  const result = employeeSeeds.map(
    (item, index) => ({
      id: index + 1,
      name: item[0],
      code: item[1],
      company: item[2],
      department: item[3],
      section: item[4],
      designation: item[5],
      contact: item[6],
      status: item[7],
      joiningDate:
        item[8] === "0001"
          ? "2001-01-01"
          : item[8],
      personalEmail:
        item[0] === "N/A"
          ? ""
          : `${item[0]
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, ".")
              .replace(/^\./, "")}@gmail.com`,
      officeEmail:
        item[0] === "N/A"
          ? ""
          : `${item[0]
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, ".")
              .replace(/^\./, "")}@kaizerknitwear.com`,
    })
  );

  for (let i = result.length; i < 100; i++) {
    const first =
      firstNames[i % firstNames.length];

    const last =
      lastNames[
        Math.floor(i / firstNames.length) %
          lastNames.length
      ];

    const department =
      departments[
        i % departments.length
      ];

    const departmentSections =
      sections.filter(
        (section) =>
          section.department ===
          department.name
      );

    const section =
      departmentSections.length
        ? departmentSections[
            i % departmentSections.length
          ].name
        : "General";

    const designation =
      designations[
        i % designations.length
      ];

    const name = `${first} ${last}`;

    const code = String(
      600100 + i
    );

    const month =
      String((i % 12) + 1).padStart(
        2,
        "0"
      );

    const day =
      String((i % 27) + 1).padStart(
        2,
        "0"
      );

    const year =
      2010 + (i % 15);

    result.push({
      id: i + 1,
      name,
      code,
      company: department.company,
      department: department.name,
      section,
      designation,
      contact: `01${String(
        700000000 + i * 731
      ).slice(0, 9)}`,
      status:
        i % 17 === 0
          ? "Inactive"
          : "Active",
      joiningDate: `${year}-${month}-${day}`,
      personalEmail:
        `${name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, ".")}${i}@gmail.com`,
      officeEmail:
        `${name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, ".")}${i}@kaizerknitwear.com`,
    });
  }

  return result;
}

/* =========================================================
   SMALL SELECT
========================================================= */

function SelectField({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="
          h-10
          w-full
          appearance-none
          rounded-md
          border
          border-slate-200
          bg-white
          px-3
          pr-9
          text-xs
          text-slate-700
          outline-none
          transition-all
          duration-200
          hover:border-slate-300
          focus:border-indigo-400
          focus:ring-2
          focus:ring-indigo-100
          disabled:cursor-not-allowed
          disabled:bg-slate-50
          disabled:text-slate-400
        "
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={
              typeof option === "string"
                ? option
                : option.name
            }
            value={
              typeof option === "string"
                ? option
                : option.name
            }
          >
            {typeof option === "string"
              ? option
              : option.name}
          </option>
        ))}
      </select>

      <FiChevronDown
        size={13}
        className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />
    </div>
  );
}

/* =========================================================
   FORM INPUT
========================================================= */

function FormInput({
  label,
  required,
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
          font-medium
          text-slate-700
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-rose-500">
            *
          </span>
        )}
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
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const active =
    status === "Active";

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-sm
        border
        px-2.5
        py-1
        text-[10px]
        font-semibold
        ${
          active
            ? "border-emerald-200 bg-emerald-50 text-emerald-600"
            : "border-rose-200 bg-rose-50 text-rose-600"
        }
      `}
    >
      <span
        className={`
          h-1.5
          w-1.5
          rounded-full
          ${
            active
              ? "bg-emerald-500"
              : "bg-rose-500"
          }
        `}
      />

      {status}
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function EmployeePage() {
  const [employees, setEmployees] =
    useState(generateEmployees);

  /* FILTERS */

  const [companyFilter, setCompanyFilter] =
    useState("");

  const [departmentFilter, setDepartmentFilter] =
    useState("");

  const [sectionFilter, setSectionFilter] =
    useState("");

  const [search, setSearch] =
    useState("");

  /* PAGINATION */

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const [currentPage, setCurrentPage] =
    useState(1);

  /* MODAL */

  const [showModal, setShowModal] =
    useState(false);

  const [editingEmployee, setEditingEmployee] =
    useState(null);

  /* COPY */

  const [copiedCode, setCopiedCode] =
    useState(null);

  /* FORM */

  const emptyForm = {
    code: "",
    name: "",
    company: "",
    department: "",
    section: "",
    designation: "",
    contact: "",
    personalEmail: "",
    officeEmail: "",
    joiningDate: "",
    status: "Active",
  };

  const [form, setForm] =
    useState(emptyForm);

  /* =======================================================
     FILTERED DEPARTMENTS
  ======================================================= */

  const availableDepartments =
    useMemo(() => {
      if (!companyFilter) {
        return departments;
      }

      return departments.filter(
        (department) =>
          department.company ===
          companyFilter
      );
    }, [companyFilter]);

  /* =======================================================
     FILTERED SECTIONS
  ======================================================= */

  const availableFilterSections =
    useMemo(() => {
      let result = sections;

      if (departmentFilter) {
        result = result.filter(
          (section) =>
            section.department ===
            departmentFilter
        );
      }

      return result;
    }, [departmentFilter]);

  /* =======================================================
     FORM DEPARTMENTS
  ======================================================= */

  const formDepartments =
    useMemo(() => {
      if (!form.company) {
        return departments;
      }

      return departments.filter(
        (department) =>
          department.company ===
          form.company
      );
    }, [form.company]);

  /* =======================================================
     FORM SECTIONS
  ======================================================= */

  const formSections =
    useMemo(() => {
      if (!form.department) {
        return sections;
      }

      return sections.filter(
        (section) =>
          section.department ===
          form.department
      );
    }, [form.department]);

  /* =======================================================
     FILTER EMPLOYEES
  ======================================================= */

  const filteredEmployees =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return employees.filter(
        (employee) => {
          const matchesCompany =
            !companyFilter ||
            employee.company ===
              companyFilter;

          const matchesDepartment =
            !departmentFilter ||
            employee.department ===
              departmentFilter;

          const matchesSection =
            !sectionFilter ||
            employee.section ===
              sectionFilter;

          const matchesSearch =
            !query ||
            employee.name
              .toLowerCase()
              .includes(query) ||
            employee.code
              .toLowerCase()
              .includes(query) ||
            employee.designation
              .toLowerCase()
              .includes(query) ||
            employee.contact
              .toLowerCase()
              .includes(query) ||
            employee.personalEmail
              .toLowerCase()
              .includes(query) ||
            employee.officeEmail
              .toLowerCase()
              .includes(query);

          return (
            matchesCompany &&
            matchesDepartment &&
            matchesSection &&
            matchesSearch
          );
        }
      );
    }, [
      employees,
      companyFilter,
      departmentFilter,
      sectionFilter,
      search,
    ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredEmployees.length /
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
    filteredEmployees.length
  );

  const visibleEmployees =
    filteredEmployees.slice(
      startIndex,
      endIndex
    );

  /* =======================================================
     FORM UPDATE
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
     OPEN ADD
  ======================================================= */

  const openAddEmployee = () => {
    setEditingEmployee(null);

    setForm({
      ...emptyForm,
      code: `EMP-${String(
        employees.length + 1001
      ).padStart(4, "0")}`,
      joiningDate:
        new Date()
          .toISOString()
          .split("T")[0],
    });

    setShowModal(true);
  };

  /* =======================================================
     OPEN EDIT
  ======================================================= */

  const openEditEmployee = (
    employee
  ) => {
    setEditingEmployee(employee);

    setForm({
      code: employee.code,
      name: employee.name,
      company: employee.company,
      department:
        employee.department,
      section: employee.section,
      designation:
        employee.designation,
      contact: employee.contact,
      personalEmail:
        employee.personalEmail,
      officeEmail:
        employee.officeEmail,
      joiningDate:
        employee.joiningDate,
      status: employee.status,
    });

    setShowModal(true);
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
    setForm(emptyForm);
  };

  /* =======================================================
     SAVE EMPLOYEE
  ======================================================= */

  const saveEmployee = () => {
    if (
      !form.code.trim() ||
      !form.name.trim() ||
      !form.company ||
      !form.department ||
      !form.designation ||
      !form.contact ||
      !form.joiningDate
    ) {
      return;
    }

    if (editingEmployee) {
      setEmployees((current) =>
        current.map((employee) =>
          employee.id ===
          editingEmployee.id
            ? {
                ...employee,
                ...form,
              }
            : employee
        )
      );
    } else {
      const newEmployee = {
        id: Date.now(),
        ...form,
      };

      setEmployees((current) => [
        newEmployee,
        ...current,
      ]);
    }

    closeModal();
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const deleteEmployee = (
    employee
  ) => {
    const confirmed =
      window.confirm(
        `Delete ${employee.name}?`
      );

    if (!confirmed) return;

    setEmployees((current) =>
      current.filter(
        (item) =>
          item.id !== employee.id
      )
    );
  };

  /* =======================================================
     COPY CODE
  ======================================================= */

  const copyCode = async (
    code
  ) => {
    try {
      await navigator.clipboard.writeText(
        code
      );

      setCopiedCode(code);

      setTimeout(() => {
        setCopiedCode(null);
      }, 1200);
    } catch {}
  };

  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const resetFilters = () => {
    setCompanyFilter("");
    setDepartmentFilter("");
    setSectionFilter("");
    setSearch("");
    setCurrentPage(1);
  };

  /* =======================================================
     COMPANY CHANGE
  ======================================================= */

  const handleCompanyFilter = (
    value
  ) => {
    setCompanyFilter(value);
    setDepartmentFilter("");
    setSectionFilter("");
    setCurrentPage(1);
  };

  /* =======================================================
     DEPARTMENT CHANGE
  ======================================================= */

  const handleDepartmentFilter = (
    value
  ) => {
    setDepartmentFilter(value);
    setSectionFilter("");
    setCurrentPage(1);
  };

  /* =======================================================
     FORM COMPANY CHANGE
  ======================================================= */

  const handleFormCompany = (
    value
  ) => {
    setForm((current) => ({
      ...current,
      company: value,
      department: "",
      section: "",
    }));
  };

  /* =======================================================
     FORM DEPARTMENT CHANGE
  ======================================================= */

  const handleFormDepartment = (
    value
  ) => {
    setForm((current) => ({
      ...current,
      department: value,
      section: "",
    }));
  };

  return (
    <>
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

        <span
          className="
            text-[11px]
            font-semibold
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          Master Data
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
          Employee
        </span>
      </div>

      {/* =================================================
          PAGE
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
              FILTER BAR
          ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-2
              border-b
              border-slate-100
              p-3
              xl:flex-row
              xl:items-center
            "
          >

            {/* COMPANY */}

            <div className="min-w-[210px] flex-1">
              <SelectField
                value={companyFilter}
                onChange={(e) =>
                  handleCompanyFilter(
                    e.target.value
                  )
                }
                options={companies}
                placeholder="-- All Companies --"
              />
            </div>

            {/* DEPARTMENT */}

            <div className="min-w-[210px] flex-1">
              <SelectField
                value={departmentFilter}
                onChange={(e) =>
                  handleDepartmentFilter(
                    e.target.value
                  )
                }
                options={availableDepartments}
                placeholder="-- All Departments --"
              />
            </div>

            {/* SECTION */}

            <div className="min-w-[210px] flex-1">
              <SelectField
                value={sectionFilter}
                onChange={(e) => {
                  setSectionFilter(
                    e.target.value
                  );
                  setCurrentPage(1);
                }}
                options={
                  availableFilterSections
                }
                placeholder="-- All Sections --"
              />
            </div>

            {/* SEARCH */}

            <div className="relative min-w-[230px] flex-1">

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
                placeholder="Search employees..."
                className="
                  h-10
                  w-full
                  rounded-md
                  border
                  border-slate-200
                  bg-white
                  pl-9
                  pr-3
                  text-xs
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                  transition-all
                  hover:border-slate-300
                  focus:border-indigo-400
                  focus:ring-2
                  focus:ring-indigo-100
                "
              />

            </div>

            {/* RESET */}

            <button
              type="button"
              onClick={resetFilters}
              className="
                inline-flex
                h-10
                items-center
                justify-center
                gap-1.5
                rounded-md
                border
                border-indigo-200
                bg-indigo-50
                px-3
                text-xs
                font-semibold
                text-indigo-600
                transition-all
                hover:bg-indigo-100
                active:scale-[0.98]
              "
            >
              <FiFilter size={13} />
              Filter
            </button>

            {/* ADD */}

            <button
              type="button"
              onClick={
                openAddEmployee
              }
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
              Add Employee
            </button>

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="overflow-x-auto">

            <table
              className="
                w-full
                min-w-[1150px]
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

                  <th className="w-12 border-b border-slate-200 px-3 py-3 text-center">
                    #
                  </th>

                  <th className="w-[20%] border-b border-slate-200 px-4 py-3 text-left">
                    Employee Details
                  </th>

                  <th className="w-[38%] border-b border-slate-200 px-4 py-3 text-left">
                    Company & Dept
                  </th>

                  <th className="w-[22%] border-b border-slate-200 px-4 py-3 text-left">
                    Contact
                  </th>

                  <th className="w-[14%] border-b border-slate-200 px-4 py-3 text-left">
                    Status
                  </th>

                  <th className="w-[70px] border-b border-slate-200 px-3 py-3" />

                </tr>

              </thead>

              <tbody>

                {visibleEmployees.map(
                  (employee, index) => (
                    <tr
                      key={employee.id}
                      className="
                        group
                        border-b
                        border-slate-100
                        transition-all
                        duration-150
                        hover:bg-indigo-50/40
                      "
                    >

                      {/* NUMBER */}

                      <td
                        className="
                          px-3
                          py-3
                          text-center
                          text-[10px]
                          font-medium
                          text-slate-400
                        "
                      >
                        {startIndex +
                          index +
                          1}
                      </td>

                      {/* EMPLOYEE */}

                      <td className="px-4 py-3">

                        <div className="flex items-start gap-3">

                          <div
                            className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-md
                              bg-indigo-50
                              text-indigo-500
                              transition-all
                              duration-200
                              group-hover:scale-105
                              group-hover:bg-indigo-100
                            "
                          >
                            <FiUser
                              size={14}
                            />
                          </div>

                          <div className="min-w-0">

                            <p
                              className="
                                truncate
                                text-[12px]
                                font-bold
                                text-slate-800
                                group-hover:text-indigo-600
                              "
                            >
                              {employee.name}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5">

                              <span
                                className="
                                  rounded
                                  border
                                  border-slate-200
                                  bg-slate-50
                                  px-2
                                  py-0.5
                                  text-[9px]
                                  font-semibold
                                  text-slate-500
                                "
                              >
                                {employee.code}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  copyCode(
                                    employee.code
                                  )
                                }
                                className="
                                  text-slate-300
                                  transition
                                  hover:text-indigo-500
                                "
                                title="Copy employee code"
                              >
                                {copiedCode ===
                                employee.code ? (
                                  <FiCheck
                                    size={11}
                                  />
                                ) : (
                                  <FiCopy
                                    size={11}
                                  />
                                )}
                              </button>

                            </div>

                          </div>

                        </div>

                      </td>

                      {/* COMPANY / DEPARTMENT */}

                      <td className="px-4 py-3">

                        <div className="flex items-start gap-2">

                          <BsFillBuildingFill
                            size={13}
                            className="
                              mt-0.5
                              shrink-0
                              text-slate-400
                            "
                          />

                          <div className="min-w-0">

                            <div className="flex items-center gap-1.5">

                              <span
                                className="
                                  truncate
                                  text-[11px]
                                  font-semibold
                                  text-slate-700
                                "
                              >
                                {employee.company}
                              </span>

                              <span className="text-slate-300">
                                /
                              </span>

                              <span
                                className="
                                  truncate
                                  text-[11px]
                                  text-slate-600
                                "
                              >
                                {employee.department}
                              </span>

                            </div>

                            <div className="mt-1 flex items-center gap-1.5">

                              <FiGitBranchIcon />

                              <span
                                className="
                                  truncate
                                  text-[10px]
                                  text-slate-500
                                "
                              >
                                {employee.section}
                              </span>

                              <span className="text-slate-300">
                                •
                              </span>

                              <span
                                className="
                                  truncate
                                  text-[10px]
                                  font-medium
                                  text-slate-600
                                "
                              >
                                {employee.designation}
                              </span>

                            </div>

                          </div>

                        </div>

                      </td>

                      {/* CONTACT */}

                      <td className="px-4 py-3">

                        <div className="space-y-1">

                          {employee.contact ? (
                            <div className="flex items-center gap-2">

                              <FiPhone
                                size={11}
                                className="text-slate-400"
                              />

                              <span
                                className="
                                  text-[10px]
                                  text-slate-600
                                "
                              >
                                {employee.contact}
                              </span>

                            </div>
                          ) : null}

                          {employee.officeEmail ? (
                            <div className="flex items-center gap-2">

                              <FiMail
                                size={11}
                                className="text-slate-400"
                              />

                              <span
                                className="
                                  max-w-[180px]
                                  truncate
                                  text-[9px]
                                  text-slate-400
                                "
                                title={
                                  employee.officeEmail
                                }
                              >
                                {
                                  employee.officeEmail
                                }
                              </span>

                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-400">
                              N/A
                            </span>
                          )}

                        </div>

                      </td>

                      {/* STATUS */}

                      <td className="px-4 py-3">

                        <StatusBadge
                          status={
                            employee.status
                          }
                        />

                        <p
                          className="
                            mt-1
                            text-[9px]
                            text-slate-400
                          "
                        >
                          Joined:{" "}
                          {employee.joiningDate ===
                          "2001-01-01"
                            ? "Jan 01, 2001"
                            : new Date(
                                employee.joiningDate
                              ).toLocaleDateString(
                                "en-US",
                                {
                                  month:
                                    "short",
                                  day: "2-digit",
                                  year: "numeric",
                                }
                              )}
                        </p>

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
                              openEditEmployee(
                                employee
                              )
                            }
                            title="Edit employee"
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
                            <FiEdit2
                              size={12}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteEmployee(
                                employee
                              )
                            }
                            title="Delete employee"
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
                            <FiTrash2
                              size={12}
                            />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

                {visibleEmployees.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={6}
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
                          <FiUsers size={19} />
                        </div>

                        <p className="mt-3 text-sm font-semibold text-slate-600">
                          No employees found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try changing your
                          filters or search.
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

            <div
              className="
                text-[11px]
                text-slate-500
              "
            >
              Showing{" "}

              <span className="font-semibold text-slate-700">
                {filteredEmployees.length
                  ? startIndex + 1
                  : 0}
              </span>

              {" "}to{" "}

              <span className="font-semibold text-slate-700">
                {endIndex}
              </span>

              {" "}of{" "}

              <span className="font-semibold text-slate-700">
                {filteredEmployees.length}
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
                      hover:border-slate-300
                      focus:border-indigo-400
                    "
                  >
                    <option value={10}>
                      10
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
                    <option value={100}>
                      100
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
                    text-slate-500
                    transition
                    hover:border-indigo-200
                    hover:bg-indigo-50
                    hover:text-indigo-600
                    disabled:opacity-40
                  "
                >
                  <FiChevronLeft size={14} />
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
                    hover:border-indigo-200
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
          ADD / EDIT EMPLOYEE
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
              flex
              max-h-[92vh]
              w-full
              max-w-4xl
              flex-col
              overflow-hidden
              rounded-xl
              bg-white
              shadow-2xl
            "
          >

            {/* MODAL HEADER */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-between
                border-b
                border-slate-100
                px-5
                py-4
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-md
                    bg-indigo-50
                    text-indigo-600
                  "
                >
                  <FiUser size={17} />
                </div>

                <div>

                  <h2
                    className="
                      text-base
                      font-bold
                      text-slate-800
                    "
                  >
                    {editingEmployee
                      ? "Edit Employee"
                      : "Create Employee"}
                  </h2>

                  <p
                    className="
                      mt-0.5
                      text-[11px]
                      text-slate-400
                    "
                  >
                    {editingEmployee
                      ? "Update employee information."
                      : "Add a new employee to the organization."}
                  </p>

                </div>

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

            {/* MODAL BODY */}

            <div className="overflow-y-auto p-5">

              <div className="space-y-5">

                {/* =========================================
                    EMPLOYEE INFORMATION
                ========================================= */}

                <div>

                  <div className="mb-4 flex items-center gap-2">

                    <FiBriefcase
                      size={14}
                      className="text-indigo-500"
                    />

                    <h3
                      className="
                        text-sm
                        font-bold
                        text-slate-800
                      "
                    >
                      Employee Information
                    </h3>

                  </div>

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-4
                      md:grid-cols-2
                    "
                  >

                    <FormInput
                      label="Employee Code"
                      required
                      value={form.code}
                      onChange={(e) =>
                        updateForm(
                          "code",
                          e.target.value
                        )
                      }
                      placeholder="Enter Employee Code (e.g., EMP-1001)"
                    />

                    <FormInput
                      label="Employee Name"
                      required
                      value={form.name}
                      onChange={(e) =>
                        updateForm(
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Enter Full Name"
                    />

                    {/* COMPANY */}

                    <div>

                      <label
                        className="
                          mb-1.5
                          block
                          text-xs
                          font-medium
                          text-slate-700
                        "
                      >
                        Company
                        <span className="ml-1 text-rose-500">
                          *
                        </span>
                      </label>

                      <SelectField
                        value={form.company}
                        onChange={(e) =>
                          handleFormCompany(
                            e.target.value
                          )
                        }
                        options={companies}
                        placeholder="---------"
                      />

                    </div>

                    {/* DEPARTMENT */}

                    <div>

                      <label
                        className="
                          mb-1.5
                          block
                          text-xs
                          font-medium
                          text-slate-700
                        "
                      >
                        Department
                      </label>

                      <SelectField
                        value={
                          form.department
                        }
                        onChange={(e) =>
                          handleFormDepartment(
                            e.target.value
                          )
                        }
                        options={
                          formDepartments
                        }
                        placeholder="---------"
                        disabled={
                          !form.company
                        }
                      />

                    </div>

                    {/* SECTION */}

                    <div>

                      <label
                        className="
                          mb-1.5
                          block
                          text-xs
                          font-medium
                          text-slate-700
                        "
                      >
                        Section
                      </label>

                      <SelectField
                        value={
                          form.section
                        }
                        onChange={(e) =>
                          updateForm(
                            "section",
                            e.target.value
                          )
                        }
                        options={
                          formSections
                        }
                        placeholder="---------"
                        disabled={
                          !form.department
                        }
                      />

                    </div>

                    <FormInput
                      label="Designation"
                      required
                      value={
                        form.designation
                      }
                      onChange={(e) =>
                        updateForm(
                          "designation",
                          e.target.value
                        )
                      }
                      placeholder="Enter Designation"
                    />

                    <FormInput
                      label="Contact Number"
                      required
                      value={form.contact}
                      onChange={(e) =>
                        updateForm(
                          "contact",
                          e.target.value
                        )
                      }
                      placeholder="Enter Phone Number"
                      type="tel"
                    />

                    <FormInput
                      label="Personal Email"
                      value={
                        form.personalEmail
                      }
                      onChange={(e) =>
                        updateForm(
                          "personalEmail",
                          e.target.value
                        )
                      }
                      placeholder="Personal Email Address"
                      type="email"
                    />

                    <FormInput
                      label="Office Email"
                      value={
                        form.officeEmail
                      }
                      onChange={(e) =>
                        updateForm(
                          "officeEmail",
                          e.target.value
                        )
                      }
                      placeholder="Office Email Address"
                      type="email"
                    />

                    <FormInput
                      label="Joining Date"
                      required
                      value={
                        form.joiningDate
                      }
                      onChange={(e) =>
                        updateForm(
                          "joiningDate",
                          e.target.value
                        )
                      }
                      placeholder="mm/dd/yyyy"
                      type="date"
                    />

                    {/* STATUS */}

                    <div>

                      <label
                        className="
                          mb-1.5
                          block
                          text-xs
                          font-medium
                          text-slate-700
                        "
                      >
                        Status
                        <span className="ml-1 text-rose-500">
                          *
                        </span>
                      </label>

                      <SelectField
                        value={form.status}
                        onChange={(e) =>
                          updateForm(
                            "status",
                            e.target.value
                          )
                        }
                        options={[
                          "Active",
                          "Inactive",
                          "On Leave",
                          "Suspended",
                        ]}
                        placeholder="---------"
                      />

                    </div>

                  </div>

                </div>

                {/* PREVIEW */}

                <div
                  className="
                    rounded-lg
                    border
                    border-indigo-100
                    bg-indigo-50/50
                    p-4
                  "
                >

                  <div className="flex items-start gap-3">

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-md
                        bg-white
                        text-indigo-500
                        shadow-sm
                      "
                    >
                      <FiUser size={15} />
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs font-bold text-slate-700">
                        Employee Preview
                      </p>

                      <p className="mt-1 text-[11px] text-slate-500">

                        {form.name ||
                          "Employee Name"}

                        {" • "}

                        {form.designation ||
                          "Designation"}

                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">

                        {form.company ||
                          "Company"}

                        {" / "}

                        {form.department ||
                          "Department"}

                        {" / "}

                        {form.section ||
                          "Section"}

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div
              className="
                flex
                shrink-0
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
                onClick={saveEmployee}
                disabled={
                  !form.code.trim() ||
                  !form.name.trim() ||
                  !form.company ||
                  !form.department ||
                  !form.designation ||
                  !form.contact ||
                  !form.joiningDate
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

                {editingEmployee
                  ? "Save Changes"
                  : "Create Employee"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

/* =========================================================
   SMALL HIERARCHY ICON
========================================================= */

function FiGitBranchIcon() {
  return (
    <FiGitBranch
      size={10}
      className="text-emerald-500"
    />
  );
}