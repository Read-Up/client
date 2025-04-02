export function getCookie<T>(name: string): T | null;
export function getCookie<T>(name: string, defaultValue: T): T;

export function getCookie(name: string, defaultValue = null) {
  name = `${name}=`;

  if (typeof document === "undefined") return defaultValue;

  const cookieData = document.cookie;

  let cookieValue = "";
  let start = cookieData.indexOf(name);

  if (start !== -1) {
    start += name.length;
    let end = cookieData.indexOf(";", start);
    if (end === -1) {
      end = cookieData.length;
    }
    cookieValue = cookieData.substring(start, end);
  }

  if (!cookieValue) return defaultValue;

  return JSON.parse(cookieValue);
  // 기존 소스
  // const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  // return value ? value : null;
}

export interface CookieOptions {
  path?: string;
  expires?: Date | string;
  domain?: string;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
}

export function setCookie<T>(name: string, value: T, options: CookieOptions = {}): void {
  options = {
    path: "/",
    ...options,
  };

  if (typeof document === "undefined") {
    console.error("cannot access without document");
    return;
  }

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updateCookie = encodeURIComponent(name) + "=" + JSON.stringify(value);

  for (const optionKey in options) {
    updateCookie += "; " + optionKey;
    const optionValue = options[optionKey as keyof CookieOptions];
    if (optionValue !== true) {
      updateCookie += "=" + optionValue;
    }
  }

  document.cookie = updateCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, "", {
    expires: new Date().toUTCString(),
  });
}

export const allDelCookies = (domain: string, path: string): void => {
  if (typeof document === "undefined") {
    console.error("cannot access without document");
    return;
  }

  // domain과 path가 falsy할 경우 기본값 적용
  const currentDomain: string = domain || document.domain;
  const currentPath: string = path || "/";

  if (!document.cookie) {
    console.log("no cookies.");
    return;
  }

  const cookies: string[] = document.cookie.split("; ");
  const expiration: string = "Sat, 01 Jan 1972 00:00:00 GMT";

  // 각 쿠키에 대해 만료일, 경로, 도메인을 지정하여 삭제합니다.
  cookies.forEach((cookie) => {
    const cookieName: string = cookie.split("=")[0] ?? "";
    document.cookie = `${cookieName}=; expires=${expiration}; path=${currentPath}; domain=${currentDomain}`;
  });
};
