export function formatUsdc(amount: number): string {
  return `${amount.toFixed(2)} USDC`;
}

export function formatPercent(val: number): string {
  return `${val.toFixed(1)}%`;
}

export function truncateAddress(address: string): string {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}
