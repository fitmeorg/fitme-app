export const handleSubmit = (route: string, json: any) => {
  fetch(`http://localhost:3000/${route}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};
