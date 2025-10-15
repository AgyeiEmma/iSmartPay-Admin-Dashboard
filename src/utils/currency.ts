/**
 * Currency formatting utilities for Ghana Cedi (GHS)
 */

export function formatCurrency(amount: number): string {
  return `₵${amount.toLocaleString('en-GH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[₵,]/g, '')) || 0;
}
