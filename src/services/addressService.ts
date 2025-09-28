export default function formatAddress(address: string): string {
  const parts = address.split(",").map((p) => p.trim());
  const city = parts.length >= 2 ? parts[parts.length - 2] : "";
  const country = parts.length >= 1 ? parts[parts.length - 1] : "";

  return `${city} | ${country}`;
}
