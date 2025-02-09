const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json()); // Om JSON in requests te parsen
app.use(cors());         // Zodat je vanuit je frontend kan praten met de server

// VERBIND MET MONGODB (vervang <connectionString> met jouw connection string van MongoDB Atlas):
mongoose.connect("mongodb+srv://roanh7:Aventad0r7<!>@cluster0.bvqvx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Verbonden met MongoDB Atlas!");
}).catch((err) => {
  console.error("Fout bij verbinden:", err);
});

// MONGOOSE MODELS
// 1. Voor de gebruiker
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  // We slaan alleen het gehashte wachtwoord op, nooit het echte wachtwoord in platte tekst
  password: { type: String, required: true },
  // Lijst van festivals waar de gebruiker heen gaat
  festivals: [{ type: String }] 
});
const User = mongoose.model("User", userSchema);

// ROUTE: REGISTREREN
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check of usernaam al bestaat
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Gebruiker bestaat al." });
    }

    // Wachtwoord hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Nieuwe user opslaan
    const newUser = new User({
      username,
      password: hashedPassword,
      festivals: []
    });
    await newUser.save();

    res.json({ message: "Registratie succesvol!" });
  } catch (error) {
    res.status(500).json({ message: "Er ging iets mis bij registreren." });
  }
});

// ROUTE: INLOGGEN
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check of username bestaat
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Gebruiker niet gevonden." });
    }
    // Check wachtwoord
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Verkeerd wachtwoord." });
    }
    // Inloggen ok - voor simpelheid sturen we user terug (in echte productie zou je JWT-token maken)
    res.json({ 
      message: "Inloggen succesvol!",
      username: user.username,
      festivals: user.festivals
    });
  } catch (error) {
    res.status(500).json({ message: "Er ging iets mis bij inloggen." });
  }
});

// ROUTE: FESTIVAL TOEVOEGEN
app.post('/api/add-festival', async (req, res) => {
  try {
    const { username, festivalName } = req.body;
    
    // Vind de user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Gebruiker niet gevonden." });
    }

    // Voeg festival toe aan de lijst (als het er nog niet in staat)
    if (!user.festivals.includes(festivalName)) {
      user.festivals.push(festivalName);
      await user.save();
    }

    res.json({ message: "Festival toegevoegd!", festivals: user.festivals });
  } catch (error) {
    res.status(500).json({ message: "Er ging iets mis bij festival toevoegen." });
  }
});

// ROUTE: HALEN WIE GAAT NAAR WELK FESTIVAL
app.get('/api/festival-attendees/:festivalName', async (req, res) => {
  try {
    const { festivalName } = req.params;
    // Vind alle gebruikers die dit festival in hun lijst hebben
    const attendees = await User.find({ festivals: festivalName }, 'username');
    // attendees is nu een lijst met alle users. We sturen alleen de usernamen terug.
    const userList = attendees.map(user => user.username);
    res.json({ festival: festivalName, attendees: userList });
  } catch (error) {
    res.status(500).json({ message: "Er ging iets mis bij het ophalen van attendees." });
  }
});

// LUISTEREN OP POORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server draait op poort ${PORT}`);
});