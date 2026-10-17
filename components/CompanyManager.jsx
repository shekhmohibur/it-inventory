<DataTable
  breadcrumbs={[{ label: "Master Data", href: "/master-data" }, { label: "Company" }]}
  searchPlaceholder="Search by company name or short name..."
  searchKey={(item, term) =>
    item.name.toLowerCase().includes(term) ||
    item.shortName.toLowerCase().includes(term)
  }
  data={companies}
  columns={columns}
  printUrl="/master-data/company/print"  // <-- Must be present
  addLabel={canCreate ? "Add Company" : undefined}
  onAdd={canCreate ? () => router.push("/master-data/company/create") : undefined}
/>