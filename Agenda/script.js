
    // Festivaldata 
    const festivals = [
        { name: "Wavy", date: "2024-12-21" },
        { name: "DGTL", date: "2025-04-18" },
        { name: "Free your mind Kingsday", date: "2025-04-26" },
        { name: "Loveland Kingsday", date: "2025-04-26" },
        { name: "Verbond", date: "2025-05-05" },
        { name: "Awakenings Upclose", date: "2025-05-17" },
        { name: "Soenda", date: "2025-05-31" },
        { name: "909", date: "2025-06-07" },
        { name: "Open Air", date: "2025-06-08" },
        { name: "Free Your Mind", date: "2025-06-08" },
        { name: "Mystic Garden Festival", date: "2025-06-14" },
        { name: "Awakenings Festival", date: "2025-07-11" },
        { name: "Tomorrowland", date: "2025-07-18" },
        { name: "Mysteryland", date: "2025-07-22" },
        { name: "No Art", date: "2025-07-26" },
        { name: "Loveland", date: "2025-08-09" },
        { name: "Strafwerk", date: "2025-08-16" },
        { name: "Latin Village", date: "2025-08-17" },
        { name: "Parels van de stad", date: "2025-09-13" },
        { name: "Into the woods", date: "2025-09-19" },
        // Voeg hier andere festivals toe
    ];

    function updateCountdown() {
        const now = new Date();
        let nextFestival = null;
    
        // Zoek het eerstvolgende festival
        for (const festival of festivals) {
            const festivalDate = new Date(festival.date);
            if (festivalDate > now) {
                nextFestival = festival;
                break;
            }
        }
    
        // Als er geen toekomstige festivals zijn, toon een bericht
        if (!nextFestival) {
            document.getElementById("festival-name").textContent = "END OF SEASON";
            document.getElementById("countdown").textContent = "";
            return;
        }
    
        // Update de festivalnaam
        document.getElementById("festival-name").textContent = nextFestival.name;
    
        // Bereken de afteltijd
        const festivalDate = new Date(nextFestival.date);
        const diff = festivalDate - now;
    
        if (diff <= 0) {
            // Festival is nu bezig of net afgelopen, herhaal updateCountdown
            setTimeout(updateCountdown, 1000);
            return;
        }
    
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
        // Update de aftelklok
        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update de klok elke seconde
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Direct uitvoeren bij laden
    
  // Speler stats
  document.addEventListener("DOMContentLoaded", () => {
    // Stats object
    const playerStats = {
      "Roan": {
        position: "Keeper",
        age: 23,
        rating: "Rating: 82",
        skills: ["Vibes brengen", "Communicatie", "Voorraad regelen"]
      },
      "Muc": {
        position: "Verdediger",
        age: 32,
        rating: "Rating: 90",
        skills: ["TikTok famous", "Capsuleren", "Overzicht", "Is arts (alleen na 23:00)"]
      },
      "Rick": {
        position: "Verdediger",
        age: 26,
        rating: "Rating: 79",
        skills: ["1-op-1 verdedigen", "Vibes brengen", "Jokes maken", "Houd van grote billen"]
      },
      "Chip": {
        position: "Middenvelder",
        age: 31,
        rating: "Rating: 88",
        skills: ["Uithoudingsvermogen", "Teamleider", "Driver"]
      },
      "Jef": {
        position: "Aanvaller",
        age: 29,
        rating: "Rating: ???",
        skills: ["CHEATCODE ACTIVATED", "Glow in the dark ogen", "Regelt de beste afters"]
      }
    };

    const showPopup = (playerName) => {
      const stats = playerStats[playerName];
      if (stats) {
        // Update popup
        document.getElementById("player-name").textContent = playerName;
        document.getElementById("player-age").textContent = stats.age;
        document.querySelector(".rating-label").textContent = stats.rating;
        
        const skillsList = document.getElementById("player-skills");
        skillsList.innerHTML = ""; // reset
        stats.skills.forEach(skill => {
          const li = document.createElement("li");
          li.textContent = skill;
          skillsList.appendChild(li);
        });
        // Toon popup
        document.getElementById("player-stats-popup").classList.remove("hidden");
      }
    };

    // Klik op het cirkeltje
    document.querySelectorAll(".player").forEach(player => {
      player.addEventListener("click", () => {
        // .player-name is het volgende sibling element
        const playerName = player.nextElementSibling?.textContent.trim();
        if (playerName) {
          showPopup(playerName);
        }
      });
    });

    // Klik op de naam zelf
    document.querySelectorAll(".player-name").forEach(name => {
      name.addEventListener("click", () => {
        const playerName = name.textContent.trim();
        showPopup(playerName);
      });
    });

    // Sluitknop
    document.getElementById("close-popup").addEventListener("click", () => {
      document.getElementById("player-stats-popup").classList.add("hidden");
    });
  });
    
    
    // Object met festivalnamen en bijbehorende websites
    const festivalLinks = {
        "Wavy": "https://www.wavyfestival.nl",
        "DGTL": "https://www.dgtl.nl",
        "Free your mind Kingsday": "https://www.freeyourmindfestival.nl",
        "Loveland Kingsday": "https://www.loveland.nl",
        "Verbond": "https://www.verbondfestival.nl",
        "Awakenings Upclose": "https://www.awakenings.nl",
        "Soenda": "https://www.soenda.com",
        "909": "https://www.909festival.nl",
        "Open Air": "https://www.amsterdamopenair.nl",
        "Free Your Mind": "https://www.freeyourmindfestival.nl",
        "Mystic Garden Festival": "https://www.mysticgardenfestival.nl",
        "Awakenings Festival": "https://www.awakenings.nl",
        "Tomorrowland": "https://www.tomorrowland.com",
        "Mysteryland": "https://www.mysteryland.com",
        "No Art": "https://www.noartfestival.com",
        "Loveland": "https://www.loveland.nl",
        "Latin Village": "https://www.latinvillage.nl",
        "Strafwerk": "https://www.strafwerkfestival.nl",
        "Parels van de stad": "https://www.parelsvandestad.nl",
        "Into the woods": "https://www.intothewoodsfestival.nl"
    };
    
    // Event listener voor de festival links
    document.querySelectorAll(".festival-link").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault(); // Voorkom standaard gedrag
            const festivalName = event.target.dataset.name;
            if (festivalLinks[festivalName]) {
                window.open(festivalLinks[festivalName], "_blank");
            } else {
                alert("Website niet gevonden voor " + festivalName);
            }
        });
    });
