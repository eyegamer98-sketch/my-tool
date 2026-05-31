(function() {
    const TOOL_NAME = "MyCustomTool";

    function validateKey(key) {
        try {
            const decoded = atob(key);
            const [prefix, expiryTimestamp] = decoded.split('_');

            if (prefix !== "ACT") {
                return { valid: false, msg: "Invalid Key Format" };
            }

            const now = Math.floor(Date.now() / 1000);
            if (now > parseInt(expiryTimestamp)) {
                return { valid: false, msg: "Key Expire Ho Gayi!" };
            }

            return { valid: true };
        } catch (e) {
            return { valid: false, msg: "Invalid Key" };
        }
    }

    let savedKey = localStorage.getItem(TOOL_NAME + "_key");
    let isValid = savedKey && validateKey(savedKey).valid;

    if (!isValid) {
        let userKey = prompt("Activation Key Daalo:");

        if (!userKey) {
            alert("Key Required Hai!");
            return;
        }

        let check = validateKey(userKey);

        if (check.valid) {
            localStorage.setItem(TOOL_NAME + "_key", userKey);
            alert("✅ Activation Successful!");
        } else {
            alert("❌ " + check.msg);
            return;
        }
    }

    // ✅ TOOL LOGIC YAHAN LIKHO
    alert("🎉 Tool Active Hai! Welcome!");
    console.log("Tool is running...");

})();
