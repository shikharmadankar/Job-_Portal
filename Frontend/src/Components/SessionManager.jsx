import { useEffect, useRef } from "react";
import axios from "axios";
import { API_URL } from "../lib/api";

/**
 * SessionManager — invisible component that:
 * 1. Refreshes the JWT token every 4 hours of activity
 * 2. Listens for user activity (clicks, typing, scrolling)
 * 3. Only refreshes if the user has been active since last refresh
 * 4. Keeps both cookie and localStorage token in sync
 */
const SessionManager = () => {
  const lastActivity = useRef(Date.now());
  const lastRefresh = useRef(Date.now());

  // Track user activity
  useEffect(() => {
    const markActive = () => {
      lastActivity.current = Date.now();
    };

    window.addEventListener("click", markActive);
    window.addEventListener("keydown", markActive);
    window.addEventListener("scroll", markActive);
    window.addEventListener("mousemove", markActive);

    return () => {
      window.removeEventListener("click", markActive);
      window.removeEventListener("keydown", markActive);
      window.removeEventListener("scroll", markActive);
      window.removeEventListener("mousemove", markActive);
    };
  }, []);

  // Refresh token periodically if user is active
  useEffect(() => {
    const REFRESH_INTERVAL = 4 * 60 * 60 * 1000; // 4 hours
    const CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes

    const interval = setInterval(async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const timeSinceRefresh = Date.now() - lastRefresh.current;
      const wasActiveRecently =
        Date.now() - lastActivity.current < CHECK_INTERVAL;

      // Refresh if 4h have passed AND user has been active
      if (timeSinceRefresh >= REFRESH_INTERVAL && wasActiveRecently) {
        try {
          const res = await axios.get(
            `${API_URL}/user/refresh-token`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            lastRefresh.current = Date.now();
          }
        } catch (error) {
          // Token expired or invalid — force logout
          console.error("Session refresh failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }
    }, CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything
};

export default SessionManager;
