const svgContainer = document.getElementById("svgContainer");
const animItem = bodymovin.loadAnimation({
  wrapper: svgContainer,
  animType: "svg",
  loop: true,
  animationData: JSON.parse(animationData),
});
