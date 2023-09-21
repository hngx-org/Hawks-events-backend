'use strict';

const { StatusCode, ReasonPhrases } = require('http-status-codes');

class CustomAPIErrorHandler extends Error {
  constructor(message, statusCode, reasonPhrase) {
    super(message);
    this.statusCode = statusCode;
    this.reasonPhrase = reasonPhrase;
  }
}

class InformationalError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.Continue) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class SuccessError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.OK) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class RedirectionError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.MovedPermanently) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class ClientError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.BadRequest) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class ServerError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.InternalServerError) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class ProcessingError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.Processing) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class CreatedError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.Created) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class AcceptedError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.Accepted) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class NoContentError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.NoContent) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class MovedPermanentlyError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.MovedPermanently) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class UnauthorizedError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.Unauthorized) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class PaymentRequiredError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.PaymentRequired) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class ForbiddenError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.Forbidden) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class NotFoundError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.NotFound) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class TimeoutError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.RequestTimeout) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class UnsupportedMediaTypeError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.UnsupportedMediaType) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class TooManyRequestsError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.TooManyRequests) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class BadGatewayError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.BadGateway) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class ServiceUnavailableError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.ServiceUnavailable) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class InsufficientStorageError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.InsufficientStorage) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}

class NetworkAuthenticationRequiredError extends CustomAPIErrorHandler {
  constructor(message, statusCode = StatusCode.NetworkAuthenticationRequired) {
    super(message, statusCode, ReasonPhrases[statusCode]);
  }
}
function CustomError(message, statusCode) {
  if (statusCode >= 100 && statusCode < 200) {
    return new InformationalError(message, statusCode);
  } else if (statusCode >= 200 && statusCode < 300) {
    return new SuccessError(message, statusCode);
  } else if (statusCode >= 300 && statusCode < 400) {
    return new RedirectionError(message, statusCode);
  } else if (statusCode >= 400 && statusCode < 500) {
    if (statusCode === 400) {
      return new ClientError(message, statusCode);
    } else if (statusCode === 401) {
      return new UnauthorizedError(message, statusCode);
    } else if (statusCode === 402) {
      return new PaymentRequiredError(message, statusCode);
    } else if (statusCode === 404) {
      return new NotFoundError(message, statusCode);
    }   else if (statusCode === 408) {
      return new TimeoutError(message, statusCode);
    }  else if (statusCode === 415) {
      return new UnsupportedMediaTypeError(message, statusCode);
    } else if (statusCode === 429) {
      return new TooManyRequestsError(message, statusCode);
    }else {
      return new ClientError(message, statusCode);
    }
  } else if (statusCode >= 500) {
    if (statusCode === 500) {
      return new InternalServerError(message, statusCode);
    }  else if (statusCode === 502) {
      return new BadGatewayError(message, statusCode);
    } else if (statusCode === 503) {
      return new ServiceUnavailableError(message, statusCode);
    }   else if (statusCode === 507) {
      return new InsufficientStorageError(message, statusCode);
    } else if (statusCode === 510) {
      return new NotExtendedError(message, statusCode);
    } else if (statusCode === 511) {
      return new NetworkAuthenticationRequiredError(message, statusCode);
    } else {
      return new ServerError(message, statusCode);
    }
  } else {
    return new CustomAPIErrorHandler(message, statusCode);
  }
}


/**
 * Examples
 * throw new <className>(customMessage)
 * throw new Accepted("Your Request has been accepted")
 */

module.exports = {
  CustomError,
  CustomAPIErrorHandler,
  InformationalError,
  SuccessError,
  RedirectionError,
  ClientError,
  ServerError,
  ProcessingError,
  CreatedError,
  AcceptedError,
  NoContentError,
  MovedPermanentlyError,
  UnauthorizedError,
  PaymentRequiredError,
  ForbiddenError,
  NotFoundError,
  TimeoutError,
  UnsupportedMediaTypeError,
  TooManyRequestsError,
  BadGatewayError,
  ServiceUnavailableError,
  InsufficientStorageError,
  NetworkAuthenticationRequiredError,
};
