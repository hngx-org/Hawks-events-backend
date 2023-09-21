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

/**
 * Examples
 * throw new <className>(customMessage)
 * throw new Accepted("Your Request has been accepted")
 */

module.exports = {
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
