document.getElementById("absenceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await fetch(
        "https://uni-attendance-api.azurewebsites.net/api/ProcessAbsence?code=k4E62ZAkEayZc2mVjq85eGwtONaGOkFsJM1FcLK6OvDrAzFuwiGa1g==",
        {
            method: "POST",
            body: JSON.stringify({
                studentId: document.getElementById("studentId").value,
                reason: document.getElementById("reason").value
            }),
            headers: { "Content-Type": "application/json" }
        }
    );
    alert(await response.text());
});
