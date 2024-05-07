/* v8 ignore start */
// Stryker disable all

// Inspired by react-hot-toast library (comment from shadcn)

'use client';

import type { ToastActionElement, ToastProps } from '@/components/ui/toast/Toast';

import { useEffect, useState } from 'react';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = {
  description?: React.ReactNode;
  action?: ToastActionElement;
  title?: React.ReactNode;
  id: string;
} & ToastProps;

const actionTypes = {
  DISMISS_TOAST: 'DISMISS_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  ADD_TOAST: 'ADD_TOAST'
} as const;

let count = 0;

function genId() {
  // eslint-disable-next-line no-magic-numbers
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        // eslint-disable-next-line no-magic-numbers
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t))
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false
              }
            : t
        )
      };
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, 'id'>;

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      toast: { ...props, id },
      type: 'UPDATE_TOAST'
    });
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  dispatch({
    toast: {
      ...props,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
      open: true,
      id
    },
    type: 'ADD_TOAST'
  });

  return {
    dismiss,
    id: id,
    update
  };
}

function useToast() {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      // eslint-disable-next-line no-magic-numbers
      if (index > -1) listeners.splice(index, 1);
    };
  }, [state]);

  return {
    ...state,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
    toast
  };
}

export { useToast, toast };

// Stryker restore all
/* v8 ignore stop */
