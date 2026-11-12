/**
 * Utility for tracking product affiliate clicks across the application.
 * Tracks non-blockingly via localStorage and sendBeacon / fetch to /api/shop/clicks.
 */

export function trackAffiliateClick(
  productId: string,
  platform: string = "Shopee",
  source: string = "unknown"
) {
  if (!productId || typeof window === "undefined") return;

  // 1. Instant Local Storage Update (Client-side fallback)
  try {
    const raw = localStorage.getItem("cr1000_product_clicks");
    const counts: Record<string, number> = raw ? JSON.parse(raw) : {};
    counts[productId] = (counts[productId] || 0) + 1;
    localStorage.setItem("cr1000_product_clicks", JSON.stringify(counts));

    // Dispatch custom event for real-time UI reaction
    window.dispatchEvent(
      new CustomEvent("cr1000_affiliate_clicked", {
        detail: { productId, platform, source, count: counts[productId] },
      })
    );
  } catch (e) {
    // Ignore localStorage errors
  }

  // 2. Non-blocking beacon to server API
  try {
    const payload = JSON.stringify({ productId, platform, source });
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/shop/clicks", blob);
    } else {
      fetch("/api/shop/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch (e) {
    // Ignore network errors on tracking
  }
}
