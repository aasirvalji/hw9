

/**
 * shows a notification
 */
const sendNotification = async () => {
  const text = "Take a look at this brand new t-shirt!";
  const title = "New Product Available";
  const options = {
    body: text,
    icon: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
  };
  const worker = await navigator.serviceWorker.ready;
  const not = await worker.showNotification(title, options);
  console.log(title, options);
}

export default sendNotification;