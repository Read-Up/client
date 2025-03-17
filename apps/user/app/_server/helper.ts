'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';
//package
import { parseJWT } from '@repo/utils';

import { LOGIN_TOKEN_OPTION } from '@/_constants/api';
import { usePermissionState } from '@/_store/permission';

// ----------------------------------------------------------------------

export const updateToken = async (AT: string, RT: string) => {
  const {
    claims: { accountType },
  } = parseJWT(AT);

  cookies().set({
    name: 'X-IDEATEC-AT',
    value: AT,
    ...LOGIN_TOKEN_OPTION,
  });

  cookies().set({
    name: 'X-IDEATEC-RT',
    value: RT,
    ...LOGIN_TOKEN_OPTION,
  });

  return accountType === 'ADMIN' ? redirect('/admin') : redirect('/supplier');
};

// ----------------------------------------------------------------------

export async function getServerToken<T>(key: string): Promise<T | null>;
export async function getServerToken<T>(key: string, defaultValue: T): Promise<T>;

export async function getServerToken(key: string, defaultValue = null) {
  const value = cookies().get(key)?.value ?? defaultValue;
  return value;
}

export async function setServerToken(key: string, value: any) {
  cookies().set(key, value);
}

export async function removeServerToken(key: string | string[]) {
  typeof key === 'string' ? cookies().delete(key) : key.forEach(k => cookies().delete(k));
}

export const revalidateCache = async ({ key = '', path = '' }) => {
  try {
    key && revalidateTag(key);
    path && revalidatePath(path);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
