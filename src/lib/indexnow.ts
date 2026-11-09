/**
 * IndexNow Protocol Integration for CR1000
 * Protocol supported by Bing, Yandex, Seznam, Naver, and search engines.
 * Instantly notifies search engines when pages are added, updated, or when goals change.
 */

export const INDEXNOW_KEY = "e4a6d7f8c1b24e3a9d5f7b8c0e1a2f3d";
export const INDEXNOW_HOST = "www.cr1000.live";

export async function submitToIndexNow(urls: string | string[]) {
  try {
    const rawList = Array.isArray(urls) ? urls : [urls];
    const urlList = Array.from(
      new Set(
        rawList
          .filter(Boolean)
          .map((u) =>
            u.startsWith("http")
              ? u
              : `https://${INDEXNOW_HOST}${u.startsWith("/") ? "" : "/"}${u}`
          )
      )
    );

    if (urlList.length === 0) {
      return { success: false, message: "No valid URLs provided" };
    }

    const payload = {
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    // IndexNow API standard endpoint
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const isSuccess = response.ok || response.status === 202;
    return {
      success: isSuccess,
      status: response.status,
      submittedUrls: urlList,
    };
  } catch (error: any) {
    console.warn("IndexNow submit warning:", error.message);
    return { success: false, error: error.message };
  }
}
