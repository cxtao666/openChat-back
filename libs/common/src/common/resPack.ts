interface resBody {
  message: string;
  status: string;
}

export class ResPack {
  message: string;
  constructor(message) {
    this.message = message;
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
