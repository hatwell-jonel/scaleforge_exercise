import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(raw: string): string {
  const phoneNumber = parsePhoneNumberFromString(raw);

  if (phoneNumber && phoneNumber.isValid()) {
    return phoneNumber.formatInternational();
  }

  return raw;
}

export function customFormat(raw: string): string {
  const digits = raw.replace(/\D/g, '');

  if (digits.startsWith('1') && digits.length === 11) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  if (digits.startsWith('63') && digits.length === 12) {
    return `+63 (${digits.slice(2, 5)}) ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }

  return raw;
}

export function capitalize(word: string): string {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}