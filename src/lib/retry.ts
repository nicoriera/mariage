interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoffFactor?: number;
  maxDelay?: number;
  shouldRetry?: (error: Error, attempt: number) => boolean;
}

const defaultOptions: Required<RetryOptions> = {
  maxAttempts: 3,
  delay: 1000,
  backoffFactor: 2,
  maxDelay: 10000,
  shouldRetry: (error: Error, attempt: number) => {
    // Don't retry on authentication errors or client errors (4xx)
    if (error.message.includes('auth') || error.message.includes('401') || error.message.includes('403')) {
      return false;
    }
    
    // Don't retry on validation errors (400)
    if (error.message.includes('400') || error.message.includes('validation')) {
      return false;
    }
    
    // Retry on network errors, server errors (5xx), and timeouts
    return attempt < 3;
  },
};

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...defaultOptions, ...options };
  let lastError: Error;
  
  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      console.warn(`Attempt ${attempt} failed:`, lastError.message);
      
      // Don't retry if shouldRetry returns false
      if (!opts.shouldRetry(lastError, attempt)) {
        throw lastError;
      }
      
      // Don't wait after the last attempt
      if (attempt === opts.maxAttempts) {
        break;
      }
      
      // Calculate delay with exponential backoff
      const delay = Math.min(
        opts.delay * Math.pow(opts.backoffFactor, attempt - 1),
        opts.maxDelay
      );
      
      console.log(`Retrying in ${delay}ms... (attempt ${attempt + 1}/${opts.maxAttempts})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}

// Specialized retry for network requests
export async function withNetworkRetry<T>(
  requestFn: () => Promise<T>,
  options: Omit<RetryOptions, 'shouldRetry'> = {}
): Promise<T> {
  return withRetry(requestFn, {
    ...options,
    shouldRetry: (error: Error, attempt: number) => {
      // Retry on network errors, timeouts, and server errors
      const isNetworkError = error.message.includes('network') || 
                           error.message.includes('timeout') ||
                           error.message.includes('fetch') ||
                           error.name === 'TypeError';
      
      const isServerError = error.message.includes('5') && error.message.includes('0');
      
      return (isNetworkError || isServerError) && attempt < (options.maxAttempts || 3);
    },
  });
}

// Specialized retry for database operations
export async function withDatabaseRetry<T>(
  dbFn: () => Promise<T>,
  options: Omit<RetryOptions, 'shouldRetry'> = {}
): Promise<T> {
  return withRetry(dbFn, {
    ...options,
    maxAttempts: options.maxAttempts || 2, // Fewer retries for DB operations
    shouldRetry: (error: Error, attempt: number) => {
      // Only retry on connection errors, not on data validation errors
      const isConnectionError = error.message.includes('connection') ||
                               error.message.includes('timeout') ||
                               error.message.includes('network');
      
      return isConnectionError && attempt < (options.maxAttempts || 2);
    },
  });
}