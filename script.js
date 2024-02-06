const loader = document.querySelector(".loader");
let isDragging = false;
let offsetX, offsetY;
let velocityX = 0;
let velocityY = 0;
const gravity = 0.5; // Adjust gravity strength

loader.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - loader.getBoundingClientRect().left;
  offsetY = e.clientY - loader.getBoundingClientRect().top;
  velocityX = 0; // Reset velocity when dragging starts
  velocityY = 0;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const newX = e.clientX - offsetX;
  const newY = e.clientY - offsetY;
  velocityX = newX - parseFloat(loader.style.left); // Update velocity during dragging
  velocityY = newY - parseFloat(loader.style.top);
  loader.style.left = `${newX}px`;
  loader.style.top = `${newY}px`;
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    animate();
  }
});

function animate() {
  if (!isDragging) {
    velocityY += gravity; // Apply gravity
    const currentX = parseFloat(loader.style.left);
    const currentY = parseFloat(loader.style.top);
    const newX = currentX + velocityX;
    const newY = currentY + velocityY;

    // Bounce off bottom of the screen
    if (newY + loader.clientHeight > window.innerHeight) {
      loader.style.top = `${window.innerHeight - loader.clientHeight}px`;
      velocityY *= -0.8; // Reverse velocity and dampen bounce
    } else {
      loader.style.top = `${newY}px`;
    }

    // Bounce off left and right edges
    if (newX < 0 || newX + loader.clientWidth > window.innerWidth) {
      velocityX *= -0.8; // Reverse velocity and dampen bounce
    } else {
      loader.style.left = `${newX}px`;
    }

    requestAnimationFrame(animate);
  }
}
