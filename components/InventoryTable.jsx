"use client";

import { useEffect, useMemo, useState } from "react";

import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiPrinter,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiCheck,
  FiCopy,
  FiRouter,
  FiMonitor,
  FiCpu,
  FiServer,
  FiWifi,
} from "react-icons/fi";

export default function InventoryTable({
  config,
}) {
  const {
    title,
    breadcrumb = "Inventory",
    storageKey,
    icon: PageIcon = FiMonitor,
    columns,
    initialData,
    fields,
    filters = [],
  } = config;

  const [items, setItems] = useState(initialData);

  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] =
    useState({});

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(15);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  const [deleteItem, setDeleteItem] =
    useState(null);

  const [form, setForm] = useState({});

  const [error, setError] =
    useState("");

  useEffect(() => {
    const saved =
      localStorage.getItem(storageKey);

    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems(initialData);
      }
    } else {
      localStorage.setItem(
        storageKey,
        JSON.stringify(initialData)
      );
    }
  }, [storageKey, initialData]);

  const saveItems = (data) => {
    setItems(data);

    localStorage.setItem(
      storageKey,
      JSON.stringify(data)
    );
  };

  const filteredItems = useMemo(() => {
    const q = search
      .toLowerCase()
      .trim();

    return items.filter((item) => {
      const searchMatch =
        !q ||
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(q);

      const filterMatch = filters.every(
        (filter) => {
          const selected =
            filterValues[filter.key];

          if (!selected) return true;

          return (
            String(item[filter.key]) ===
            String(selected)
          );
        }
      );

      return searchMatch && filterMatch;
    });
  }, [
    items,
    search,
    filters,
    filterValues,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredItems.length / rows
    )
  );

  const safePage = Math.min(
    page,
    totalPages
  );

  const start =
    (safePage - 1) * rows;

  const currentItems =
    filteredItems.slice(
      start,
      start + rows
    );

  useEffect(() => {
    setPage(1);
  }, [
    search,
    filterValues,
    rows,
  ]);

  const openAdd = () => {
    const initial = {};

    fields.forEach((field) => {
      initial[field.key] =
        field.defaultValue || "";
    });

    setForm(initial);
    setEditing(null);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setForm({ ...item });
    setEditing(item);
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setError("");
  };

  const updateForm = (
    key,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const field of fields) {
      if (
        field.required &&
        !String(
          form[field.key] || ""
        ).trim()
      ) {
        setError(
          `${field.label} is required.`
        );
        return;
      }
    }

    let updated;

    if (editing) {
      updated = items.map((item) =>
        item.id === editing.id
          ? {
              ...item,
              ...form,
            }
          : item
      );
    } else {
      updated = [
        ...items,
        {
          ...form,
          id: Date.now(),
        },
      ];
    }

    saveItems(updated);
    closeModal();
  };

  const deleteCurrent = () => {
    if (!deleteItem) return;

    const updated =
      items.filter(
        (item) =>
          item.id !== deleteItem.id
      );

    saveItems(updated);
    setDeleteItem(null);
  };

  const copyValue = async (
    value
  ) => {
    try {
      await navigator.clipboard.writeText(
        String(value)
      );
    } catch {}
  };

  return (
    <div className="min-h-[calc(100vh-49px)] bg-[#f7f9fc] px-3 py-3 sm:px-4">

      {/* BREADCRUMB */}

      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide">

        <span className="text-slate-400">
          Dashboard
        </span>

        <span className="text-slate-300">
          ›
        </span>

        <span className="text-slate-400">
          {breadcrumb}
        </span>

        <span className="text-slate-300">
          ›
        </span>

        <span className="text-[#14213d]">
          {title}
        </span>

      </div>

      {/* CARD */}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

        {/* TOOLBAR */}

        <div className="flex flex-col gap-2 border-b border-slate-200 p-3 xl:flex-row xl:items-center">

          {filters.map((filter) => (
            <select
              key={filter.key}
              value={
                filterValues[
                  filter.key
                ] || ""
              }
              onChange={(e) =>
                setFilterValues(
                  (current) => ({
                    ...current,
                    [filter.key]:
                      e.target.value,
                  })
                )
              }
              className="h-[38px] rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-600 outline-none focus:border-indigo-400"
            >
              <option value="">
                {filter.placeholder ||
                  `All ${filter.label}`}
              </option>

              {filter.options.map(
                (option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                )
              )}
            </select>
          ))}

          <div className="relative w-full xl:w-[270px]">

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
              placeholder={`Search ${title.toLowerCase()}...`}
              className="h-[38px] w-full rounded-md border border-slate-200 pl-9 pr-3 text-[12px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

          <div className="flex flex-1 justify-end gap-2">

            <button
              type="button"
              className="inline-flex h-[38px] items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
            >
              <FiPrinter size={14} />
              Print
            </button>

            <button
              type="button"
              onClick={openAdd}
              className="inline-flex h-[38px] items-center gap-1.5 rounded-md bg-[#ffad1f] px-4 text-[12px] font-bold text-white shadow-sm transition hover:bg-[#f59e0b]"
            >
              <FiPlus size={15} />
              Add {title.replace(
                " Inventory",
                ""
              )}
            </button>

          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px] border-collapse">

            <thead>

              <tr className="h-[38px] border-b border-slate-200 bg-[#fafbfc]">

                <th className="w-[55px] px-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  SL
                </th>

                {columns.map(
                  (column) => (
                    <th
                      key={
                        column.key
                      }
                      className={`px-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600 ${
                        column.className ||
                        ""
                      }`}
                    >
                      {column.label}
                    </th>
                  )
                )}

                <th className="w-[110px] px-4 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {currentItems.map(
                (item, index) => (

                  <tr
                    key={item.id}
                    className="border-b border-slate-200 transition hover:bg-[#f8faff]"
                  >

                    <td className="px-4 py-3 text-[11px] text-slate-500">
                      {start +
                        index +
                        1}
                    </td>

                    {columns.map(
                      (column) => (
                        <td
                          key={
                            column.key
                          }
                          className="px-4 py-3 align-top"
                        >
                          {column.render
                            ? column.render(
                                item,
                                copyValue
                              )
                            : (
                                <span className="text-[12px] font-medium text-slate-800">
                                  {
                                    item[
                                      column.key
                                    ]
                                  }
                                </span>
                              )}
                        </td>
                      )
                    )}

                    <td className="px-4 py-3">

                      <div className="flex items-center gap-1">

                        <button
                          title="Print"
                          className="flex h-7 w-7 items-center justify-center rounded text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <FiPrinter
                            size={13}
                          />
                        </button>

                        <button
                          title="Edit"
                          onClick={() =>
                            openEdit(
                              item
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <FiEdit2
                            size={13}
                          />
                        </button>

                        <button
                          title="Delete"
                          onClick={() =>
                            setDeleteItem(
                              item
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                        >
                          <FiTrash2
                            size={13}
                          />
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

              {currentItems.length ===
                0 && (
                <tr>
                  <td
                    colSpan={
                      columns.length +
                      2
                    }
                    className="py-20 text-center text-[12px] text-slate-400"
                  >
                    No {title.toLowerCase()} found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}

        <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">

          <div className="text-[12px] text-slate-600">

            Showing{" "}

            <b>
              {filteredItems.length
                ? start + 1
                : 0}
            </b>

            {" "}to{" "}

            <b>
              {Math.min(
                start +
                  currentItems.length,
                filteredItems.length
              )}
            </b>

            {" "}of{" "}

            <b>
              {filteredItems.length}
            </b>

            {" "}users

          </div>

          <div className="flex items-center gap-2">

            <span className="text-[10px] font-bold uppercase text-slate-400">
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
              className="h-8 rounded-md border border-slate-200 bg-white px-2 text-[12px]"
            >
              <option value={7}>
                7
              </option>
              <option value={10}>
                10
              </option>
              <option value={15}>
                15
              </option>
              <option value={25}>
                25
              </option>
            </select>

          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-1">

            <button
              disabled={
                safePage === 1
              }
              onClick={() =>
                setPage(
                  safePage - 1
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-30"
            >
              <FiChevronLeft
                size={14}
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
                  className={`flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-[12px] transition ${
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
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-30"
            >
              <FiChevronRight
                size={14}
              />
            </button>

          </div>

        </div>

      </div>

      {/* ADD / EDIT MODAL */}

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/45 px-4 backdrop-blur-[1px]"
          onMouseDown={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              closeModal();
            }
          }}
        >

          <div className="max-h-[92vh] w-full max-w-[850px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <PageIcon
                    size={17}
                  />
                </div>

                <div>
                  <h2 className="text-[15px] font-bold text-[#14213d]">
                    {editing
                      ? `Edit ${title.replace(
                          " Inventory",
                          ""
                        )}`
                      : `Add ${title.replace(
                          " Inventory",
                          ""
                        )}`}
                  </h2>

                  <p className="text-[11px] text-slate-400">
                    {editing
                      ? "Update inventory information."
                      : "Add a new item to the inventory."}
                  </p>
                </div>

              </div>

              <button
                onClick={
                  closeModal
                }
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <FiX size={17} />
              </button>

            </div>

            <form
              onSubmit={
                handleSubmit
              }
            >

              <div className="max-h-[68vh] overflow-y-auto px-6 py-5">

                {error && (
                  <div className="mb-4 rounded-md border border-red-100 bg-red-50 px-3 py-2 text-[12px] text-red-600">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                  {fields.map(
                    (field) => (

                      <div
                        key={
                          field.key
                        }
                        className={
                          field.fullWidth
                            ? "md:col-span-2"
                            : ""
                        }
                      >

                        <label className="mb-1.5 block text-[11px] font-semibold text-[#14213d]">

                          {field.label}

                          {field.required && (
                            <span className="ml-1 text-red-500">
                              *
                            </span>
                          )}

                        </label>

                        {field.type ===
                        "select" ? (
                          <select
                            value={
                              form[
                                field
                                  .key
                              ] ||
                              ""
                            }
                            onChange={(
                              e
                            ) =>
                              updateForm(
                                field.key,
                                e.target
                                  .value
                              )
                            }
                            className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                          >
                            <option value="">
                              -- Select --
                            </option>

                            {field.options?.map(
                              (
                                option
                              ) => (
                                <option
                                  key={
                                    option
                                  }
                                  value={
                                    option
                                  }
                                >
                                  {
                                    option
                                  }
                                </option>
                              )
                            )}
                          </select>
                        ) : field.type ===
                          "textarea" ? (
                          <textarea
                            value={
                              form[
                                field
                                  .key
                              ] ||
                              ""
                            }
                            onChange={(
                              e
                            ) =>
                              updateForm(
                                field.key,
                                e.target
                                  .value
                              )
                            }
                            placeholder={
                              field.placeholder
                            }
                            rows={3}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-[12px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                          />
                        ) : (
                          <input
                            type={
                              field.type ||
                              "text"
                            }
                            value={
                              form[
                                field
                                  .key
                              ] ||
                              ""
                            }
                            onChange={(
                              e
                            ) =>
                              updateForm(
                                field.key,
                                e.target
                                  .value
                              )
                            }
                            placeholder={
                              field.placeholder
                            }
                            className="h-10 w-full rounded-md border border-slate-200 px-3 text-[12px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                          />
                        )}

                      </div>

                    )
                  )}

                </div>

              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 bg-[#fcfcfd] px-6 py-4">

                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  className="h-10 rounded-md border border-slate-200 bg-white px-5 text-[12px] font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Discard Changes
                </button>

                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-[#ffad1f] px-6 text-[12px] font-bold text-white transition hover:bg-[#f59e0b]"
                >
                  <FiCheck
                    size={15}
                  />

                  {editing
                    ? "Save Changes"
                    : `Create ${title.replace(
                        " Inventory",
                        ""
                      )}`}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* DELETE */}

      {deleteItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/45 px-4">

          <div className="w-full max-w-[400px] rounded-xl bg-white p-6 shadow-2xl">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiTrash2
                size={17}
              />
            </div>

            <h3 className="mt-4 text-[15px] font-bold text-slate-900">
              Delete Item?
            </h3>

            <p className="mt-2 text-[12px] leading-5 text-slate-500">
              Are you sure you want to delete this inventory item?
            </p>

            <div className="mt-6 flex justify-end gap-2">

              <button
                onClick={() =>
                  setDeleteItem(
                    null
                  )
                }
                className="h-9 rounded-md border border-slate-200 px-4 text-[12px] font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={
                  deleteCurrent
                }
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