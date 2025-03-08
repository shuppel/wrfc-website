declare module 'square' {
  export class Client {
    constructor(config: {
      bearerAuthCredentials: {
        accessToken: string;
      };
      environment: string;
      httpClientOptions?: {
        timeout: number;
        retryConfig?: {
          maxNumberOfRetries: number;
          maximumRetryWaitTime: number;
        };
      };
    });

    paymentsApi: {
      createPayment(params: {
        sourceId: string;
        idempotencyKey: string;
        amountMoney: {
          amount: number;
          currency: string;
        };
        locationId: string;
        note?: string;
      }): Promise<{
        result: {
          payment: {
            id: string;
            status: string;
          };
        };
      }>;
    };
  }

  export const Environment: {
    Production: 'production';
    Sandbox: 'sandbox';
    Custom: 'custom';
  };

  export class ApiError extends Error {
    result: {
      errors?: Array<{
        category: string;
        code: string;
        detail: string;
      }>;
    };
  }
} 