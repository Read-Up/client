'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
// package
import { MemberAPI } from './member-api';

// ----------------------------------------------------------------------

export const useCreateMemMutation = () => {
  const mutationFn = () => MemberAPI.createMain();

  return useMutation({
    mutationFn,
    onSuccess: ({ isValid, message }) => {
      // toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.REGISTER.register(isValid, message));
    },
  });
};