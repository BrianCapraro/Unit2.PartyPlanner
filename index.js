const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/events`;

const state = {
  events: [],
};

const eventsList = document.querySelector("#eventsList");
const addEventForm = document.querySelector("#addEventForm");

addEventForm.addEventListener("submit", addEvent);

async function render() {
  await getEvents();
  renderEvents();
}
render();

async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.events = json;
  } catch (error) {
    console.log(error);
  }
}

function renderEvents() {
  if (!state.events.length) {
    eventsList.innerHTML = `<li>No events found.<li>`;
    return;
  }
  const eventCards = state.events.map((event) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <h2>${event.name}<h2>
    <h2>${event.date}<h2>
    <h2>${event.location}<h2>
    <p>${artist.description}<p>
    `;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Event";
    li.append(deleteButton);
    deleteButton.addEventListener("click", () => deleteEvent(event.id));

    return li;
  });
  eventsList.replaceChildren(...eventCards);
}
console.log(eventsList);

async function createEvent(name, date, location, description) {
  event.preventDefault();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addEventForm.name.value,
        date: addEventForm.date.value,
        location: addEventForm.location.value,
        description: addEventForm.description.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create new event.");
    }
    render();
  } catch (error) {
    console.error(error);
  }
}

async function addEvent(event) {
  event.preventDefault();
  await createEvent(
    addEventForm.name.value,
    addEventForm.date.value,
    addEventForm.location.value,
    addEventForm.description.value
  );
  addEventForm.title.value = "";
  addEventForm.image_url.value = "";
  addEventForm.instructions.value = "";
}
