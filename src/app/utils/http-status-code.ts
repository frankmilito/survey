/** HTTP response status codes. */

enum HttpStatusCode {
  /**
   * The server has received the request headers and the client should proceed to send the request body
   * (in the case of a request for which a body needs to be sent; for example, a POST request).
   * Sending a large request body to a server after a request has been rejected for inappropriate headers would be inefficient.
   * To have a server check the request's headers, a client must send Expect: 100-continue as a header
   * in its initial request and receive a 100 Continue status code in response before sending the body.
   * If the client receives an error code such as 403 (Forbidden) or 405 (Method Not Allowed) then it should not send the request's body.
   * The response 417 Expectation Failed indicates that the request should be repeated without the Expect header as it indicates that the
   * server does not support expectations (this is the case, for example, of HTTP/1.0 servers)
   */
  CONTINUE = 100,

  /**
   * The requester has asked the server to switch protocols and the server has agreed to do so.
   */
  SWITCHING_PROTOCOLS = 101,

  /**
   * A WebDAV request may contain many sub-requests involving file operations,
   * requiring a long time to complete the request. This code indicates that the
   * server has received and is processing the request, but no response is available yet
   */
  PROCESSING = 102,

  /**
   * Standard response for successful HTTP requests.
   * The actual response will depend on the request method used.
   * In a GET request, the response will contain an entity corresponding to the requested resource.
   * In a POST request, the response will contain an entity describing or containing the result of the action.
   */
  OK = 200,

  /**
   * The request has been fulfilled, resulting in the creation of a new resource.
   */
  CREATED = 201,

  /**
   * The request has been accepted for processing,
   * but the processing has not been completed.
   * The request might or might not be eventually acted upon, and may be disallowed when processing occurs.
   */
  ACCEPTED = 202,

  /**
   * The server is a transforming proxy (e.g. a Web accelerator) that received a 200 OK from its origin, but is returning a modified version of the origin's response
   */
  NON_AUTHORITATIVE_INFORMATION = 203,

  /**
   * The server successfully processed the request, and is not returning any content.
   */
  NO_CONTENT = 204,

  /**
   * The server successfully processed the request, asks that the requester reset its document view, and is not returning any content.
   */
  RESET_CONTENT = 205,

  /**
   * The server is delivering only part of the resource (byte serving) due to a range header sent by the client.
   * The range header is used by HTTP clients to enable resuming of interrupted downloads, or split a download into multiple simultaneous streams.
   */
  PARTIAL_CONTENT = 206,

  /**
   * The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made
   */
  MULTI_STATUS = 207,

  /**
   * The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response,
   * and are not being included again.
   */
  ALREADY_REPORTED = 208,

  /**
   * Indicates multiple options for the resource from which the client may choose (via agent-driven content negotiation).
   * For example, this code could be used to present multiple video format options, to list files with different filename extensions,
   * or to suggest word-sense disambiguation.
   */
  MULTIPLE_CHOICES = 300,

  /**
   * This and all future requests should be directed to the given URI.
   */
  MOVED_PERMANENTLY = 301,

  /**
   * Tells the client to look at (browse to) another URL.
   * The HTTP/1.0 specification (RFC 1945) required the client to
   * perform a temporary redirect with the same method (the original describing phrase was "Moved Temporarily"),
   * but popular browsers implemented 302 redirects by changing the method to GET. Therefore, HTTP/1.1
   * added status codes 303 and 307 to distinguish between the two behaviours.
   */
  FOUND = 302,

  /**
   * The response to the request can be found under another URI using the GET method.
   * When received in response to a POST (or PUT/DELETE), the client should presume that
   * the server has received the data and should issue a new GET request to the given URI.
   */
  SEE_OTHER = 303,

  /**
   * Indicates that the resource has not been modified since the version
   * specified by the request headers If-Modified-Since or If-None-Match.
   * In such case, there is no need to retransmit the resource since the client still has a previously-downloaded copy.
   */
  NOT_MODIFIED = 304,

  /**
   * The requested resource is available only through a proxy, the address for which is provided in the response.
   * For security reasons, many HTTP clients (such as Mozilla Firefox and Internet Explorer) do not obey this status code.
   */
  USE_PROXY = 305,

  /**
   * No longer used. Originally meant "Subsequent requests should use the specified proxy."
   */
  SWITCH_PROXY = 306,

  /**
   * In this case, the request should be repeated with another URI; however, future requests should still use the original URI.
   * In contrast to how 302 was historically implemented, the request method is not allowed to be changed when reissuing the original request.
   * For example, a POST request should be repeated using another POST request.
   */
  TEMPORARY_REDIRECT = 307,

  /**
   * This and all future requests should be directed to the given URI. 308 parallel the behaviour of 301, but does not allow the HTTP method to change.
   * So, for example, submitting a form to a permanently redirected resource may continue smoothly.
   */
  PERMANENT_REDIRECT = 308,

  /**
   * The server cannot or will not process the request due to an apparent client error
   * (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).
   */
  BAD_REQUEST = 400,

  /**
   * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.
   * The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource.
   * See Basic access authentication and Digest access authentication. 401 semantically means "unauthorised",
   * the user does not have valid authentication credentials for the target resource.
   */
  UNAUTHORIZED = 401,

  /**
   * Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or
   * micropayment scheme, as proposed, for example, by GNU Taler, but that has not yet happened, and this code is not widely used.
   */
  PAYMENT_REQUIRED = 402,

  /**
   * The request contained valid data and was understood by the server, but the server is refusing action.
   * This may be due to the user not having the necessary permissions for a resource or needing an account of some sort,
   * or attempting a prohibited action (e.g. creating a duplicate record where only one is allowed).
   */
  FORBIDDEN = 403,

  /**
   * The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
   */
  NOT_FOUND = 404,

  /**
   * A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.
   */
  METHOD_NOT_ALLOWED = 405,

  /**
   * The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
   */
  NOT_ACCEPTABLE = 406,

  /**
   * The client must first authenticate itself with the proxy.
   */
  PROXY_AUTHENTICATION_REQUIRED = 407,

  /**
   * The server timed out waiting for the request. According to HTTP specifications:
   * "The client did not produce a request within the time that the server was prepared to wait.
   * The client MAY repeat the request without modifications at any later time."
   */
  REQUEST_TIMEOUT = 408,

  /**
   * Indicates that the request could not be processed because of conflict in the current state of the resource,
   * such as an edit conflict between multiple simultaneous updates.
   */
  CONFLICT = 409,

  /**
   * Indicates that the resource requested was previously in use but is no longer available and will not be available again.
   * This should be used when a resource has been intentionally removed and the resource should be purged.
   */
  GONE = 410,

  /**
   * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
   */
  INTERNAL_SERVER_ERROR = 500,

  /**
   * The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability
   * (e.g., a new feature of a web-service API).
   */
  NOT_IMPLEMENTED = 501,

  /**
   * The server was acting as a gateway or proxy and received an invalid response from the upstream server.
   */
  BAD_GATEWAY = 502,

  /**
   * The server cannot handle the request (because it is overloaded or down for maintenance). Generally, this is a temporary state.
   */
  SERVICE_UNAVAILABLE = 503,

  /**
   * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
   */
  GATEWAY_TIMEOUT = 504,

  /**
   * The server does not support the HTTP version used in the request.
   */
  HTTP_VERSION_NOT_SUPPORTED = 505,
}

export default HttpStatusCode;
