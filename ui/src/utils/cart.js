export const AddToCart = (pet) => {
  if (!pet) return;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((i) => i.id === pet.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: pet.id,
      name: pet.name || pet.animal,
      price: pet.price || pet.price_inr,
      image: pet.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.dispatchEvent(new Event("storage"));
};
