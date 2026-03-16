import { JWT } from "google-auth-library";
import { getSheetTabName, type ClubEvent } from "@/data/events";
import { extractRegistrationNumberFromEmail } from "@/lib/user";

function getServiceAccountPrivateKey() {
  const key = process.env.GOOGLE_PRIVATE_KEY;
  return key?.replace(/\\n/g, "\n");
}

function getClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = getServiceAccountPrivateKey();
  if (!email || !key) {
    throw new Error("Missing Google service account credentials");
  }
  return new JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function getAccessToken() {
  const client = getClient();
  const { access_token: accessToken } = await client.authorize();
  if (!accessToken) {
    throw new Error("Could not acquire Google access token");
  }
  return accessToken;
}

function getSpreadsheetId() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  if (!spreadsheetId) {
    throw new Error("Missing GOOGLE_SHEETS_ID");
  }
  return spreadsheetId;
}

async function googleSheetsRequest(path: string, init?: RequestInit) {
  const token = await getAccessToken();
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${getSpreadsheetId()}${path}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google Sheets API error (${response.status}): ${text}`);
  }

  return response;
}

async function ensureSheetExists(tabName: string) {
  const metaResponse = await googleSheetsRequest("");
  const meta = (await metaResponse.json()) as {
    sheets?: Array<{ properties?: { title?: string } }>;
  };

  const exists = (meta.sheets ?? []).some(
    (sheet) => sheet.properties?.title === tabName,
  );
  if (exists) {
    return;
  }

  await googleSheetsRequest(":batchUpdate", {
    method: "POST",
    body: JSON.stringify({
      requests: [{ addSheet: { properties: { title: tabName } } }],
    }),
  });
}

async function getSheetIdByTabName(tabName: string) {
  const metaResponse = await googleSheetsRequest("");
  const meta = (await metaResponse.json()) as {
    sheets?: Array<{ properties?: { title?: string; sheetId?: number } }>;
  };

  const matched = (meta.sheets ?? []).find(
    (sheet) => sheet.properties?.title === tabName,
  );
  return matched?.properties?.sheetId;
}

async function ensureHeader(event: ClubEvent) {
  const tabName = getSheetTabName(event.slug);
  await ensureSheetExists(tabName);
  const range = encodeURIComponent(`${tabName}!1:1`);
  const response = await googleSheetsRequest(`/values/${range}`);
  const data = (await response.json()) as { values?: string[][] };

  const headers = [
    "Registered At (ISO)",
    "Register Date",
    "Register Time",
    "Email",
    "Name",
    "Registration Number (From Email)",
    ...event.registrationFields.map((field) => field.label),
  ];

  const existing = data.values?.[0] ?? [];
  const needsUpdate =
    existing.length === 0 ||
    headers.some((header, index) => existing[index] !== header);

  if (!needsUpdate) {
    return;
  }

  const updateRange = encodeURIComponent(`${tabName}!A1`);
  await googleSheetsRequest(
    `/values/${updateRange}?valueInputOption=USER_ENTERED`,
    {
      method: "PUT",
      body: JSON.stringify({ values: [headers] }),
    },
  );
}

export async function ensureEventSheetReady(event: ClubEvent) {
  await ensureHeader(event);
}

export async function getEventSheetOpenLink(event: ClubEvent) {
  await ensureHeader(event);
  const spreadsheetId = getSpreadsheetId();
  const tabName = getSheetTabName(event.slug);
  const sheetId = await getSheetIdByTabName(tabName);

  if (typeof sheetId === "number") {
    return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=${sheetId}`;
  }

  const range = encodeURIComponent(`${tabName}!A1`);
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#range=${range}`;
}

export async function isAlreadyRegistered(event: ClubEvent, email: string) {
  await ensureHeader(event);
  const tabName = getSheetTabName(event.slug);
  const range = encodeURIComponent(`${tabName}!D2:D`);
  const response = await googleSheetsRequest(`/values/${range}`);
  const data = (await response.json()) as { values?: string[][] };

  const needle = email.toLowerCase();
  return (data.values ?? []).some((row) => row[0]?.toLowerCase() === needle);
}

export async function appendRegistration(
  event: ClubEvent,
  userEmail: string,
  userName: string,
  payload: Record<string, string>,
) {
  await ensureHeader(event);

  const now = new Date();
  const registerDate = now.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  const registerTime = now.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
  });

  const row = [
    now.toISOString(),
    registerDate,
    registerTime,
    userEmail,
    userName,
    extractRegistrationNumberFromEmail(userEmail) ?? "Not found",
    ...event.registrationFields.map((field) => payload[field.key] ?? ""),
  ];

  const tabName = getSheetTabName(event.slug);
  const range = encodeURIComponent(`${tabName}!A1`);

  await googleSheetsRequest(
    `/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      body: JSON.stringify({ values: [row] }),
    },
  );
}

export async function getEventSheetValues(event: ClubEvent) {
  await ensureHeader(event);
  const tabName = getSheetTabName(event.slug);
  const range = encodeURIComponent(`${tabName}!A:Z`);
  const response = await googleSheetsRequest(`/values/${range}`);
  const data = (await response.json()) as { values?: string[][] };
  return data.values ?? [];
}
