export const authHeader = (session: string | null | undefined) => {
  return { headers: { Authorization: `Bearer ${session}` } };
};
