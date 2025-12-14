export async function getUserLocation(): Promise<string> {
    const apis = [
        { url: "https://ipapi.co/json/", field: "country_code" },
        { url: "https://ipwho.is/", field: "country_code" },
        { url: "https://freeipapi.com/api/json", field: "countryCode" },
        { url: "https://api.country.is", field: "country" }
    ];

    for (const api of apis) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout per API

            const res = await fetch(api.url, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json();
                const country = data[api.field];
                if (country && typeof country === "string" && country.length === 2) {
                    return country.toUpperCase();
                }
            }
        } catch (error) {
            console.warn(`Geo API failed: ${api.url}`);
        }
    }

    console.warn("All Geo APIs failed, defaulting to US.");
    return "US";
}
