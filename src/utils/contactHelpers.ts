export const getDeviceType = (): string => {
  if (typeof navigator === "undefined") return "Unknown Device";
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "Mobile";
  }
  return "Desktop";
};

export const getBrowserName = (): string => {
  if (typeof navigator === "undefined") return "Unknown Browser";
  const ua = navigator.userAgent;
  let browserName = "Unknown Browser";

  if (ua.indexOf("Firefox") > -1) {
    browserName = "Firefox";
  } else if (ua.indexOf("SamsungBrowser") > -1) {
    browserName = "Samsung Browser";
  } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
    browserName = "Opera";
  } else if (ua.indexOf("Trident") > -1) {
    browserName = "Internet Explorer";
  } else if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) {
    browserName = "Edge";
  } else if (ua.indexOf("Chrome") > -1) {
    browserName = "Chrome";
  } else if (ua.indexOf("Safari") > -1) {
    browserName = "Safari";
  }
  return browserName;
};

export const getUserLocation = async (): Promise<string> => {
  const getFallbackLocation = (): string => {
    let timezone = "Local Timezone";
    try {
      if (Intl && Intl.DateTimeFormat) {
        timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      }
    } catch (e) {
      // ignore
    }

    let country = "";
    try {
      const lang = typeof navigator !== "undefined" ? (navigator.language || navigator.languages?.[0]) : "";
      if (lang) {
        // Attempt to extract region code (e.g., 'US' from 'en-US')
        const regionMatch = lang.match(/-([A-Z]{2})$/i);
        let regionCode = regionMatch ? regionMatch[1].toUpperCase() : "";

        // Fallback to Intl.Locale if available
        if (!regionCode && typeof Intl !== "undefined" && (Intl as any).Locale) {
          const locale = new (Intl as any).Locale(lang);
          regionCode = locale.region || "";
        }

        if (regionCode && typeof Intl !== "undefined" && Intl.DisplayNames) {
          const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
          const name = displayNames.of(regionCode);
          if (name) {
            country = name;
          }
        }
      }
    } catch (e) {
      // ignore
    }

    if (timezone !== "Local Timezone" && country) {
      return `${timezone} (${country})`;
    } else if (timezone !== "Local Timezone") {
      return timezone;
    } else if (country) {
      return country;
    }
    
    return "Local System"; // Never display "Unknown Location"
  };

  const getPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (typeof navigator === "undefined" || !navigator.geolocation) {
        reject(new Error("Geolocation not supported by browser"));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
      }
    });
  };

  try {
    console.log("[Geolocation] Requesting browser geolocation permission...");
    const position = await getPosition();
    const { latitude, longitude } = position.coords;

    console.log(`[Geolocation] Coordinates acquired: ${latitude}, ${longitude}. Reverse geocoding...`);
    // Free reverse geocoding API (no API key required)
    const reverseGeoRes = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    
    if (reverseGeoRes.ok) {
      const data = await reverseGeoRes.json();
      const locationParts = [data.city || data.locality, data.principalSubdivision, data.countryName].filter(Boolean);
      if (locationParts.length > 0) {
        console.log(`[Geolocation] Reverse geocoding successful: ${locationParts.join(", ")}`);
        return locationParts.join(", ");
      }
    }
    throw new Error("Reverse geocoding failed to return valid data");
  } catch (error: any) {
    console.warn("[Geolocation] Browser Geolocation failed or was denied:", error.message || "Unknown error");
    
    // Fallback to Timezone + inferred Country
    console.log("[Geolocation] Falling back to Timezone and Language inference...");
    return getFallbackLocation();
  }
};

export const getScreenResolution = (): string => {
  if (typeof window === "undefined") return "Unknown Resolution";
  return `${window.screen.width}x${window.screen.height}`;
};

export const getLanguage = (): string => {
  if (typeof navigator === "undefined") return "Unknown Language";
  return navigator.language || navigator.languages?.[0] || "Unknown Language";
};

export const getTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown Timezone";
  } catch (e) {
    return "Unknown Timezone";
  }
};

export const getReferrer = (): string => {
  if (typeof document === "undefined") return "Direct / Unknown";
  return document.referrer || "Direct / Unknown";
};

export const getSourceUrl = (): string => {
  if (typeof window === "undefined") return "Unknown URL";
  return window.location.href;
};

export const getSubmissionDateTime = () => {
  const now = new Date();
  
  // YYYY-MM-DD
  const date = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // HH:MM:SS AM/PM
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return { date, time };
};
