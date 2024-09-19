const MAX_RETRIES = 100;
const INITIAL_DELAY = 100;
export default async function fetchWithRetry(
  url: string,
  fetchOption: RequestInit = {},
  retryCount = 0,
): Promise<Response> {
  try {
    return await fetch(url, fetchOption);
  } catch (error) {
    if (retryCount >= MAX_RETRIES) {
      throw error; // Throw an error when the maximum number of retry is reached
    }

    const delay = INITIAL_DELAY + 2 * Math.pow(2, retryCount);
    console.log(
      `Retrying fetch for ${url} in ${delay}ms. Attempt ${retryCount + 1}`,
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
    return await fetchWithRetry(url, fetchOption, retryCount + 1);
  }
}
