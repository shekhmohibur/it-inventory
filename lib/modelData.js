export const defaultModels = [
  {
    id: 1,
    name: "Asus P453UA",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 2,
    name: "Asustek Computer Inc.",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 3,
    name: "Asus VivoBook 15",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 4,
    name: "Asus X409JA",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 5,
    name: "Asus X421FA",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 6,
    name: "Asus X456UA",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 7,
    name: "Asus X510UA",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 8,
    name: "Custom",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 9,
    name: "Dell Inspiron 15 3567",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 10,
    name: "Dell Optiplex 3050",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 11,
    name: "Dell Optiplex 3080",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 12,
    name: "Dell Vostro 14 3401",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 13,
    name: "Dell Vostro 3400",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 14,
    name: "Dell Vostro 3468",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 15,
    name: "Dell Vostro 3670",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 16,
    name: "HP ProDesk 400 G5",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 17,
    name: "HP EliteDesk 800 G4",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 18,
    name: "HP ProDesk 600 G3",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 19,
    name: "HP ProBook 440 G7",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 20,
    name: "Lenovo ThinkCentre M720",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 21,
    name: "Lenovo ThinkCentre M710",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 22,
    name: "Lenovo ThinkPad E14",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 23,
    name: "Dell Latitude 5420",
    category: "Computer",
    remarks: "Office laptop",
  },
  {
    id: 24,
    name: "Dell Latitude 3410",
    category: "Computer",
    remarks: "-",
  },
  {
    id: 25,
    name: "Dell Latitude 7490",
    category: "Computer",
    remarks: "-",
  },

  {
    id: 26,
    name: "Asus VA24EHE",
    category: "Monitor",
    remarks: "-",
  },
  {
    id: 27,
    name: "BenQ GW2283",
    category: "Monitor",
    remarks: "-",
  },
  {
    id: 28,
    name: "DELL E1916HV",
    category: "Monitor",
    remarks: "-",
  },
  {
    id: 29,
    name: "HP E221",
    category: "Monitor",
    remarks: "-",
  },
  {
    id: 30,
    name: "ViewSonic VA2261",
    category: "Monitor",
    remarks: "-",
  },
  {
    id: 31,
    name: "Dell P2219H",
    category: "Monitor",
    remarks: "-",
  },
  {
    id: 32,
    name: "HP V194",
    category: "Monitor",
    remarks: "-",
  },

  {
    id: 33,
    name: "Brother HL-L2320D",
    category: "Printer",
    remarks: "-",
  },
  {
    id: 34,
    name: "Canon LBP 2900",
    category: "Printer",
    remarks: "-",
  },
  {
    id: 35,
    name: "EPSON L3110",
    category: "Printer",
    remarks: "-",
  },
  {
    id: 36,
    name: "HP LaserJet Pro M404dn",
    category: "Printer",
    remarks: "-",
  },
  {
    id: 37,
    name: "Brother DCP-T420W",
    category: "Printer",
    remarks: "-",
  },

  {
    id: 38,
    name: "Dell PowerEdge R740",
    category: "Server",
    remarks: "Rack server",
  },
  {
    id: 39,
    name: "HP ProLiant DL380 G10",
    category: "Server",
    remarks: "-",
  },
  {
    id: 40,
    name: "Dell PowerEdge R640",
    category: "Server",
    remarks: "-",
  },

  {
    id: 41,
    name: "TP-Link Archer C6",
    category: "Router",
    remarks: "-",
  },
  {
    id: 42,
    name: "MikroTik hEX",
    category: "Router",
    remarks: "-",
  },
  {
    id: 43,
    name: "Cisco RV340",
    category: "Router",
    remarks: "-",
  },

  {
    id: 44,
    name: "APC Smart-UPS 1500",
    category: "UPS",
    remarks: "-",
  },
  {
    id: 45,
    name: "APC Back-UPS 1100",
    category: "UPS",
    remarks: "-",
  },
];

export const categories = [
  "Computer",
  "Monitor",
  "Printer",
  "Server",
  "Router",
  "UPS",
];

export function getModels() {
  if (typeof window === "undefined") {
    return defaultModels;
  }

  const saved = localStorage.getItem("it_inventory_models");

  if (!saved) {
    localStorage.setItem(
      "it_inventory_models",
      JSON.stringify(defaultModels)
    );

    return defaultModels;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return defaultModels;
  }
}

export function saveModels(models) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    "it_inventory_models",
    JSON.stringify(models)
  );

  window.dispatchEvent(new Event("modelsUpdated"));
}