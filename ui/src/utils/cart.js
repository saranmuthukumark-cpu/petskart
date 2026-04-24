export const AddToCart = (pet) => {
  if (!pet) return;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemId = pet._id || pet.id;

  const existing = cart.find((i) => (i._id || i.id) === itemId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      _id: itemId,
      name: pet.name || pet.animal,
      price: pet.price || pet.price_inr,
      image: pet.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.dispatchEvent(new Event("storage"));
};
