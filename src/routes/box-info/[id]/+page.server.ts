export const load = async ({ fetch, params }) => {
  const { id } = params;
  // In a real application, you would fetch data from an API:
  // const res = await fetch(`/api/products/${id}`);
  // const product = await res.json();

  // For this example, we'll use a placeholder object:
  const box = {
    id: id,
    branch: 'Seneca One',
    address: '1 Seneca St, Buffalo NY, 14202'
  };

  return {
    box
  };
};
