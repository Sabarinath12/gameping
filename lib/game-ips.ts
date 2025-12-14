// Manual IP List - Started Fresh
// Structure: Game -> Region Code -> Array of IP Addresses

export const GAME_SERVERS: Record<string, Record<string, string[]>> = {
    "Counter-Strike 2": {
        "US": [
            "193.56.116.73",   // Atlanta
            "52.162.161.148",  // Chicago
            "192.227.139.106", // Dallas
            "104.174.125.138", // Los Angeles
            "67.183.58.7",     // Seattle
            "208.253.114.165", // Virginia
        ],
        "CA": [
            "52.162.161.148",  // Chicago (Best for East/Central CA)
            "193.56.116.73",   // Atlanta
        ],
        "BR": [
            "191.252.218.135",  // Sao Paulo
        ],
        "GB": [
            "84.17.50.173",    // London
        ],
        "DE": [
            "82.102.16.174",   // Frankfurt am Main
        ],
        "NL": [
            "216.58.212.142",   // Amsterdam
        ],
        "FR": [
            "51.159.24.42",    // Paris
            "51.178.64.22",    // Gravelines
        ],
        // Asia-Pacific (All Verified ✅)
        "IN": [
            "108.181.61.214",  // Mumbai - Psychz Networks
        ],
        "SG": [
            "103.200.96.132",  // Singapore - Looking Glass
        ],
        "JP": [
            "154.31.118.26",   // Tokyo - DMIT Inc.
        ],
        "AU": [
            "108.181.64.80",   // Sydney - Psychz Networks
        ],
        "KR": [
            "45.141.136.97",   // Seoul - Hostyun Korea
        ],
        "HK": [
            "154.12.176.28",   // Hong Kong - DMIT Inc.
        ],
        // Europe (Verified ✅)
        "SE": [
            "206.168.213.100", // Stockholm - Psychz Networks
        ],
        "AT": [
            "178.251.64.167",  // Vienna - fonira
        ],
        // South America (Verified ✅)
        "CL": [
            "64.176.2.7",      // Santiago - Vultr
        ],
        // Africa (Verified ✅)
        "ZA": [
            "139.84.226.78",   // Johannesburg - Vultr
        ],
    },

    "Valorant": {
        // North America
        "US": [
            "193.56.116.73",   // Atlanta
            "52.162.161.148",  // Chicago
            "192.227.139.106", // Dallas
            "104.174.125.138", // Los Angeles
            "67.183.58.7",     // Seattle
            "208.253.114.165", // Virginia
        ],
        "CA": [
            "52.162.161.148",  // Chicago
            "193.56.116.73",   // Atlanta
        ],
        "MX": [
            "216.238.66.16",   // Mexico City - Vultr ✅
        ],
        // South America
        "BR": [
            "191.252.218.135", // Sao Paulo
        ],
        "CL": [
            "64.176.2.7",      // Santiago
        ],
        // Europe
        "GB": [
            "84.17.50.173",    // London
        ],
        "DE": [
            "82.102.16.174",   // Frankfurt
        ],
        "FR": [
            "51.159.24.42",    // Paris
        ],
        "ES": [
            "188.213.6.40",    // Madrid - GINERNET ✅
        ],
        "SE": [
            "206.168.213.100", // Stockholm
        ],
        "PL": [
            "70.34.242.24",    // Warsaw - Vultr ✅
        ],
        "TR": [
            "185.248.14.2",    // Istanbul - Atlantisnet ✅
        ],
        // Middle East & Africa
        "AE": [
            "109.169.72.30",   // Dubai - Dediserve ✅
        ],
        "ZA": [
            "139.84.226.78",   // Cape Town
        ],
        // Asia-Pacific
        "IN": [
            "108.181.61.214",  // Mumbai
        ],
        "SG": [
            "103.200.96.132",  // Singapore
        ],
        "JP": [
            "154.31.118.26",   // Tokyo
        ],
        "AU": [
            "108.181.64.80",   // Sydney
        ],
        "KR": [
            "45.141.136.97",   // Seoul
        ],
        "HK": [
            "154.12.176.28",   // Hong Kong
        ],
    },

    "Apex Legends": {
        // North America (AWS)
        "US": [
            "208.253.114.165", // N. Virginia (us-east-1)
            "52.162.161.148",  // Ohio (us-east-2) - Chicago proxy
            "67.183.58.7",     // Oregon (us-west-2) - Seattle proxy
        ],
        // Europe (AWS)
        "DE": [
            "82.102.16.174",   // Frankfurt (eu-central-1)
        ],
        // South America (AWS)
        "BR": [
            "191.252.218.135", // São Paulo (sa-east-1)
        ],
        // Middle East (AWS)
        "BH": [
            "109.169.72.30",   // Bahrain (me-south-1) - Dubai proxy
        ],
        // Asia-Pacific (AWS)
        "JP": [
            "154.31.118.26",   // Tokyo (ap-northeast-1)
        ],
        "AU": [
            "108.181.64.80",   // Sydney (ap-southeast-2)
        ],
        "HK": [
            "154.12.176.28",   // Hong Kong (ap-east-1)
        ],
        "SG": [
            "103.200.96.132",  // Singapore (ap-southeast-1)
        ],
        "IN": [
            "108.181.61.214",  // Mumbai
        ],
    },

    "League of Legends": {
        "US": ["52.162.161.148"], // Chicago (NA)
        "BR": ["191.252.218.135"], // São Paulo
        "NL": ["216.58.212.142"], // Amsterdam (EUW)
        "DE": ["82.102.16.174"], // Frankfurt (EUNE)
        "CL": ["64.176.2.7"], // Santiago (LAS)
        "TR": ["185.248.14.2"], // Istanbul
        "JP": ["154.31.118.26"], // Tokyo
        "KR": ["45.141.136.97"], // Seoul
        "SG": ["103.200.96.132"], // Singapore (SEA)
        "AU": ["108.181.64.80"], // Sydney (OCE)
        "SE": ["206.168.213.100"], // Stockholm (Russia)
        "IN": ["108.181.61.214"], // Mumbai
    },

    "Dota 2": {
        "US": ["208.253.114.165", "67.183.58.7"], // US East (Virginia), US West (Seattle)
        "BR": ["191.252.218.135"], // São Paulo
        "CL": ["64.176.2.7"], // Santiago
        "GB": ["84.17.50.173"], // Europe West (Luxembourg proxy)
        "AT": ["178.251.64.167"], // Europe East (Vienna)
        "SE": ["206.168.213.100"], // Russia (Stockholm)
        "SG": ["103.200.96.132"], // Southeast Asia
        "AU": ["108.181.64.80"], // Australia (Sydney)
        "AE": ["109.169.72.30"], // UAE (Dubai)
        "ZA": ["139.84.226.78"], // South Africa
        "IN": ["108.181.61.214"], // India (Mumbai)
        "JP": ["154.31.118.26"], // Japan
    },

    "Fortnite": {
        "US": ["208.253.114.165", "192.227.139.106", "104.174.125.138"], // NA East, Central, West
        "BR": ["191.252.218.135"], // Brazil
        "GB": ["84.17.50.173"], // London
        "FR": ["51.159.24.42"], // Paris
        "DE": ["82.102.16.174"], // Frankfurt
        "JP": ["154.31.118.26"], // Tokyo
        "AU": ["108.181.64.80"], // Sydney (OCE)
        "BH": ["109.169.72.30"], // Bahrain (ME) - Dubai proxy
        "IN": ["108.181.61.214"], // Mumbai
        "SG": ["103.200.96.132"], // Singapore
    },

    "Overwatch 2": {
        "US": ["104.174.125.138", "52.162.161.148"], // Los Angeles, Chicago
        "BR": ["191.252.218.135"], // Rio/São Paulo
        "DE": ["82.102.16.174"], // Frankfurt
        "FR": ["51.159.24.42"], // Paris
        "NL": ["216.58.212.142"], // Amsterdam
        "JP": ["154.31.118.26"], // Tokyo
        "KR": ["45.141.136.97"], // Seoul
        "AU": ["108.181.64.80"], // Sydney
        "IN": ["108.181.61.214"], // Mumbai
        "SG": ["103.200.96.132"], // Singapore
    },

    "Rocket League": {
        "US": ["208.253.114.165"], // US
        "DE": ["82.102.16.174"], // Frankfurt
        "GB": ["84.17.50.173"], // London
        "JP": ["154.31.118.26"], // Tokyo
        "BH": ["109.169.72.30"], // Bahrain - Dubai proxy
        "AU": ["108.181.64.80"], // Sydney
        "ZA": ["139.84.226.78"], // Johannesburg
        "BR": ["191.252.218.135"], // São Paulo
        "IN": ["108.181.61.214"], // Mumbai
        "SG": ["103.200.96.132"], // Singapore
    },
};

export const REGION_FALLBACKS: Record<string, string> = {
    // Europe -> Germany (Central Hub)
    "IT": "DE", "PT": "DE", "BE": "DE", "CH": "DE",
    "CZ": "DE", "DK": "DE", "NO": "DE", "FI": "DE", "IE": "GB",
    "GR": "DE", "HU": "DE", "RO": "DE", "UA": "DE",
    "PL": "DE", "ES": "DE", "TR": "DE", "IL": "DE",

    // Asia -> Singapore (SEA Hub) / India / Japan
    "MY": "SG", "ID": "SG", "TH": "SG", "VN": "SG", "TW": "HK",
    "PH": "SG", "PK": "IN", "BD": "IN", "LK": "IN",
    "NP": "IN", "MV": "IN", "KH": "SG", "LA": "SG", "MM": "SG",
    "CN": "HK",

    // Middle East -> Dubai (verified) / India
    "QA": "AE", "KW": "AE", "OM": "AE", "SA": "AE", "EG": "DE",
    "JO": "AE", "LB": "AE", "IQ": "AE", "BH": "AE",

    // South America -> Brazil / Chile
    "AR": "BR", "PE": "BR", "UY": "BR", "VE": "BR", "EC": "BR", "BO": "BR", "PY": "BR",
    "CO": "BR",

    // Oceania -> Australia
    "NZ": "AU", "FJ": "AU", "PG": "AU",
};

export function getGameIPs(game: string, country: string): string[] {
    const servers = GAME_SERVERS[game];
    if (!servers) return [];

    const ips: string[] = [];

    // 1. Try exact country match
    if (servers[country]) {
        ips.push(...servers[country]);
    }

    // 2. Try Regional Fallback
    const fallbackRegion = REGION_FALLBACKS[country];
    if (fallbackRegion && servers[fallbackRegion]) {
        ips.push(...servers[fallbackRegion]);
    }

    // 3. Fallback to default (using first available region if 'default' key missing? No, strict 'default' key)
    if (ips.length === 0 && servers["default"]) {
        ips.push(...servers["default"]);
    } else if (ips.length === 0 && servers["US"]) {
        // Fallback to US if no default set, just to ensure some data for now
        ips.push(...servers["US"]);
    }

    return [...new Set(ips)];
}
