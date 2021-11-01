interface resBody {
  message: string;
  status: string;
}

export class ResPack {
  message: string;
  constructor(message) {
    if (typeof message == 'object' && message !== null) {
      this.message = JSON.stringify(message);
    } else {
      this.message = message;
    }
  }
  error(): resBody {
    return {
      message: this.message,
      status: 'fail',
    };
  }
  success(): resBody {
    return {
      message: this.message,
      status: 'ok',
    };
  }
}
