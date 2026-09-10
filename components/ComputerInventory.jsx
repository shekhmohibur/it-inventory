"use client";

import { useEffect, useMemo, useState } from "react";

import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiPrinter,
  FiShield,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiCheck,
  FiCopy,
  FiMonitor,
  FiServer,
} from "react-icons/fi";

const initialComputers = [
  {
    id: 1,
    tag: "KKL-2021#S001",
    deviceName: "S001",
    purchaseDate: "26 Apr 2021",
    warranty: "Expired",
    employeeId: "601356",
    employee: "MD. RAIHANUL ISLAM",
    company: "Kaizer Knitwears Ltd.",
    department: "Office Management",
    section: "Information & Technology",
    designation: "Executive",
    type: "SERVER",
    brand: "HPE",
    model: "ProLiant ML30 Gen10 Plus",
    processor: "Intel(R) Xeon(R) E-2244 CPU @ 3.40GHz",
    motherboard: "ProLiant ML30 Gen10",
    ram: "32GB DDR4 3200MHz",
    storage: "SSD 512GB, NVMe 512GB",
    graphics: "Intel(R) UHD Graphics P630",
    biosSerial: "PX2AA2WGDQJ2",
    display: "HP Elt D? 3505W",
    network: "192.168.12.100",
    mac: "94:40:C9:4C:E7:D9",
    remote: "1597202308",
    password: "On",
    lifecycle: "Login credentials updated",
    lifecycleDate: "17 Aug 2026",
    status: "Running",
  },
  {
    id: 2,
    tag: "KKL-2025#L058",
    deviceName: "L058",
    purchaseDate: "Unknown",
    warranty: "No warranty",
    employeeId: "600018",
    employee: "MD. MASUM HOSSEN",
    company: "Kaizer Knitwears Ltd.",
    department: "Knitting & Dyeing",
    section: "Dyeing",
    designation: "Co-Ordinator",
    type: "LAPTOP",
    brand: "LENOVO",
    model: "LENOVO V15 G4 IRU 83A1",
    processor: "Intel(R) Core(TM) i5-13420H CPU @ 4.60GHz",
    motherboard: "LNVNB161216",
    ram: "8GB DDR4 3200MHz",
    storage: "SSD 512GB (1)",
    graphics: "Intel(R) UHD Graphics",
    biosSerial: "PF5BX7EV",
    display: "15.6-inch",
    network: "N/A",
    mac: "94:B6:09:68:38:23",
    remote: "1247932866",
    password: "Kk1e1058",
    lifecycle: "Login credentials updated",
    lifecycleDate: "29 Aug 2026",
    status: "Running",
  },
  {
    id: 3,
    tag: "KKL-2025#L057",
    deviceName: "L057",
    purchaseDate: "Unknown",
    warranty: "No warranty",
    employeeId: "000000",
    employee: "N/A",
    company: "MK Fashion Ltd.",
    department: "Knitting Staff",
    section: "Office Staff",
    designation: "N/A",
    type: "LAPTOP",
    brand: "LENOVO",
    model: "LENOVO V15 G4 IRU 83A1",
    processor: "Intel(R) Core(TM) i5-13420H CPU @ 4.60GHz",
    motherboard: "LNVNB161216",
    ram: "8GB DDR4 3200MHz",
    storage: "NVMe",
    graphics: "Intel(R) UHD Graphics",
    biosSerial: "Unknown",
    display: "15.6-inch",
    network: "N/A",
    mac: "N/A",
    remote: "N/A",
    password: "N/A",
    lifecycle: "-",
    lifecycleDate: "",
    status: "Running",
  },
  {
    id: 4,
    tag: "KKL-2026#L056",
    deviceName: "L056",
    purchaseDate: "25 Apr 2026",
    warranty: "25 Apr 2027",
    employeeId: "600098",
    employee: "MD. SHOHELL RESVE",
    company: "Kaizer Knitwears Ltd.",
    department: "Merchandising & Planning",
    section: "Merchandising",
    designation: "Manager (Merchandising)",
    type: "LAPTOP",
    brand: "LENOVO",
    model: "LENOVO SLIM 3",
    processor: "Intel(R) Core(TM) i5-13420H CPU @ 4.60GHz",
    motherboard: "LNVNB161216",
    ram: "16GB DDR4 3200MHz",
    storage: "NVMe 512GB",
    graphics: "Integrated Intel UHD Graphics",
    biosSerial: "Unknown",
    display: "15.6-inch",
    network: "192.168.13.56/32",
    mac: "N/A",
    remote: "825281508",
    password: "Kkl@13144",
    lifecycle: "Login credentials updated",
    lifecycleDate: "17 Aug 2026",
    status: "Running",
  },
  {
    id: 5,
    tag: "KKL-2026#L055",
    deviceName: "L055",
    purchaseDate: "24 Feb 2026",
    warranty: "24 Feb 2027",
    employeeId: "601362",
    employee: "AL-AMIN SUMAN",
    company: "Kaizer Knitwears Ltd.",
    department: "Office Management",
    section: "Civil & Architecture",
    designation: "Civil Engineer",
    type: "LAPTOP",
    brand: "LENOVO",
    model: "LENOVO V15 G4 IRU 83A1",
    processor: "Intel(R) Core(TM) i5-13420H CPU @ 4.60GHz",
    motherboard: "LNVNB161216",
    ram: "8GB DDR4 3200MHz",
    storage: "NVMe 512GB",
    graphics: "Intel(R) UHD Graphics",
    biosSerial: "Unknown",
    display: "15.6-inch",
    network: "192.168.101.91/32",
    mac: "N/A",
    remote: "865794684",
    password: "Kkl@7394",
    lifecycle: "Login credentials updated",
    lifecycleDate: "17 Aug 2026",
    status: "Running",
  },
  {
    id: 6,
    tag: "KKL-2026#L054",
    deviceName: "L054",
    purchaseDate: "24 Feb 2026",
    warranty: "24 Feb 2027",
    employeeId: "601364",
    employee: "MD. IMRAN HOSSAIN",
    company: "Kaizer Knitwears Ltd.",
    department: "Office Management",
    section: "Central Control Wing (ED)",
    designation: "Executive of ED",
    type: "LAPTOP",
    brand: "LENOVO",
    model: "LENOVO SLIM 3",
    processor: "Intel(R) Core(TM) i5-13420H CPU @ 4.60GHz",
    motherboard: "LNVNB161216",
    ram: "8GB DDR4 8GB 3200MHz",
    storage: "NVMe 512GB",
    graphics: "Intel(R) UHD Graphics",
    biosSerial: "Unknown",
    display: "15.6-inch",
    network: "192.168.12.54/32",
    mac: "N/A",
    remote: "1398958345",
    password: "Kkl@9496",
    lifecycle: "Login credentials updated",
    lifecycleDate: "17 Aug 2026",
    status: "Running",
  },
  {
    id: 7,
    tag: "KKL-2025#L053",
    deviceName: "L053",
    purchaseDate: "03 May 2025",
    warranty: "Expired",
    employeeId: "600104",
    employee: "MD. ZIAUL ALAM",
    company: "Kaizer Knitwears Ltd.",
    department: "Accounts & Audit",
    section: "Accounts & Audit",
    designation: "Asst. Manager (Accounts)",
    type: "LAPTOP",
    brand: "LENOVO",
    model: "LENOVO SLIM 3 81EM",
    processor: "Intel(R) Core(TM) i5-13420H CPU @ 4.60GHz",
    motherboard: "LNVNB161216",
    ram: "8GB DDR4 3200MHz",
    storage: "NVMe 512GB",
    graphics: "Intel(R) UHD Graphics",
    biosSerial: "Unknown",
    display: "15.6-inch",
    network: "192.168.13.180/32",
    mac: "N/A",
    remote: "1465743185",
    password: "Kkl@7601",
    lifecycle: "Login credentials updated",
    lifecycleDate: "17 Aug 2026",
    status: "Running",
  },
];

const companies = [
  "Kaizer Knitwears Ltd.",
  "MK Fashion Ltd.",
];

const departments = [
  "Office Management",
  "Knitting & Dyeing",
  "Merchandising & Planning",
  "Accounts & Audit",
  "Information & Technology",
];

const sections = [
  "Information & Technology",
  "Dyeing",
  "Office Staff",
  "Merchandising",
  "Civil & Architecture",
  "Central Control Wing (ED)",
  "Accounts & Audit",
];

const brands = [
  "LENOVO",
  "Dell",
  "HP",
  "HPE",
  "ASUS",
];

const types = [
  "LAPTOP",
  "DESKTOP",
  "SERVER",
  "WORKSTATION",
];

const statuses = [
  "Running",
  "In Stock",
  "In Repair",
  "Damaged",
  "Scrapped",
];

const emptyForm = {
  tag: "",
  deviceName: "",
  purchaseDate: "",
  warranty: "",
  employeeId: "",
  employee: "",
  company: "Kaizer Knitwears Ltd.",
  department: "",
  section: "",
  designation: "",
  type: "LAPTOP",
  brand: "LENOVO",
  model: "",
  processor: "",
  motherboard: "",
  ram: "",
  storage: "",
  graphics: "",
  biosSerial: "",
  display: "",
  network: "",
  mac: "",
  remote: "",
  password: "",
  lifecycle: "",
  lifecycleDate: "",
  status: "Running",
};

export default function ComputerInventory() {
  const [computers, setComputers] = useState(initialComputers);

  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(7);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(
      "it_inventory_computers"
    );

    if (saved) {
      try {
        setComputers(JSON.parse(saved));
      } catch {
        setComputers(initialComputers);
      }
    } else {
      localStorage.setItem(
        "it_inventory_computers",
        JSON.stringify(initialComputers)
      );
    }
  }, []);

  const saveData = (data) => {
    setComputers(data);

    localStorage.setItem(
      "it_inventory_computers",
      JSON.stringify(data)
    );
  };

  const filteredComputers = useMemo(() => {
    const q = search.toLowerCase().trim();

    return computers.filter((item) => {
      const matchesCompany =
        !company || item.company === company;

      const matchesDepartment =
        !department ||
        item.department === department;

      const matchesSection =
        !section || item.section === section;

      const matchesBrand =
        !brand || item.brand === brand;

      const matchesType =
        !type || item.type === type;

      const matchesStatus =
        !status || item.status === status;

      const matchesSearch =
        !q ||
        [
          item.tag,
          item.deviceName,
          item.employee,
          item.employeeId,
          item.network,
          item.mac,
          item.model,
          item.brand,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);

      return (
        matchesCompany &&
        matchesDepartment &&
        matchesSection &&
        matchesBrand &&
        matchesType &&
        matchesStatus &&
        matchesSearch
      );
    });
  }, [
    computers,
    company,
    department,
    section,
    brand,
    type,
    status,
    search,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredComputers.length / rows)
  );

  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * rows;

  const currentItems = filteredComputers.slice(
    start,
    start + rows
  );

  useEffect(() => {
    setPage(1);
  }, [
    company,
    department,
    section,
    brand,
    type,
    status,
    search,
    rows,
  ]);

  const updateForm = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      ...emptyForm,
      ...item,
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

    if (!form.tag.trim()) {
      setError("Computer tag is required.");
      return;
    }

    if (!form.deviceName.trim()) {
      setError("Device name is required.");
      return;
    }

    if (!form.employee.trim()) {
      setError("Employee name is required.");
      return;
    }

    let updated;

    if (editing) {
      updated = computers.map((computer) =>
        computer.id === editing.id
          ? {
              ...computer,
              ...form,
            }
          : computer
      );
    } else {
      const newComputer = {
        ...form,
        id: Date.now(),
      };

      updated = [...computers, newComputer];
    }

    saveData(updated);
    closeModal();
  };

  const handleDelete = () => {
    if (!deleteItem) return;

    const updated = computers.filter(
      (item) => item.id !== deleteItem.id
    );

    saveData(updated);
    setDeleteItem(null);
  };

  const copyValue = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {}
  };

  const statusClass = (value) => {
    if (value === "Running") {
      return "border-emerald-300 bg-emerald-50 text-emerald-600";
    }

    if (value === "In Stock") {
      return "border-blue-300 bg-blue-50 text-blue-600";
    }

    if (value === "In Repair") {
      return "border-orange-300 bg-orange-50 text-orange-600";
    }

    return "border-red-300 bg-red-50 text-red-600";
  };

  return (
    <div className="min-h-[calc(100vh-49px)] bg-[#f7f9fc] px-3 py-3 sm:px-4">

      {/* BREADCRUMB */}

      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide">
        <span className="text-slate-400">
          Dashboard
        </span>

        <span className="text-slate-300">›</span>

        <span className="text-slate-400">
          Inventory
        </span>

        <span className="text-slate-300">›</span>

        <span className="text-[#14213d]">
          Computer Inventory
        </span>
      </div>

      {/* MAIN CARD */}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

        {/* TOP BAR */}

        <div className="flex flex-col gap-2 border-b border-slate-200 p-3 xl:flex-row xl:items-center">

          <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

            <select
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
              className="h-[38px] rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-600 outline-none focus:border-blue-400"
            >
              <option value="">All Companies</option>

              {companies.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              className="h-[38px] rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-600 outline-none focus:border-blue-400"
            >
              <option value="">All Departments</option>

              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={section}
              onChange={(e) =>
                setSection(e.target.value)
              }
              className="h-[38px] rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-600 outline-none focus:border-blue-400"
            >
              <option value="">All Sections</option>

              {sections.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={brand}
              onChange={(e) =>
                setBrand(e.target.value)
              }
              className="h-[38px] rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-600 outline-none focus:border-blue-400"
            >
              <option value="">All Brands</option>

              {brands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="h-[38px] rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-600 outline-none focus:border-blue-400"
            >
              <option value="">All Types</option>

              {types.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="h-[38px] rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-600 outline-none focus:border-blue-400"
            >
              <option value="">All Statuses</option>

              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

          </div>

          <div className="relative w-full xl:w-[270px]">

            <FiSearch
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search tags, names, employee, IP..."
              className="h-[38px] w-full rounded-md border border-slate-200 pl-9 pr-3 text-[12px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          <div className="flex gap-2">

            <button
              type="button"
              className="inline-flex h-[38px] items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-600 hover:bg-slate-50"
            >
              <FiPrinter size={14} />
              Print Inventory
            </button>

            <button
              type="button"
              onClick={openAdd}
              className="inline-flex h-[38px] items-center justify-center gap-1.5 rounded-md bg-[#4f46e5] px-4 text-[12px] font-bold text-white shadow-sm transition hover:bg-[#4338ca]"
            >
              <FiPlus size={15} />
              Add Computer
            </button>

          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1450px] border-collapse">

            <thead>

              <tr className="h-[38px] border-b border-slate-200 bg-[#fafbfc]">

                <th className="w-[45px] px-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  #
                </th>

                <th className="w-[145px] px-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Identity & Tag
                </th>

                <th className="w-[225px] px-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Assignment & Location
                </th>

                <th className="w-[430px] px-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Hardware & Specs
                </th>

                <th className="w-[230px] px-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Remote & Network
                </th>

                <th className="w-[250px] px-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Lifecycle
                </th>

                <th className="w-[100px] px-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Status
                </th>

                <th className="w-[95px] px-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {currentItems.map((item, index) => (

                <tr
                  key={item.id}
                  className="border-b border-slate-200 align-top transition hover:bg-slate-50"
                >

                  {/* NUMBER */}

                  <td className="px-3 py-3 text-[12px] text-slate-500">
                    {start + index + 1}
                  </td>

                  {/* IDENTITY */}

                  <td className="px-3 py-3">

                    <div className="text-[12px] font-bold text-slate-900">
                      {item.tag}

                      <button
                        onClick={() =>
                          copyValue(item.tag)
                        }
                        className="ml-1 text-slate-400 hover:text-blue-600"
                      >
                        <FiCopy
                          className="inline"
                          size={11}
                        />
                      </button>
                    </div>

                    <div className="mt-1 text-[10px] font-semibold text-slate-700">
                      Device Name:{" "}
                      <span className="font-normal">
                        {item.deviceName}
                      </span>
                    </div>

                    <div className="mt-1 text-[10px] text-slate-700">
                      Purchase:{" "}
                      <span className="font-semibold">
                        {item.purchaseDate}
                      </span>
                    </div>

                    <div className="mt-1 text-[10px] text-slate-700">
                      Warranty:{" "}
                      <span
                        className={
                          item.warranty === "Expired" ||
                          item.warranty === "No warranty"
                            ? "font-semibold text-red-500"
                            : "font-semibold text-emerald-500"
                        }
                      >
                        {item.warranty}
                      </span>
                    </div>

                  </td>

                  {/* ASSIGNMENT */}

                  <td className="px-3 py-3">

                    <div className="text-[11px] font-bold text-slate-900">
                      {item.employeeId} |{" "}
                      {item.employee}
                    </div>

                    <div className="mt-1 text-[10px] text-slate-700">
                      Company:{" "}
                      <span className="font-semibold">
                        {item.company}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-700">
                      Dept:{" "}
                      <span className="font-semibold">
                        {item.department}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-700">
                      Section:{" "}
                      <span className="font-semibold">
                        {item.section}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-700">
                      Design:{" "}
                      <span className="font-semibold">
                        {item.designation}
                      </span>
                    </div>

                  </td>

                  {/* HARDWARE */}

                  <td className="px-3 py-3">

                    <div className="text-[10px] text-slate-800">
                      <b>{item.type}</b>
                      {" | "}
                      <b>{item.brand}</b>
                      {" | "}
                      <b>{item.model}</b>
                    </div>

                    <div className="mt-1 text-[10px] text-slate-700">
                      CPU:{" "}
                      <span className="font-semibold">
                        {item.processor}
                      </span>
                      {" • "}
                      MB:{" "}
                      <span className="font-semibold">
                        {item.motherboard}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-700">
                      Memory:{" "}
                      <span className="font-semibold">
                        {item.ram}
                      </span>
                      {" • "}
                      Storage:{" "}
                      <span className="font-semibold">
                        {item.storage}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-700">
                      Graphics:{" "}
                      <span className="font-semibold">
                        {item.graphics}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-700">
                      Bios Serial:{" "}
                      <span className="font-semibold">
                        {item.biosSerial}
                      </span>
                      {" • "}
                      Display:{" "}
                      <span className="font-semibold">
                        {item.display}
                      </span>
                    </div>

                  </td>

                  {/* NETWORK */}

                  <td className="px-3 py-3">

                    <div className="text-[10px] text-slate-700">
                      NETWORK{" "}
                      <span className="ml-2 font-mono font-semibold text-slate-900">
                        : {item.network}
                      </span>
                    </div>

                    <div className="mt-1 text-[10px] text-slate-700">
                      MAC{" "}
                      <span className="ml-4 font-mono font-semibold text-slate-900">
                        : {item.mac}
                      </span>
                    </div>

                    <div className="mt-1 text-[10px] text-slate-700">
                      REMOTE{" "}
                      <span className="ml-1 font-mono font-semibold text-slate-900">
                        : {item.remote}
                      </span>
                    </div>

                    <div className="mt-1 text-[10px] text-slate-700">
                      PASSWORD{" "}
                      <span className="ml-1 font-mono font-semibold text-slate-900">
                        : {item.password}
                      </span>
                    </div>

                  </td>

                  {/* LIFECYCLE */}

                  <td className="px-3 py-3">

                    {item.lifecycle !== "-" &&
                    item.lifecycle ? (
                      <>
                        <div className="text-[10px] text-slate-700">
                          <span className="font-semibold">
                            [Security]
                          </span>{" "}
                          {item.lifecycle}
                        </div>

                        <div className="mt-1 text-right text-[10px] text-slate-700">
                          {item.lifecycleDate}
                        </div>
                      </>
                    ) : (
                      <span className="text-[10px] text-slate-400">
                        -
                      </span>
                    )}

                  </td>

                  {/* STATUS */}

                  <td className="px-3 py-3">

                    <span
                      className={`inline-flex min-w-[72px] items-center justify-center rounded border px-2 py-1 text-[10px] font-semibold ${statusClass(
                        item.status
                      )}`}
                    >
                      <span className="mr-1">
                        •
                      </span>
                      {item.status}
                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td className="px-3 py-3">

                    <div className="flex items-center gap-1">

                      <button
                        type="button"
                        title="Print"
                        className="flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <FiPrinter size={13} />
                      </button>

                      <button
                        type="button"
                        title="Security"
                        className="flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-blue-600"
                      >
                        <FiShield size={13} />
                      </button>

                      <button
                        type="button"
                        title="Edit"
                        onClick={() =>
                          openEdit(item)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <FiEdit2 size={13} />
                      </button>

                      <button
                        type="button"
                        title="Delete"
                        onClick={() =>
                          setDeleteItem(item)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:bg-red-50 hover:text-red-500"
                      >
                        <FiTrash2 size={13} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

              {currentItems.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-20 text-center text-[12px] text-slate-400"
                  >
                    No computers found.
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
              {filteredComputers.length
                ? start + 1
                : 0}
            </b>

            {" "}to{" "}

            <b>
              {Math.min(
                start + currentItems.length,
                filteredComputers.length
              )}
            </b>

            {" "}of{" "}

            <b>{filteredComputers.length}</b>

            {" "}users

          </div>

          <div className="flex items-center gap-2">

            <span className="text-[10px] font-bold uppercase text-slate-400">
              Rows:
            </span>

            <select
              value={rows}
              onChange={(e) =>
                setRows(Number(e.target.value))
              }
              className="h-8 rounded-md border border-slate-200 bg-white px-2 text-[12px] outline-none"
            >
              <option value={7}>7</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
            </select>

          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-1">

            <button
              disabled={safePage === 1}
              onClick={() =>
                setPage(safePage - 1)
              }
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 disabled:opacity-40"
            >
              <FiChevronLeft size={14} />
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
                  className={`flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-[12px] ${
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
              onClick={() =>
                setPage(safePage + 1)
              }
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 disabled:opacity-40"
            >
              <FiChevronRight size={14} />
            </button>

          </div>

        </div>

      </div>

      {/* ADD / EDIT MODAL */}

      {modalOpen && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/45 px-4 backdrop-blur-[1px]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >

          <div className="max-h-[92vh] w-full max-w-[950px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <FiMonitor size={17} />
                </div>

                <div>

                  <h2 className="text-[15px] font-bold text-[#14213d]">
                    {editing
                      ? "Edit Computer"
                      : "Add Computer"}
                  </h2>

                  <p className="text-[11px] text-slate-400">
                    {editing
                      ? "Update computer inventory information."
                      : "Add a new computer to the IT inventory."}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <FiX size={17} />
              </button>

            </div>

            {/* FORM BODY */}

            <form onSubmit={handleSubmit}>

              <div className="max-h-[68vh] overflow-y-auto px-6 py-5">

                {error && (
                  <div className="mb-5 rounded-md border border-red-100 bg-red-50 px-3 py-2 text-[12px] text-red-600">
                    {error}
                  </div>
                )}

                {/* BASIC INFORMATION */}

                <SectionTitle title="Identity & Purchase" />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

                  <Field
                    label="Computer Tag"
                    required
                    value={form.tag}
                    onChange={(v) =>
                      updateForm("tag", v)
                    }
                    placeholder="e.g. KKL-2026#L059"
                  />

                  <Field
                    label="Device Name"
                    required
                    value={form.deviceName}
                    onChange={(v) =>
                      updateForm("deviceName", v)
                    }
                    placeholder="e.g. L059"
                  />

                  <Field
                    label="Purchase Date"
                    value={form.purchaseDate}
                    onChange={(v) =>
                      updateForm(
                        "purchaseDate",
                        v
                      )
                    }
                    placeholder="e.g. 08 Sep 2026"
                  />

                  <Field
                    label="Warranty"
                    value={form.warranty}
                    onChange={(v) =>
                      updateForm("warranty", v)
                    }
                    placeholder="e.g. 08 Sep 2027"
                  />

                </div>

                {/* ASSIGNMENT */}

                <SectionTitle title="Assignment & Location" />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

                  <Field
                    label="Employee ID"
                    value={form.employeeId}
                    onChange={(v) =>
                      updateForm(
                        "employeeId",
                        v
                      )
                    }
                    placeholder="e.g. 601365"
                  />

                  <Field
                    label="Employee Name"
                    required
                    value={form.employee}
                    onChange={(v) =>
                      updateForm(
                        "employee",
                        v
                      )
                    }
                    placeholder="Enter employee name"
                  />

                  <SelectField
                    label="Company"
                    value={form.company}
                    onChange={(v) =>
                      updateForm(
                        "company",
                        v
                      )
                    }
                    options={companies}
                  />

                  <SelectField
                    label="Department"
                    value={form.department}
                    onChange={(v) =>
                      updateForm(
                        "department",
                        v
                      )
                    }
                    options={departments}
                  />

                  <SelectField
                    label="Section"
                    value={form.section}
                    onChange={(v) =>
                      updateForm(
                        "section",
                        v
                      )
                    }
                    options={sections}
                  />

                  <Field
                    label="Designation"
                    value={form.designation}
                    onChange={(v) =>
                      updateForm(
                        "designation",
                        v
                      )
                    }
                    placeholder="e.g. IT Executive"
                  />

                </div>

                {/* HARDWARE */}

                <SectionTitle title="Hardware & Specifications" />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                  <SelectField
                    label="Type"
                    value={form.type}
                    onChange={(v) =>
                      updateForm("type", v)
                    }
                    options={types}
                  />

                  <SelectField
                    label="Brand"
                    value={form.brand}
                    onChange={(v) =>
                      updateForm("brand", v)
                    }
                    options={brands}
                  />

                  <Field
                    label="Model"
                    value={form.model}
                    onChange={(v) =>
                      updateForm("model", v)
                    }
                    placeholder="e.g. ThinkPad E14"
                  />

                  <Field
                    label="Processor"
                    value={form.processor}
                    onChange={(v) =>
                      updateForm(
                        "processor",
                        v
                      )
                    }
                    placeholder="CPU model"
                  />

                  <Field
                    label="Motherboard"
                    value={form.motherboard}
                    onChange={(v) =>
                      updateForm(
                        "motherboard",
                        v
                      )
                    }
                    placeholder="Motherboard model"
                  />

                  <Field
                    label="RAM"
                    value={form.ram}
                    onChange={(v) =>
                      updateForm("ram", v)
                    }
                    placeholder="e.g. 16GB DDR4"
                  />

                  <Field
                    label="Storage"
                    value={form.storage}
                    onChange={(v) =>
                      updateForm(
                        "storage",
                        v
                      )
                    }
                    placeholder="e.g. 512GB NVMe"
                  />

                  <Field
                    label="Graphics"
                    value={form.graphics}
                    onChange={(v) =>
                      updateForm(
                        "graphics",
                        v
                      )
                    }
                    placeholder="Graphics card"
                  />

                  <Field
                    label="BIOS Serial"
                    value={form.biosSerial}
                    onChange={(v) =>
                      updateForm(
                        "biosSerial",
                        v
                      )
                    }
                    placeholder="BIOS serial"
                  />

                  <Field
                    label="Display"
                    value={form.display}
                    onChange={(v) =>
                      updateForm(
                        "display",
                        v
                      )
                    }
                    placeholder="e.g. 15.6-inch"
                  />

                </div>

                {/* NETWORK */}

                <SectionTitle title="Remote & Network" />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

                  <Field
                    label="IP Address"
                    value={form.network}
                    onChange={(v) =>
                      updateForm(
                        "network",
                        v
                      )
                    }
                    placeholder="192.168.1.100"
                  />

                  <Field
                    label="MAC Address"
                    value={form.mac}
                    onChange={(v) =>
                      updateForm("mac", v)
                    }
                    placeholder="00:11:22:33:44:55"
                  />

                  <Field
                    label="Remote ID"
                    value={form.remote}
                    onChange={(v) =>
                      updateForm(
                        "remote",
                        v
                      )
                    }
                    placeholder="Remote access ID"
                  />

                  <Field
                    label="Password"
                    value={form.password}
                    onChange={(v) =>
                      updateForm(
                        "password",
                        v
                      )
                    }
                    placeholder="Password"
                  />

                </div>

                {/* STATUS */}

                <SectionTitle title="Lifecycle & Status" />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                  <Field
                    label="Lifecycle Event"
                    value={form.lifecycle}
                    onChange={(v) =>
                      updateForm(
                        "lifecycle",
                        v
                      )
                    }
                    placeholder="e.g. Login credentials updated"
                  />

                  <Field
                    label="Lifecycle Date"
                    value={form.lifecycleDate}
                    onChange={(v) =>
                      updateForm(
                        "lifecycleDate",
                        v
                      )
                    }
                    placeholder="e.g. 08 Sep 2026"
                  />

                  <SelectField
                    label="Status"
                    value={form.status}
                    onChange={(v) =>
                      updateForm(
                        "status",
                        v
                      )
                    }
                    options={statuses}
                  />

                </div>

              </div>

              {/* FOOTER */}

              <div className="flex justify-end gap-3 border-t border-slate-200 bg-[#fcfcfd] px-6 py-4">

                <button
                  type="button"
                  onClick={closeModal}
                  className="h-10 rounded-md border border-slate-200 bg-white px-5 text-[12px] font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Discard Changes
                </button>

                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-[#4f46e5] px-6 text-[12px] font-bold text-white hover:bg-[#4338ca]"
                >
                  <FiCheck size={15} />

                  {editing
                    ? "Save Changes"
                    : "Add Computer"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* DELETE MODAL */}

      {deleteItem && (

        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/45 px-4">

          <div className="w-full max-w-[400px] rounded-xl bg-white p-6 shadow-2xl">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiTrash2 size={17} />
            </div>

            <h3 className="mt-4 text-[15px] font-bold text-slate-900">
              Delete Computer?
            </h3>

            <p className="mt-2 text-[12px] leading-5 text-slate-500">

              Are you sure you want to delete{" "}

              <span className="font-semibold text-slate-700">
                {deleteItem.tag}
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
                onClick={handleDelete}
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


/* ----------------------------- */
/* REUSABLE FORM COMPONENTS      */
/* ----------------------------- */

function SectionTitle({ title }) {
  return (
    <div className="mb-4 mt-6 flex items-center gap-2 border-b border-slate-100 pb-2">

      <FiServer
        size={14}
        className="text-indigo-500"
      />

      <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#14213d]">
        {title}
      </h3>

    </div>
  );
}

function Field({
  label,
  required,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>

      <label className="mb-1.5 block text-[11px] font-semibold text-[#14213d]">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <input
        value={value || ""}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />

    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="mb-1.5 block text-[11px] font-semibold text-[#14213d]">
        {label}
      </label>

      <select
        value={value || ""}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      >

        <option value="">
          -- Select {label} --
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}