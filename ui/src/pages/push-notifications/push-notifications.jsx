/**
 * test a notification on frontend
 */
const sendNotification = async () => {
  const text = "Take a look at this brand new t-shirt!";
  const title = "New Product Available";
  const options = {
    data: "https://www.google.ca/",
    body: text,
    icon: "https://www.w3schools.com/images/lamp.jpg",
    vibrate: [200, 100, 200],
    tag: "new-product",
    image: "https://www.w3schools.com/images/lamp.jpg",
    badge: "https://www.w3schools.com/images/lamp.jpg",
    actions: [{ action: "Detail", title: "View", icon: "https://www.w3schools.com/images/lamp.jpg" }]
  };
  const worker = await navigator.serviceWorker.ready;
  const not = await worker.showNotification(title, options);
}

export default sendNotification;