const isProd = process.env.NODE_ENV === 'production';

export const logger = {
  debug: (message: string, ...args: any[]) => {
    if (!isProd) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  },
  info: (message: string, ...args: any[]) => {
    if (!isProd) {
      console.info(`[INFO] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (!isProd) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
  error: (message: string, error?: any, ...args: any[]) => {
    console.error(`[ERROR] ${message}`, error ?? '', ...args);
  }
};
