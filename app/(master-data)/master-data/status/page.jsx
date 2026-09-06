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
  FiEye,
  FiEyeOff,
  FiTag,
  FiAlertCircle,
} from "react-icons/fi";

/* =========================================================
   INITIAL STATUS DATA
========================================================= */

const initialStatuses = [
  {
    id: 1,
    name: "Damaged",
    description: "If it has physical damage",
    color: "#EC0909",
    visible: true,
  },
  {
    id: 2,
    name: "In Repair",
    description: "Sent for Service",
    color: "#9CC6D8",
    visible: true,
  },
  {
    id: 3,
    name: "In Stock",
    description: "-",
    color: "#0010F5",
    visible: true,
  },
  {
    id: 4,
    name: "Running",
    description: "This is a running devices",
    color: "#0BF207",
    visible: true,
  },
  {
    id: 5,
    name: "Scrapped",
    description:
      "If it is completely dead and you are throwing it away",
    color: "#F51000",
    visible: true,
  },
  {
    id: 6,
    name: "Service Required",
    description:
      'A "Service Required" message usually means your device needs attention.',
    color: "#808080",
    visible: true,
  },
  {
    id: 7,
    name: "Available",
    description:
      "Asset is available and ready to be assigned.",
    color: "#16A34A",
    visible: true,
  },
  {
    id: 8,
    name: "Assigned",
    description:
      "Asset has been assigned to an employee.",
    color: "#7C3AED",
    visible: true,
  },
  {
    id: 9,
    name: "Under Maintenance",
    description:
      "Asset is currently under maintenance.",
    color: "#F59E0B",
    visible: true,
  },
  {
    id: 10,
    name: "Lost",
    description:
      "Asset has been reported as lost.",
    color: "#DC2626",
    visible: false,
  },
];

/* =========================================================
   STATUS BADGE
========================================================= */

function VisibilityBadge({ visible }) {
  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-md
        border
        px-2.5
        py-1
        text-[10px]
        font-semibold
        ${
          visible
            ? "border-emerald-200 bg-emerald-50 text-emerald-600"
            : "border-slate-200 bg-slate-50 text-slate-500"
        }
      `}
    >
      {visible ? (
        <>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Active
        </>
      ) : (
        <>
          <FiEyeOff size={10} />
          Hidden
        </>
      )}
    </span>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function StatusPage() {
  const [statuses, setStatuses] =
    useState(initialStatuses);

  const [search, setSearch] =
    useState("");

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [showModal, setShowModal] =
    useState(false);

  const [editingStatus, setEditingStatus] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    color: "#2563EB",
    visible: true,
  });

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredStatuses = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return statuses;
    }

    return statuses.filter(
      (status) =>
        status.name
          .toLowerCase()
          .includes(query) ||
        status.description
          .toLowerCase()
          .includes(query) ||
        status.color
          .toLowerCase()
          .includes(query)
    );
  }, [statuses, search]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStatuses.length /
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
    filteredStatuses.length
  );

  const visibleStatuses =
    filteredStatuses.slice(
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

  const openAddStatus = () => {
    setEditingStatus(null);

    setForm({
      name: "",
      description: "",
      color: "#2563EB",
      visible: true,
    });

    setShowModal(true);
  };

  /* =======================================================
     OPEN EDIT
  ======================================================= */

  const openEditStatus = (
    status
  ) => {
    setEditingStatus(status);

    setForm({
      name: status.name,
      description: status.description,
      color: status.color,
      visible: status.visible,
    });

    setShowModal(true);
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingStatus(null);

    setForm({
      name: "",
      description: "",
      color: "#2563EB",
      visible: true,
    });
  };

  /* =======================================================
     SAVE
  ======================================================= */

  const saveStatus = () => {
    if (!form.name.trim()) {
      return;
    }

    if (editingStatus) {
      setStatuses((current) =>
        current.map((status) =>
          status.id ===
          editingStatus.id
            ? {
                ...status,
                name: form.name.trim(),
                description:
                  form.description.trim() ||
                  "-",
                color: form.color,
                visible: form.visible,
              }
            : status
        )
      );
    } else {
      const newStatus = {
        id: Date.now(),
        name: form.name.trim(),
        description:
          form.description.trim() || "-",
        color: form.color,
        visible: form.visible,
      };

      setStatuses((current) => [
        ...current,
        newStatus,
      ]);
    }

    closeModal();
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const deleteStatus = (status) => {
    const confirmed =
      window.confirm(
        `Delete "${status.name}" status?`
      );

    if (!confirmed) {
      return;
    }

    setStatuses((current) =>
      current.filter(
        (item) =>
          item.id !== status.id
      )
    );

    if (
      currentPage > 1 &&
      visibleStatuses.length === 1
    ) {
      setCurrentPage(
        (page) => Math.max(1, page - 1)
      );
    }
  };

  /* =======================================================
     TOGGLE VISIBILITY
  ======================================================= */

  const toggleVisibility = (
    status
  ) => {
    setStatuses((current) =>
      current.map((item) =>
        item.id === status.id
          ? {
              ...item,
              visible: !item.visible,
            }
          : item
      )
    );
  };

  /* =======================================================
     RESET SEARCH
  ======================================================= */

  const resetSearch = () => {
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-full">

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
          Status
        </span>

      </div>

      {/* ===================================================
          CONTENT
      =================================================== */}

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
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            {/* SEARCH */}

            <div
              className="
                relative
                w-full
                sm:w-[380px]
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
                placeholder="Search by status name or description..."
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
                  onClick={resetSearch}
                  className="
                    absolute
                    right-2.5
                    top-1/2
                    flex
                    -translate-y-1/2
                    items-center
                    justify-center
                    text-slate-400
                    transition
                    hover:text-slate-700
                  "
                >
                  <FiX size={13} />
                </button>
              )}

            </div>

            {/* ADD BUTTON */}

            <button
              type="button"
              onClick={openAddStatus}
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
              Add Status
            </button>

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="overflow-x-auto">

            <table
              className="
                w-full
                min-w-[850px]
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
                      w-[22%]
                      border-b
                      border-slate-200
                      px-4
                      py-3
                      text-left
                    "
                  >
                    Status Name
                  </th>

                  <th
                    className="
                      w-[45%]
                      border-b
                      border-slate-200
                      px-4
                      py-3
                      text-left
                    "
                  >
                    Description
                  </th>

                  <th
                    className="
                      w-[18%]
                      border-b
                      border-slate-200
                      px-4
                      py-3
                      text-left
                    "
                  >
                    Color
                  </th>

                  <th
                    className="
                      w-[12%]
                      border-b
                      border-slate-200
                      px-4
                      py-3
                      text-left
                    "
                  >
                    Visibility
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

                {visibleStatuses.map(
                  (status) => (
                    <tr
                      key={status.id}
                      className="
                        group
                        border-b
                        border-slate-100
                        transition-all
                        duration-150
                        hover:bg-indigo-50/40
                      "
                    >

                      {/* STATUS */}

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
                              group-hover:scale-105
                              group-hover:bg-indigo-50
                              group-hover:text-indigo-500
                            "
                          >
                            <FiTag size={14} />
                          </div>

                          <div>

                            <p
                              className="
                                text-[12px]
                                font-bold
                                text-slate-800
                                transition-colors
                                group-hover:text-indigo-600
                              "
                            >
                              {status.name}
                            </p>

                            <p
                              className="
                                mt-0.5
                                text-[9px]
                                text-slate-400
                              "
                            >
                              Status #{status.id}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* DESCRIPTION */}

                      <td className="px-4 py-3">

                        <p
                          className="
                            max-w-[550px]
                            truncate
                            text-[11px]
                            text-slate-600
                          "
                          title={
                            status.description
                          }
                        >
                          {status.description}
                        </p>

                      </td>

                      {/* COLOR */}

                      <td className="px-4 py-3">

                        <div className="flex items-center gap-2.5">

                          <span
                            className="
                              h-3.5
                              w-3.5
                              rounded-full
                              border
                              border-black/10
                              shadow-sm
                            "
                            style={{
                              backgroundColor:
                                status.color,
                            }}
                          />

                          <span
                            className="
                              font-mono
                              text-[10px]
                              uppercase
                              text-slate-500
                            "
                          >
                            {status.color}
                          </span>

                        </div>

                      </td>

                      {/* VISIBILITY */}

                      <td className="px-4 py-3">

                        <button
                          type="button"
                          onClick={() =>
                            toggleVisibility(
                              status
                            )
                          }
                          title={
                            status.visible
                              ? "Hide status"
                              : "Show status"
                          }
                          className="
                            transition
                            hover:opacity-80
                          "
                        >
                          <VisibilityBadge
                            visible={
                              status.visible
                            }
                          />
                        </button>

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

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              openEditStatus(
                                status
                              )
                            }
                            title="Edit status"
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

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              deleteStatus(
                                status
                              )
                            }
                            title="Delete status"
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

                {visibleStatuses.length ===
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
                          <FiAlertCircle
                            size={19}
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
                          No statuses found
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-slate-400
                          "
                        >
                          Try changing your
                          search.
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
                {filteredStatuses.length
                  ? startIndex + 1
                  : 0}
              </span>

              {" "}to{" "}

              <span className="font-semibold text-slate-700">
                {endIndex}
              </span>

              {" "}of{" "}

              <span className="font-semibold text-slate-700">
                {filteredStatuses.length}
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
                    hover:border-indigo-200
                    hover:bg-indigo-50
                    hover:text-indigo-600
                    disabled:cursor-not-allowed
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
                    hover:border-indigo-200
                    hover:bg-indigo-50
                    hover:text-indigo-600
                    disabled:cursor-not-allowed
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
                  <FiTag size={16} />
                </div>

                <div>

                  <h2
                    className="
                      text-sm
                      font-bold
                      text-slate-800
                    "
                  >
                    {editingStatus
                      ? "Edit Status"
                      : "Add Status"}
                  </h2>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      text-slate-400
                    "
                  >
                    Configure the asset
                    status information.
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

            {/* BODY */}

            <div className="space-y-5 p-5">

              {/* STATUS NAME */}

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
                  Status Name
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
                  placeholder="Enter status name"
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

              </div>

              {/* DESCRIPTION */}

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
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    updateForm(
                      "description",
                      e.target.value
                    )
                  }
                  rows={3}
                  placeholder="Enter status description..."
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

              </div>

              {/* COLOR */}

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
                  Status Color
                </label>

                <div className="flex items-center gap-3">

                  <input
                    type="color"
                    value={form.color}
                    onChange={(e) =>
                      updateForm(
                        "color",
                        e.target.value
                      )
                    }
                    className="
                      h-10
                      w-14
                      cursor-pointer
                      rounded-md
                      border
                      border-slate-200
                      bg-white
                      p-1
                    "
                  />

                  <input
                    value={form.color}
                    onChange={(e) =>
                      updateForm(
                        "color",
                        e.target.value
                      )
                    }
                    className="
                      h-10
                      flex-1
                      rounded-md
                      border
                      border-slate-200
                      px-3
                      font-mono
                      text-xs
                      uppercase
                      text-slate-700
                      outline-none
                      transition
                      hover:border-slate-300
                      focus:border-indigo-400
                      focus:ring-2
                      focus:ring-indigo-100
                    "
                  />

                  <div
                    className="
                      h-10
                      w-10
                      rounded-md
                      border
                      border-black/10
                      shadow-sm
                    "
                    style={{
                      backgroundColor:
                        form.color,
                    }}
                  />

                </div>

              </div>

              {/* VISIBILITY */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  rounded-lg
                  border
                  border-slate-200
                  bg-slate-50
                  p-3
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-md
                      bg-white
                      text-slate-500
                      shadow-sm
                    "
                  >
                    {form.visible ? (
                      <FiEye size={14} />
                    ) : (
                      <FiEyeOff
                        size={14}
                      />
                    )}
                  </div>

                  <div>

                    <p className="text-xs font-semibold text-slate-700">
                      Visibility
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {form.visible
                        ? "This status is visible throughout the system."
                        : "This status is hidden from normal selections."}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateForm(
                      "visible",
                      !form.visible
                    )
                  }
                  className={`
                    relative
                    h-6
                    w-11
                    rounded-full
                    transition-colors
                    ${
                      form.visible
                        ? "bg-emerald-500"
                        : "bg-slate-300"
                    }
                  `}
                >

                  <span
                    className={`
                      absolute
                      top-1
                      h-4
                      w-4
                      rounded-full
                      bg-white
                      shadow-sm
                      transition-transform
                      ${
                        form.visible
                          ? "-translate-x-6"
                          : "translate-x-1"
                      }
                    `}
                  />

                </button>

              </div>

              {/* PREVIEW */}

              <div
                className="
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
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

                    <span
                      className="
                        h-3.5
                        w-3.5
                        rounded-full
                        border
                        border-black/10
                      "
                      style={{
                        backgroundColor:
                          form.color,
                      }}
                    />

                    <span className="text-xs font-bold text-slate-700">
                      {form.name ||
                        "Status Name"}
                    </span>

                  </div>

                  <VisibilityBadge
                    visible={
                      form.visible
                    }
                  />

                </div>

              </div>

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
                Cancel
              </button>

              <button
                type="button"
                onClick={saveStatus}
                disabled={!form.name.trim()}
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

                {editingStatus
                  ? "Save Changes"
                  : "Create Status"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}