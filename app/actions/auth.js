"use server";

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { createSession, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

function cleanPhoneNumber(phone) {
  if (!phone) return "";
  return phone.replace(/[\s\-\(\)]/g, "");
}

// 1. REQUEST ACCESS / REGISTRATION
export async function requestAccessAction(formData) {
  try {
    const cardNumber = formData.get("cardNumber")?.trim();
    const fullName = formData.get("fullName")?.trim();
    const email = formData.get("email")?.trim().toLowerCase();
    const rawPhone = formData.get("phone")?.trim();
    const phone = rawPhone ? cleanPhoneNumber(rawPhone) : null;
    const department = formData.get("department")?.trim();
    const designation = formData.get("designation")?.trim();
    const password = formData.get("password");

    if (!cardNumber || !fullName || !email || !department || !designation || !password) {
      return { error: "Please fill in all mandatory fields including your Card Number." };
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters long." };
    }

    // Check for existing user by cardNumber, email, or phone
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { cardNumber },
          { email },
          ...(phone ? [{ phone }] : []),
        ],
      },
    });

    if (existing) {
      if (existing.status === "PENDING") {
        return {
          error: "Your access request is currently pending administrator review.",
        };
      }
      if (existing.cardNumber === cardNumber) {
        return { error: "An account with this Card Number is already registered." };
      }
      if (existing.email === email) {
        return { error: "An account with this email already exists." };
      }
      if (phone && existing.phone === phone) {
        return { error: "An account with this phone number already exists." };
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        cardNumber,
        fullName,
        email,
        phone,
        department,
        designation,
        passwordHash: hashedPassword,
        role: designation.toUpperCase().includes("MANAGER") ? "ADMIN" : "TRAINEE",
        status: "PENDING",
      },
    });

    return { success: true };
  } catch (err) {
    console.error("Registration error:", err);
    return { error: "Unable to process request. Please try again." };
  }
}

// 2. LOGIN ACTION (EMAIL, PHONE, OR CARD NUMBER)
export async function loginAction(formData) {
  let shouldRedirect = false;

  try {
    const rawIdentifier = formData.get("identifier")?.trim();
    const password = formData.get("password");

    if (!rawIdentifier || !password) {
      return { error: "Please enter your Email, Phone, or Card Number and password." };
    }

    const emailQuery = rawIdentifier.toLowerCase();
    const phoneQuery = cleanPhoneNumber(rawIdentifier);

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { cardNumber: rawIdentifier },
          { email: emailQuery },
          { phone: rawIdentifier },
          ...(phoneQuery ? [{ phone: phoneQuery }] : []),
        ],
      },
    });

    if (!user) {
      return { error: "Invalid credentials. Please verify your details." };
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return { error: "Invalid credentials. Please verify your details." };
    }

    if (user.status === "PENDING") {
      return {
        error: "Your account is awaiting Administrator approval. Please check back later.",
      };
    }

    if (user.status === "REJECTED") {
      return {
        error: "Your access request has been denied. Contact IT administration.",
      };
    }

    await createSession(user);
    shouldRedirect = true;
  } catch (err) {
    console.error("Login action error:", err);
    return { error: "An unexpected error occurred. Please try again." };
  }

  if (shouldRedirect) {
    redirect("/");
  }
}

// 3. LOGOUT ACTION
export async function logoutAction() {
  await destroySession();
  redirect("/login");
}