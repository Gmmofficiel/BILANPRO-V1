self.addEventListener("push", function(event) {

  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = {
      title: "BILANPRO",
      body: event.data ? event.data.text() : "Nouvelle notification"
    };
  }

  const title = data.title || "🚒 BILANPRO";

  const options = {
    body: data.body || "Nouvelle notification BILANPRO",
    icon: "icon-192.png",
    badge: "icon-192.png",
    data: {
      url: data.url || "./"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});


self.addEventListener("notificationclick", function(event) {

  event.notification.close();

  const url = event.notification.data?.url || "./";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(function(clientList) {

      for (const client of clientList) {
        if ("focus" in client) {
          client.focus();
          return;
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(url);
      }

    })
  );

});
