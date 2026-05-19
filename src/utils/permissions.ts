export const hasPermission = (
  permissions: string[],
  requiredPermission: string
) => {
  return permissions.includes(requiredPermission);
};