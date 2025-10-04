const barbers = {
  "Igor Leon": {
    password: "2233",
    photo: "https://via.placeholder.com/120",
    desc: "Especialista em cortes modernos e barba.",
    services: {
      "Corte social": 30,
      "Degrade navalhado": 30,
      "Degrade na zero": 30,
      "Degrade navalhado e barba desenhada": 55,
      "Degrade na zero e barba desenhada": 55,
      "Corte social e barba desenhada": 55,
      "Corte degrade navalhado e barba toda raspada na navalha": 55,
      "Corte degrade na zero e barba toda raspada na navalha": 55,
      "Corte social e barba toda raspada na navalha": 55,
      "Barba desenhada": 30,
      "Barba toda raspada na navalha": 30,
      "Corte social todo na máquina": 30
    }
  },
  "Odair Martins": {
    password: "2007",
    photo: "https://via.placeholder.com/120",
    desc: "Profissional com experiência em cortes clássicos.",
    services: {
      "Corte social": 35,
      "Degrade navalhado": 35,
      "Degrade na zero": 35,
      "Degrade navalhado e barba desenhada": 60,
      "Degrade na zero e barba desenhada": 60,
      "Corte social e barba desenhada": 60,
      "Corte degrade navalhado e barba toda raspada na navalha": 60,
      "Corte degrade na zero e barba toda raspada na navalha": 60,
      "Corte social e barba toda raspada na navalha": 60,
      "Barba desenhada": 30,
      "Barba toda raspada na navalha": 30
    }
  }
};

let currentBarber = null;

function showBooking() {
  document.getElementById("bookingArea").style.display = "block";
  document.getElementById("loginArea").style.display = "none";
  document.getElementById("barberPanel").style.display = "none";

  const list = document.getElementById("barberList");
  list.innerHTML = "";
  for (const name in barbers) {
    const b = barbers[name];
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${b.photo}">
      <h3>${name}</h3>
      <p>${b.desc}</p>
      <h4>Serviços:</h4>
      <ul>${Object.entries(b.services).map(([s,p])=>`<li>${s} – R$${p}</li>`).join("")}</ul>
    `;
    list.appendChild(card);
  }
}

function showLogin() {
  document.getElementById("loginArea").style.display = "block";
  document.getElementById("bookingArea").style.display = "none";
  document.getElementById("barberPanel").style.display = "none";
}

function login() {
  const name = document.getElementById("barberName").value;
  const pass = document.getElementById("barberPass").value;
  if (barbers[name] && barbers[name].password === pass) {
    currentBarber = name;
    showBarberPanel();
  } else {
    alert("Login inválido");
  }
}

function showBarberPanel() {
  document.getElementById("barberPanel").style.display = "block";
  document.getElementById("loginArea").style.display = "none";
  document.getElementById("bookingArea").style.display = "none";

  const barber = barbers[currentBarber];
  document.getElementById("barberProfile").innerHTML = `
    <div class="card">
      <img src="${barber.photo}">
      <h3>${currentBarber}</h3>
      <p>${barber.desc}</p>
    </div>
  `;

  document.getElementById("profilePic").value = barber.photo;
  document.getElementById("profileDesc").value = barber.desc;

  const services = document.getElementById("serviceList");
  services.innerHTML = "";
  for (const [s, p] of Object.entries(barber.services)) {
    const row = document.createElement("div");
    row.innerHTML = `${s}: R$ <input type="number" value="${p}" onchange="updatePrice('${s}', this.value)">`;
    services.appendChild(row);
  }
}

function updateProfile() {
  if (currentBarber) {
    barbers[currentBarber].photo = document.getElementById("profilePic").value;
    barbers[currentBarber].desc = document.getElementById("profileDesc").value;
    alert("Perfil atualizado!");
    showBarberPanel();
  }
}

function updatePrice(service, price) {
  if (currentBarber) {
    barbers[currentBarber].services[service] = parseFloat(price);
  }
}

function goHome() {
  document.getElementById("bookingArea").style.display = "none";
  document.getElementById("loginArea").style.display = "none";
  document.getElementById("barberPanel").style.display = "none";
}
