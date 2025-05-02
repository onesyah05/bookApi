const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 3000;


db.sequelize.sync()
    .then(() => {
        console.log("Database synced successfully.");
    })
    .catch((err) => {
        console.error("Failed to sync database:", err.message);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});