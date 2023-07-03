const mapping: Record<string, string> = {
  companies: 'company',
  customers: 'customer',
  inventories: 'inventory',
  rentals: 'rental',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
