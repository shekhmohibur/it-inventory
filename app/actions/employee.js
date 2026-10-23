"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. CREATE EMPLOYEE
export async function createEmployeeAction(formData) {
  try {
    const auth = await requirePermission("org:employee_create");
    if (!auth.authorized) return { error: auth.error };

    const employeeCode = formData.get("employeeCode")?.trim();
    const name = formData.get("name")?.trim();
    const companyId = formData.get("companyId")?.trim();
    const departmentId = formData.get("departmentId")?.trim() || null;
    const sectionId = formData.get("sectionId")?.trim() || null;
    const designation = formData.get("designation")?.trim();
    const contactNumber = formData.get("contactNumber")?.trim();
    const personalEmail = formData.get("personalEmail")?.trim() || null;
    const officeEmail = formData.get("officeEmail")?.trim() || null;
    const joiningDateStr = formData.get("joiningDate")?.trim();
    const status = formData.get("status")?.trim() || "Active";

    if (!employeeCode || !name || !companyId || !designation || !contactNumber || !joiningDateStr) {
      return { error: "Please fill in all required fields (*)." };
    }

    const existingCode = await prisma.employee.findUnique({
      where: { employeeCode },
    });
    if (existingCode) {
      return { error: `Employee Code "${employeeCode}" is already taken.` };
    }

    await prisma.employee.create({
      data: {
        employeeCode,
        name,
        companyId,
        departmentId: departmentId && departmentId !== "none" ? departmentId : null,
        sectionId: sectionId && sectionId !== "none" ? sectionId : null,
        designation,
        contactNumber,
        personalEmail,
        officeEmail,
        joiningDate: new Date(joiningDateStr),
        status,
      },
    });

    revalidatePath("/master-data/employees");
    return { success: true };
  } catch (err) {
    console.error("Create employee error:", err);
    return { error: err?.message || "Failed to create employee." };
  }
}

// 2. UPDATE EMPLOYEE
export async function updateEmployeeAction(id, formData) {
  try {
    const auth = await requirePermission("org:employee_edit");
    if (!auth.authorized) return { error: auth.error };

    const employeeCode = formData.get("employeeCode")?.trim();
    const name = formData.get("name")?.trim();
    const companyId = formData.get("companyId")?.trim();
    const departmentId = formData.get("departmentId")?.trim() || null;
    const sectionId = formData.get("sectionId")?.trim() || null;
    const designation = formData.get("designation")?.trim();
    const contactNumber = formData.get("contactNumber")?.trim();
    const personalEmail = formData.get("personalEmail")?.trim() || null;
    const officeEmail = formData.get("officeEmail")?.trim() || null;
    const joiningDateStr = formData.get("joiningDate")?.trim();
    const status = formData.get("status")?.trim() || "Active";

    if (!employeeCode || !name || !companyId || !designation || !contactNumber || !joiningDateStr) {
      return { error: "Please fill in all required fields (*)." };
    }

    await prisma.employee.update({
      where: { id },
      data: {
        employeeCode,
        name,
        companyId,
        departmentId: departmentId && departmentId !== "none" ? departmentId : null,
        sectionId: sectionId && sectionId !== "none" ? sectionId : null,
        designation,
        contactNumber,
        personalEmail,
        officeEmail,
        joiningDate: new Date(joiningDateStr),
        status,
      },
    });

    revalidatePath("/master-data/employees");
    return { success: true };
  } catch (err) {
    console.error("Update employee error:", err);
    return { error: err?.message || "Failed to update employee." };
  }
}

// 3. DELETE EMPLOYEE
export async function deleteEmployeeAction(id) {
  try {
    const auth = await requirePermission("org:employee_delete");
    if (!auth.authorized) return { error: auth.error };

    await prisma.employee.delete({
      where: { id },
    });

    revalidatePath("/master-data/employees");
    return { success: true };
  } catch (err) {
    console.error("Delete employee error:", err);
    return { error: err?.message || "Failed to delete employee." };
  }
}